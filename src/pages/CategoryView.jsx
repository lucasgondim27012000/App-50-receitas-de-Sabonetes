import React, { useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import RecipeCard from '../components/RecipeCard';
import { categories, recipes } from '../data/recipes';

var CategoryView = function() {
  var params = useParams();
  var categoryId = params.categoryId;
  var [levelFilter, setLevelFilter] = useState('Todos');
  var [timeFilter, setTimeFilter] = useState('Todos');
  
  var category = categories.find(function(c) { return c.id === categoryId; });
  
  if (!category) {
    return React.createElement(Navigate, { to: '/receitas', replace: true });
  }

  var filtered = recipes.filter(function(r) {
    if (r.category !== categoryId) return false;
    if (levelFilter !== 'Todos' && r.level !== levelFilter) return false;
    
    if (timeFilter !== 'Todos') {
      var mins = parseInt((r.time || '0').replace(/[^0-9]/g, ''), 10);
      if (timeFilter === '<=30' && mins > 30) return false;
      if (timeFilter === '30-60' && (mins <= 30 || mins > 60)) return false;
      if (timeFilter === '>60' && mins <= 60) return false;
    }
    return true;
  });

  var levels = ['Todos', 'Iniciante', 'Intermediário', 'Avançado'];
  var times = [
    { key: 'Todos', label: 'Qualquer' },
    { key: '<=30', label: '≤30 min' },
    { key: '30-60', label: '30–60 min' },
    { key: '>60', label: '+60 min' },
  ];

  return (
    <div className="animate-fade-in cv">
      <h2 className="cv-title mb-4">{category.name}</h2>

      <div className="cv-filters mb-4">
        <div className="cv-pills">
          {levels.map(function(lv) {
            return (
              <button
                key={lv}
                className={'cv-pill' + (levelFilter === lv ? ' active' : '')}
                onClick={function() { setLevelFilter(lv); }}
              >{lv}</button>
            );
          })}
        </div>
        <div className="cv-pills mt-2">
          {times.map(function(t) {
            return (
              <button
                key={t.key}
                className={'cv-pill' + (timeFilter === t.key ? ' active' : '')}
                onClick={function() { setTimeFilter(t.key); }}
              >{t.label}</button>
            );
          })}
        </div>
      </div>

      {filtered.length > 0 ? (
        <div className="flex flex-col gap-3">
          {filtered.map(function(recipe) {
            return <RecipeCard key={recipe.id} recipe={recipe} />;
          })}
        </div>
      ) : (
        <div className="card text-center" style={{ padding: '40px' }}>
          <p className="text-muted">Nenhuma receita encontrada.</p>
          <button className="btn btn-outline mt-4" onClick={function() { setLevelFilter('Todos'); setTimeFilter('Todos'); }}>
            Limpar Filtros
          </button>
        </div>
      )}
      
      <style>{`
        .cv-title { font-family: var(--font-serif); font-size: 22px; }
        .cv-pills { display: flex; gap: 8px; overflow-x: auto; padding-bottom: 4px; }
        .cv-pills::-webkit-scrollbar { height: 0; }
        .cv-pill {
          padding: 8px 14px;
          border-radius: 20px;
          border: 0.5px solid #EAD8C4;
          background: transparent;
          color: #7A5C48;
          font-family: var(--font-sans);
          font-size: 13px;
          cursor: pointer;
          white-space: nowrap;
          transition: all 200ms;
          min-height: 36px;
        }
        .cv-pill.active {
          background: #F5E6DA;
          color: #B8601E;
          border-color: #B8601E;
          font-weight: 500;
        }
      `}</style>
    </div>
  );
};

export default CategoryView;
