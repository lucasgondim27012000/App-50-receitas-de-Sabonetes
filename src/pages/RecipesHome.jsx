import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { categories, recipes } from '../data/recipes';
import { Sparkles, Droplet, Star, Palette, Gift, Flame, Search, X } from 'lucide-react';
import RecipeCard from '../components/RecipeCard';

var iconMap = {
  aromaticos: Sparkles,
  pele: Droplet,
  especiais: Star,
  decorativos: Palette,
  ocasioes: Gift,
  tematicos: Flame,
};

var colorMap = {
  aromaticos: '#C47F9B',
  pele: '#5A8BB0',
  especiais: '#C89B3C',
  decorativos: '#9060BC',
  ocasioes: '#6B8F6D',
  tematicos: '#50888A',
};

var emojiMap = {
  aromaticos: '🌸',
  pele: '💧',
  especiais: '⭐',
  decorativos: '🎨',
  ocasioes: '🎁',
  tematicos: '🔥',
};

var getCatDone = function(catId) {
  var catRecipes = recipes.filter(function(r) { return r.category === catId; });
  var done = 0;
  catRecipes.forEach(function(r) {
    if (localStorage.getItem('recipe_done_' + r.id) === 'true') done++;
  });
  return { total: catRecipes.length, done: done };
};

var RecipesHome = function() {
  var navigate = useNavigate();
  var [searchTerm, setSearchTerm] = useState('');

  // Global search across all recipes
  var searchResults = searchTerm.length >= 2
    ? recipes.filter(function(r) {
        var term = searchTerm.toLowerCase();
        var nameMatch = r.title.toLowerCase().indexOf(term) >= 0;
        var descMatch = r.description && r.description.toLowerCase().indexOf(term) >= 0;
        var ingMatch = r.ingredients && r.ingredients.some(function(ing) {
          return (ing.name || '').toLowerCase().indexOf(term) >= 0;
        });
        return nameMatch || descMatch || ingMatch;
      })
    : [];

  return (
    <div className="animate-fade-in rh">
      <h1 className="rh-title mb-2">50 Receitas de Sabonetes Artesanais</h1>
      <p className="text-muted mb-6">Encontre a receita perfeita para começar</p>

      {/* Search bar */}
      <div className="rh-search mb-6">
        <Search size={20} color="#A88070" />
        <input
          type="text"
          placeholder="Buscar por nome ou ingrediente..."
          value={searchTerm}
          onChange={function(e) { setSearchTerm(e.target.value); }}
        />
        {searchTerm && (
          <button className="rh-clear" onClick={function() { setSearchTerm(''); }}>
            <X size={18} />
          </button>
        )}
      </div>

      {/* Search Results or Categories */}
      {searchTerm.length >= 2 ? (
        <div>
          <p className="text-muted mb-4">{searchResults.length + ' resultado(s) para "' + searchTerm + '"'}</p>
          <div className="flex flex-col gap-3">
            {searchResults.map(function(r) {
              return <RecipeCard key={r.id} recipe={r} />;
            })}
          </div>
          {searchResults.length === 0 && (
            <div className="card text-center" style={{ padding: '40px 20px' }}>
              <p className="text-muted">Nenhuma receita encontrada. Tente outro termo.</p>
            </div>
          )}
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {categories.map(function(cat) {
            var Icon = iconMap[cat.id] || Sparkles;
            var color = colorMap[cat.id] || '#B8601E';
            var stats = getCatDone(cat.id);
            var statusText = stats.done > 0
              ? stats.total + ' receitas · ' + stats.done + ' concluídas ✓'
              : stats.total + ' receitas · Comece agora!';

            return (
              <Link key={cat.id} to={'/category/' + cat.id} className="card rh-cat">
                <div className="rh-cat-icon" style={{ backgroundColor: color + '1A' }}>
                  <Icon size={24} color={color} />
                </div>
                <div className="rh-cat-info">
                  <h3 className="rh-cat-name">{emojiMap[cat.id] + ' ' + cat.name}</h3>
                  <p className="rh-cat-status">{statusText}</p>
                </div>
                <div className="rh-cat-arrow" style={{ color: color }}>→</div>
              </Link>
            );
          })}
        </div>
      )}

      <style>{`
        .rh-title {
          font-family: var(--font-serif);
          font-size: 22px;
        }
        .rh-search {
          display: flex;
          align-items: center;
          gap: 10px;
          background: #FFFFFF;
          border: 0.5px solid #EAD8C4;
          border-radius: 14px;
          padding: 12px 16px;
          box-shadow: 0 2px 8px rgba(45,26,10,0.04);
        }
        .rh-search input {
          flex: 1; border: none; outline: none;
          font-family: var(--font-sans);
          font-size: 15px; color: #2D1A0A;
          background: transparent;
        }
        .rh-search input::placeholder { color: #A88070; }
        .rh-clear {
          background: none; border: none;
          color: #A88070; cursor: pointer;
          display: flex; padding: 0;
        }

        .rh-cat {
          display: flex; align-items: center; gap: 14px;
          padding: 16px; text-decoration: none; color: inherit;
        }
        .rh-cat-icon {
          width: 48px; height: 48px;
          border-radius: 12px;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
        }
        .rh-cat-info { flex: 1; }
        .rh-cat-name {
          font-family: var(--font-sans);
          font-size: 15px; font-weight: 600;
          margin-bottom: 2px;
        }
        .rh-cat-status { font-size: 13px; color: #7A5C48; }
        .rh-cat-arrow { font-size: 18px; font-weight: 600; }
      `}</style>
    </div>
  );
};

export default RecipesHome;
