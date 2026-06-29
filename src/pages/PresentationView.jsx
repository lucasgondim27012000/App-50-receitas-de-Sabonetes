import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle, ChevronRight } from 'lucide-react';
import { recipes, categories } from '../data/recipes';
import RecipePresentation from '../components/RecipePresentation';

var PresentationView = function() {
  var params = useParams();
  var recipeId = parseInt(params.recipeId, 10);
  var navigate = useNavigate();
  var [isDone, setIsDone] = useState(false);

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
        <button className="btn btn-primary mt-4" onClick={function() { navigate('/receitas'); }}>Voltar</button>
      </div>
    );
  }

  var category = categories.find(function(c) { return c.id === recipe.category; });
  var nextRecipe = recipes.find(function(r) { return r.id === recipeId + 1; });

  var markDone = function() {
    localStorage.setItem('recipe_done_' + recipe.id, 'true');
    setIsDone(true);
  };

  return (
    <div className="animate-fade-in pv">
      <button className="pv-back mb-4" onClick={function() { navigate(-1); }}>
        <ArrowLeft size={20} /> Voltar
      </button>

      {/* Badge */}
      <div className="pv-badge mb-2" style={{ color: recipe.color || '#B8601E' }}>
        {category ? category.name : ''}
      </div>

      {/* Presentation Player */}
      <div className="mb-4">
        <RecipePresentation recipe={recipe} onComplete={markDone} />
      </div>

      {/* Actions */}
      <button
        className={'btn w-full mb-3' + (isDone ? ' pv-done' : ' btn-primary')}
        onClick={markDone}
      >
        {isDone ? '✓ Receita concluída!' : '✓ Marcar como feita'}
      </button>

      <Link to={'/recipe/' + recipe.id} className="btn btn-outline w-full mb-3">
        📖 Ver receita completa
      </Link>

      {nextRecipe && (
        <button className="btn btn-outline w-full mb-6" onClick={function() { navigate('/apresentacao/' + nextRecipe.id); }}>
          Próxima apresentação → <ChevronRight size={16} />
        </button>
      )}

      <style>{'\
        .pv-back { display:flex; align-items:center; gap:6px; background:none; border:none; color:#7A5C48; font-family:var(--font-sans); font-size:15px; cursor:pointer; padding:4px 0; }\
        .pv-badge { font-size:12px; font-weight:600; letter-spacing:.5px; }\
        .pv-done { background:#C0DD97; border:1px solid #9BC06D; color:#27500A; }\
      '}</style>
    </div>
  );
};

export default PresentationView;
