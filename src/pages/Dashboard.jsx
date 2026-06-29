import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { recipes } from '../data/recipes';
import { Presentation, TrendingUp, Package, Calendar, ChevronRight, Heart } from 'lucide-react';

const Dashboard = () => {
  const navigate = useNavigate();
  const [doneCount, setDoneCount] = useState(0);

  useEffect(() => {
    let c = 0;
    for (let i = 1; i <= 50; i++) {
      if (localStorage.getItem('recipe_done_' + i) === 'true') c++;
    }
    setDoneCount(c);
  }, []);

  var pct = Math.round((doneCount / 50) * 100);

  // Find next recipe to suggest
  var nextRecipe = recipes.find(function(r) {
    return localStorage.getItem('recipe_done_' + r.id) !== 'true';
  }) || recipes[0];

  return (
    <div className="animate-fade-in dash">
      {/* A) Banner */}
      <div className="dash-banner mb-6">
        <p className="dash-wave">Olá! 👋</p>
        <h2 className="dash-headline">
          {doneCount === 0
            ? 'Você está a 1 receita de distância da sua primeira venda.'
            : 'Você já fez ' + doneCount + ' receitas. Continue assim!'}
        </h2>
        <p className="dash-sub">50 receitas testadas esperando por você.</p>
        <button className="btn dash-cta mt-4" onClick={function() { navigate('/recipe/' + nextRecipe.id); }}>
          Continuar minha jornada →
        </button>
      </div>

      {/* B) Progress Bar */}
      <div className="dash-progress mb-6">
        <div className="dp-milestones">
          <div className={'dp-dot' + (doneCount >= 1 ? ' done' : '')}><span>1ª</span></div>
          <div className="dp-line"></div>
          <div className={'dp-dot' + (doneCount >= 5 ? ' done' : '')}><span>5</span></div>
          <div className="dp-line"></div>
          <div className={'dp-dot' + (doneCount >= 10 ? ' done' : '')}><span>10</span></div>
          <div className="dp-line"></div>
          <div className={'dp-dot' + (doneCount >= 25 ? ' done' : '')}><span>25</span></div>
          <div className="dp-line"></div>
          <div className={'dp-dot' + (doneCount >= 50 ? ' done' : '')}><span>50</span></div>
        </div>
        <div className="dp-bar-bg">
          <div className="dp-bar-fill" style={{ width: pct + '%' }}></div>
        </div>
        <p className="dp-label">{doneCount} de 50 receitas testadas — {pct}%</p>
      </div>

      {/* C) Next Action Card */}
      <div className="card dash-action mb-6">
        <p className="da-label">🎯 SUA PRÓXIMA AÇÃO</p>
        <h3 className="da-title">{nextRecipe.title}</h3>
        <p className="da-meta">{nextRecipe.level} · {nextRecipe.time} · 💰 Lucro: {nextRecipe.profitEstimate || 'R$ 60–100'}/lote</p>
        <div className="da-buttons mt-3">
          <button className="btn btn-primary" onClick={function() { navigate('/recipe/' + nextRecipe.id); }}>
            Ver receita
          </button>
          <button className="btn btn-outline" onClick={function() { navigate('/apresentacao/' + nextRecipe.id); }}>
            Ver apresentação 🎬
          </button>
        </div>
      </div>

      {/* D) Quick Shortcuts */}
      <div className="grid grid-2 gap-3 mb-6">
        <div className="card dash-shortcut" onClick={function() { navigate('/aprender'); }}>
          <Presentation size={28} color="#B8601E" />
          <span>Apresentações</span>
        </div>
        <div className="card dash-shortcut" onClick={function() { navigate('/vender'); }}>
          <TrendingUp size={28} color="#C89B3C" />
          <span>Calcular lucro</span>
        </div>
        <div className="card dash-shortcut" onClick={function() { navigate('/receitas'); }}>
          <Package size={28} color="#6B8F6D" />
          <span>Todas receitas</span>
        </div>
        <div className="card dash-shortcut" onClick={function() { navigate('/vender'); }}>
          <Calendar size={28} color="#9060BC" />
          <span>Datas que vendem</span>
        </div>
      </div>

      {/* E) Social proof */}
      <div className="dash-social mb-6">
        <p className="ds-title">💚 Outras alunas já estão vendendo</p>
        <p className="ds-quote">"Fiz minha primeira venda em 5 dias!"</p>
        <button className="btn btn-outline ds-btn" onClick={function() { navigate('/vender'); }}>
          Ver como vender mais →
        </button>
      </div>

      <style>{`
        .dash-banner {
          background: #2D1A0A;
          border-radius: 14px;
          padding: 24px 20px;
        }
        .dash-wave { font-size: 20px; margin-bottom: 4px; color: #F5E0CF; }
        .dash-headline {
          font-family: var(--font-serif);
          font-size: 20px;
          color: #F5E0CF;
          line-height: 1.3;
          margin-bottom: 4px;
        }
        .dash-sub { font-size: 14px; color: #C8A890; }
        .dash-cta {
          background: #B8601E; color: white;
          border-radius: 10px; font-size: 15px;
          padding: 12px 20px;
        }

        .dash-progress { padding: 0 4px; }
        .dp-milestones {
          display: flex; align-items: center;
          justify-content: space-between;
          margin-bottom: 10px;
        }
        .dp-dot {
          width: 28px; height: 28px;
          border-radius: 50%;
          border: 2px solid #EAD8C4;
          display: flex; align-items: center; justify-content: center;
          font-size: 10px; font-weight: 600; color: #A88070;
          background: #FDF7F2;
          flex-shrink: 0;
        }
        .dp-dot.done {
          background: #B8601E; border-color: #B8601E; color: white;
        }
        .dp-line { flex: 1; height: 2px; background: #EAD8C4; }
        .dp-bar-bg {
          height: 6px; background: #EAD8C4;
          border-radius: 3px; overflow: hidden;
        }
        .dp-bar-fill {
          height: 100%; background: #B8601E;
          border-radius: 3px; transition: width 300ms;
        }
        .dp-label { font-size: 12px; color: #7A5C48; margin-top: 6px; }

        .da-label {
          font-size: 11px; font-weight: 600;
          color: #B8601E; letter-spacing: 0.5px;
          margin-bottom: 8px;
        }
        .da-title {
          font-family: var(--font-serif);
          font-size: 18px; margin-bottom: 4px;
        }
        .da-meta { font-size: 13px; color: #7A5C48; }
        .da-buttons { display: flex; gap: 10px; flex-wrap: wrap; }

        .dash-shortcut {
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          gap: 8px; padding: 20px 12px;
          cursor: pointer; text-align: center;
          transition: transform 200ms;
        }
        .dash-shortcut:hover { transform: translateY(-2px); }
        .dash-shortcut span { font-size: 13px; font-weight: 500; color: #2D1A0A; }

        .dash-social {
          background: #EAF2EB;
          border-left: 3px solid #6B8F6D;
          border-radius: 14px;
          padding: 20px;
        }
        .ds-title { font-size: 15px; font-weight: 600; color: #27500A; margin-bottom: 4px; }
        .ds-quote {
          font-size: 14px; color: #4A6B50;
          font-style: italic; margin-bottom: 12px;
        }
        .ds-btn { border-color: #6B8F6D; color: #27500A; }
      `}</style>
    </div>
  );
};

export default Dashboard;
