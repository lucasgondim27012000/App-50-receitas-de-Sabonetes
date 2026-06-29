import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Play, ChevronRight, Sparkles, Droplet, Star, Palette, Gift, Flame } from 'lucide-react';
import { recipes, categories } from '../data/recipes';

var iconMap = {
  aromaticos: Sparkles,
  pele: Droplet,
  especiais: Star,
  decorativos: Palette,
  ocasioes: Gift,
  tematicos: Flame,
};

var emojiMap = {
  aromaticos: '🌸',
  pele: '💧',
  especiais: '⭐',
  decorativos: '🎨',
  ocasioes: '🎁',
  tematicos: '🔥',
};

var colorMap = {
  aromaticos: '#C47F9B',
  pele: '#5A8BB0',
  especiais: '#C89B3C',
  decorativos: '#9060BC',
  ocasioes: '#6B8F6D',
  tematicos: '#50888A',
};

var Learn = function() {
  var navigate = useNavigate();
  var [openCat, setOpenCat] = useState(null);

  // Count viewed presentations per category
  var getCatProgress = function(catId) {
    var catRecipes = recipes.filter(function(r) { return r.category === catId; });
    var done = 0;
    catRecipes.forEach(function(r) {
      if (localStorage.getItem('recipe_done_' + r.id) === 'true') done++;
    });
    return { total: catRecipes.length, done: done };
  };

  return (
    <div className="animate-fade-in">
      <h1 className="lp-title mb-2">Passo a Passo Visual</h1>
      <p className="text-muted mb-2">Apresentações animadas de todas as 50 receitas</p>
      <p className="lp-subtitle mb-6">Toque em uma categoria para explorar</p>

      <div className="flex flex-col gap-3">
        {categories.map(function(cat) {
          var color = colorMap[cat.id] || '#B8601E';
          var emoji = emojiMap[cat.id] || '📦';
          var progress = getCatProgress(cat.id);
          var isOpen = openCat === cat.id;
          var catRecipes = recipes.filter(function(r) { return r.category === cat.id; });

          return (
            <div key={cat.id} className="lp-category">
              {/* Category header */}
              <button className="lp-cat-header" onClick={function() { setOpenCat(isOpen ? null : cat.id); }}>
                <div className="lp-cat-icon" style={{ backgroundColor: color + '1A' }}>
                  <span style={{ fontSize: '22px' }}>{emoji}</span>
                </div>
                <div className="lp-cat-info">
                  <h3 className="lp-cat-name">{cat.name}</h3>
                  <p className="lp-cat-progress">
                    {progress.done + '/' + progress.total + ' concluídas'}
                    {progress.done > 0 && ' ✓'}
                  </p>
                </div>
                <div className={'lp-cat-chevron' + (isOpen ? ' open' : '')} style={{ color: color }}>
                  <ChevronRight size={20} />
                </div>
              </button>

              {/* Expanded recipe list */}
              {isOpen && (
                <div className="lp-recipes">
                  {catRecipes.map(function(recipe) {
                    var done = localStorage.getItem('recipe_done_' + recipe.id) === 'true';
                    return (
                      <button
                        key={recipe.id}
                        className={'lp-recipe-item' + (done ? ' done' : '')}
                        onClick={function() { navigate('/apresentacao/' + recipe.id); }}
                      >
                        <div className="lp-ri-color" style={{ background: recipe.color || color }}></div>
                        <div className="lp-ri-info">
                          <span className="lp-ri-name">{recipe.title}</span>
                          <span className="lp-ri-meta">{recipe.level + ' · ' + recipe.time}</span>
                        </div>
                        <div className="lp-ri-action">
                          {done ? (
                            <span className="lp-ri-check">✓</span>
                          ) : (
                            <Play size={16} color={color} />
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <style>{'\
        .lp-title { font-family:var(--font-serif); font-size:22px; }\
        .lp-subtitle { font-size:13px; color:#A88070; }\
        .lp-category { background:#FFFFFF; border:0.5px solid #EAD8C4; border-radius:14px; overflow:hidden; box-shadow:0 2px 8px rgba(45,26,10,0.04); }\
        .lp-cat-header { display:flex; align-items:center; gap:14px; padding:14px 16px; width:100%; background:none; border:none; cursor:pointer; text-align:left; font-family:var(--font-sans); }\
        .lp-cat-icon { width:46px; height:46px; border-radius:12px; display:flex; align-items:center; justify-content:center; flex-shrink:0; }\
        .lp-cat-info { flex:1; }\
        .lp-cat-name { font-size:15px; font-weight:600; color:#2D1A0A; margin-bottom:2px; }\
        .lp-cat-progress { font-size:12px; color:#7A5C48; }\
        .lp-cat-chevron { transition:transform 200ms; }\
        .lp-cat-chevron.open { transform:rotate(90deg); }\
        .lp-recipes { border-top:0.5px solid #EAD8C4; padding:6px 8px; display:flex; flex-direction:column; gap:2px; }\
        .lp-recipe-item { display:flex; align-items:center; gap:10px; padding:10px 8px; border-radius:10px; background:none; border:none; cursor:pointer; font-family:var(--font-sans); text-align:left; transition:background 150ms; width:100%; }\
        .lp-recipe-item:hover { background:#FDF7F2; }\
        .lp-recipe-item.done { opacity:.7; }\
        .lp-ri-color { width:6px; height:32px; border-radius:3px; flex-shrink:0; }\
        .lp-ri-info { flex:1; }\
        .lp-ri-name { display:block; font-size:14px; color:#2D1A0A; font-weight:500; margin-bottom:2px; }\
        .lp-ri-meta { font-size:12px; color:#7A5C48; }\
        .lp-ri-action { width:28px; display:flex; justify-content:center; }\
        .lp-ri-check { color:#6B8F6D; font-weight:700; font-size:16px; }\
      '}</style>
    </div>
  );
};

export default Learn;
