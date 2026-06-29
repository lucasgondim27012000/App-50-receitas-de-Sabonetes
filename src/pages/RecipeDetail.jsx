import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, CheckSquare, Clock, Users, Download, Copy, ChevronLeft, ChevronRight, Droplet } from 'lucide-react';
import { recipes, categories } from '../data/recipes';
import { gerarPDF } from '../utils/pdfGenerator';

var RecipeDetail = function() {
  var params = useParams();
  var recipeId = parseInt(params.recipeId, 10);
  var navigate = useNavigate();
  var [isDone, setIsDone] = useState(false);
  var [copyLabel, setCopyLabel] = useState('Copiar Lista de Compras');

  var recipe = recipes.find(function(r) { return r.id === recipeId; });

  useEffect(function() {
    if (recipe) {
      setIsDone(localStorage.getItem('recipe_done_' + recipe.id) === 'true');
    }
  }, [recipe]);

  if (!recipe) {
    return (
      <div className="text-center" style={{ padding: '60px 20px' }}>
        <h2>Receita não encontrada</h2>
        <Link to="/receitas" className="btn btn-primary mt-4">Voltar</Link>
      </div>
    );
  }

  var category = categories.find(function(c) { return c.id === recipe.category; });
  var color = recipe.color || '#B8601E';

  // Profit calculation
  var costNum = parseFloat((recipe.cost || '0').replace(/[^0-9,.]/g, '').replace(',', '.')) || 50;
  var priceNum = parseFloat((recipe.salePrice || '0').replace(/[^0-9,.]/g, '').replace(',', '.')) || 15;
  var yieldNum = parseInt((recipe.yield || '10').replace(/[^0-9]/g, ''), 10) || 10;
  var revenue = priceNum * yieldNum;
  var profit = revenue - costNum;

  var toggleDone = function() {
    var next = !isDone;
    setIsDone(next);
    if (next) localStorage.setItem('recipe_done_' + recipe.id, 'true');
    else localStorage.removeItem('recipe_done_' + recipe.id);
  };

  var handleCopy = function() {
    var lines = [];
    lines.push('Lista de Compras - ' + recipe.title);
    lines.push('');
    if (recipe.ingredients) {
      recipe.ingredients.forEach(function(ing) {
        lines.push('[ ] ' + (ing.qty || '') + ' ' + (ing.name || ing));
      });
    }
    lines.push('');
    lines.push('Materiais:');
    if (recipe.materials) {
      recipe.materials.forEach(function(m) { lines.push('[ ] ' + m); });
    }
    lines.push('');
    lines.push('Custo: ' + recipe.cost + ' | Rende: ' + recipe.yield);

    navigator.clipboard.writeText(lines.join('\n')).then(function() {
      setCopyLabel('Copiado! ✓');
      setTimeout(function() { setCopyLabel('Copiar Lista de Compras'); }, 2000);
    });
  };

  // Prev/Next navigation
  var prevRecipe = recipes.find(function(r) { return r.id === recipeId - 1; });
  var nextRecipe = recipes.find(function(r) { return r.id === recipeId + 1; });

  return (
    <div className="animate-fade-in rd">
      {/* Top bar */}
      <div className="rd-top mb-4">
        <button className="rd-back" onClick={function() { navigate(-1); }}>
          <ArrowLeft size={20} /> Voltar
        </button>
      </div>

      {/* Header */}
      <div className="card rd-header mb-4" style={{ borderLeft: '6px solid ' + color }}>
        <span className="badge mb-2">{category ? category.name : ''}</span>
        <h1 className="rd-title">{recipe.title}</h1>
        <p className="rd-desc text-muted">{recipe.description}</p>
        <div className="rd-tags mt-3">
          <span className="rd-tag"><CheckSquare size={14} /> {recipe.level}</span>
          <span className="rd-tag"><Clock size={14} /> {recipe.time}</span>
          <span className="rd-tag"><Users size={14} /> {recipe.yield}</span>
        </div>
      </div>

      {/* Profit Block */}
      <div className="rd-profit mb-4">
        <div className="rd-profit-grid">
          <div className="rd-profit-col">
            <span className="rp-label">Custo do lote</span>
            <span className="rp-value">{recipe.cost}</span>
          </div>
          <div className="rd-profit-col">
            <span className="rp-label">Venda por</span>
            <span className="rp-value rp-gold">{recipe.salePrice}</span>
          </div>
        </div>
        <div className="rd-profit-total">
          {'💰 Lucro estimado: ' + recipe.profitEstimate + ' por lote'}
        </div>
      </div>

      {/* Apresentação visual */}
      <button className="btn btn-outline w-full mb-4" onClick={function() { navigate('/apresentacao/' + recipe.id); }}>
        🎬 Ver apresentação visual
      </button>

      {/* Ingredients */}
      <div className="card mb-4">
        <h3 className="rd-section-title mb-3">Ingredientes</h3>
        <ul className="rd-checklist">
          {(recipe.ingredients || []).map(function(ing, i) {
            var text = typeof ing === 'string' ? ing : (ing.qty + ' ' + ing.name);
            return (
              <li key={i}>
                <label className="rd-check-label">
                  <input type="checkbox" className="rd-checkbox" />
                  <span className="rd-checkmark"></span>
                  <span>{text}</span>
                </label>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Materials */}
      <div className="card mb-4">
        <h3 className="rd-section-title mb-3">Materiais Necessários</h3>
        <ul className="rd-checklist">
          {(recipe.materials || []).map(function(m, i) {
            return (
              <li key={i}>
                <label className="rd-check-label">
                  <input type="checkbox" className="rd-checkbox" />
                  <span className="rd-checkmark"></span>
                  <span>{m}</span>
                </label>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Action buttons */}
      <div className="rd-actions mb-4">
        <button
          className="btn btn-outline flex-1"
          onClick={handleCopy}
          style={copyLabel.indexOf('Copiado') >= 0 ? { background: '#EAF2EB', color: '#27500A', borderColor: '#6B8F6D' } : {}}
        >
          <Copy size={16} /> {copyLabel}
        </button>
        <button className="btn btn-primary flex-1" onClick={function() { gerarPDF(recipe); }}>
          <Download size={16} /> Gerar PDF
        </button>
      </div>

      {/* Steps */}
      <div className="card mb-4">
        <h3 className="rd-section-title mb-3">Modo de Preparo</h3>
        <div className="rd-steps">
          {(recipe.steps || recipe.preparation || []).map(function(step, i) {
            var title = typeof step === 'string' ? '' : (step.title || '');
            var desc = typeof step === 'string' ? step : (step.desc || step.description || '');
            return (
              <div key={i} className="rd-step" style={{ borderLeftColor: color }}>
                <div className="rd-step-num" style={{ backgroundColor: color }}>{i + 1}</div>
                <div className="rd-step-body">
                  {title && <strong>{title}</strong>}
                  <p>{desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Tips */}
      {recipe.tips && recipe.tips.length > 0 && (
        <div className="card mb-4" style={{ backgroundColor: '#FDF7F2' }}>
          <h3 className="rd-section-title mb-3">Dicas & Variações</h3>
          <ul className="rd-tips">
            {recipe.tips.map(function(tip, i) {
              var text = typeof tip === 'string' ? tip : tip;
              return <li key={i}>{text}</li>;
            })}
          </ul>
        </div>
      )}

      {/* Packaging */}
      {recipe.packaging && (
        <div className="card mb-4" style={{ backgroundColor: '#FDF7F2' }}>
          <h3 className="rd-section-title mb-3">Embalagem & Conservação</h3>
          <p>{recipe.packaging}</p>
        </div>
      )}

      {/* Mark done button */}
      <button className={'btn w-full rd-done-btn mb-4' + (isDone ? ' done' : '')} onClick={toggleDone}>
        {isDone ? '✓ Receita concluída! 🎉' : '✓ Marcar como feita'}
      </button>

      {/* Contextual upsell (only for Iniciante/Intermediário) */}
      {(recipe.level === 'Iniciante' || recipe.level === 'Intermediário') && (
        <div className="rd-upsell mb-4">
          <h4>Curtiu essa receita?</h4>
          <p className="text-muted">Veja como vender em escala com margens até 3x maiores →</p>
          <button className="btn btn-primary mt-3" onClick={function() { navigate('/vender'); }}>
            Quero saber como
          </button>
        </div>
      )}

      {/* Prev/Next */}
      <div className="rd-nav mb-8">
        {prevRecipe ? (
          <button className="btn btn-outline" onClick={function() { navigate('/recipe/' + prevRecipe.id); }}>
            <ChevronLeft size={16} /> Anterior
          </button>
        ) : <div></div>}
        {nextRecipe ? (
          <button className="btn btn-outline" onClick={function() { navigate('/recipe/' + nextRecipe.id); }}>
            Próxima <ChevronRight size={16} />
          </button>
        ) : <div></div>}
      </div>

      <style>{`
        .rd-top { display: flex; }
        .rd-back {
          display: flex; align-items: center; gap: 6px;
          background: none; border: none; color: #7A5C48;
          font-family: var(--font-sans); font-size: 15px;
          cursor: pointer; padding: 4px 0;
        }
        .rd-title { font-family: var(--font-serif); font-size: 22px; margin-bottom: 6px; }
        .rd-desc { font-size: 14px; line-height: 1.5; }
        .rd-tags { display: flex; gap: 12px; flex-wrap: wrap; }
        .rd-tag {
          display: flex; align-items: center; gap: 4px;
          font-size: 13px; color: #7A5C48;
        }

        .rd-profit {
          background: #EAF2EB; border-radius: 14px; padding: 16px;
        }
        .rd-profit-grid {
          display: grid; grid-template-columns: 1fr 1fr;
          gap: 12px; padding-bottom: 12px;
          border-bottom: 1px solid rgba(0,0,0,0.06);
          margin-bottom: 12px;
        }
        .rp-label { font-size: 11px; color: #7A5C48; text-transform: uppercase; display: block; }
        .rp-value { font-size: 18px; font-weight: 600; color: #2D1A0A; }
        .rp-gold { color: #C89B3C; }
        .rd-profit-total { font-size: 14px; font-weight: 600; color: #27500A; }

        .rd-section-title {
          font-family: var(--font-serif); font-size: 18px;
        }

        .rd-checklist { list-style: none; display: flex; flex-direction: column; gap: 12px; }
        .rd-check-label {
          display: flex; align-items: flex-start; gap: 10px;
          cursor: pointer; user-select: none; font-size: 15px;
        }
        .rd-checkbox { display: none; }
        .rd-checkmark {
          width: 22px; height: 22px;
          border: 2px solid #EAD8C4; border-radius: 4px;
          flex-shrink: 0; position: relative; margin-top: 1px;
          transition: all 200ms;
        }
        .rd-checkbox:checked + .rd-checkmark {
          background: #6B8F6D; border-color: #6B8F6D;
        }
        .rd-checkbox:checked + .rd-checkmark::after {
          content: ''; position: absolute;
          left: 6px; top: 2px; width: 5px; height: 10px;
          border: solid white; border-width: 0 2px 2px 0;
          transform: rotate(45deg);
        }
        .rd-checkbox:checked ~ span { color: #A88070; text-decoration: line-through; }

        .rd-actions { display: flex; gap: 10px; }
        .flex-1 { flex: 1; }

        .rd-steps { display: flex; flex-direction: column; gap: 16px; }
        .rd-step {
          display: flex; gap: 12px;
          border-left: 3px solid;
          padding-left: 12px;
        }
        .rd-step-num {
          width: 28px; height: 28px; border-radius: 50%;
          color: white; display: flex; align-items: center;
          justify-content: center; font-weight: 600; font-size: 13px;
          flex-shrink: 0;
        }
        .rd-step-body { flex: 1; }
        .rd-step-body strong { display: block; margin-bottom: 4px; font-size: 14px; }
        .rd-step-body p { font-size: 14px; color: #4A3A2D; line-height: 1.5; }

        .rd-tips { list-style: none; display: flex; flex-direction: column; gap: 8px; }
        .rd-tips li { position: relative; padding-left: 20px; font-size: 14px; line-height: 1.5; }
        .rd-tips li::before {
          content: '💡'; position: absolute; left: 0;
        }

        .rd-done-btn {
          background: #EAF2EB; border: 1px solid #6B8F6D;
          color: #27500A; font-weight: 600;
          transition: all 200ms;
        }
        .rd-done-btn.done { background: #C0DD97; border-color: #9BC06D; }

        .rd-upsell {
          background: #FBF3EA; border-left: 3px solid #B8601E;
          border-radius: 10px; padding: 16px;
        }
        .rd-upsell h4 { font-size: 15px; margin-bottom: 4px; }

        .rd-nav { display: flex; justify-content: space-between; gap: 12px; }

        @media (max-width: 480px) {
          .rd-actions { flex-direction: column; }
        }
      `}</style>
    </div>
  );
};

export default RecipeDetail;
