import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, ChevronRight, Droplet } from 'lucide-react';

const RecipeCard = ({ recipe }) => {
  const navigate = useNavigate();
  const [isFav, setIsFav] = useState(false);

  useEffect(() => {
    setIsFav(localStorage.getItem('recipe_fav_' + recipe.id) === 'true');
  }, [recipe.id]);

  const toggleFav = (e) => {
    e.stopPropagation();
    const next = !isFav;
    setIsFav(next);
    if (next) localStorage.setItem('recipe_fav_' + recipe.id, 'true');
    else localStorage.removeItem('recipe_fav_' + recipe.id);
  };

  const color = recipe.color || '#B8601E';

  return (
    <div className="rc" onClick={() => navigate('/recipe/' + recipe.id)} style={{ borderLeftColor: color }}>
      <div className="rc-icon" style={{ backgroundColor: color + '1A' }}>
        <Droplet size={20} color={color} />
      </div>
      <div className="rc-info">
        <h4 className="rc-title">{recipe.title}</h4>
        <p className="rc-meta">{recipe.level} · {recipe.time}</p>
        <p className="rc-profit">💰 Lucro: {recipe.profitEstimate || 'R$ 60–100'}/lote</p>
      </div>
      <div className="rc-actions">
        <button className={'rc-fav' + (isFav ? ' active' : '')} onClick={toggleFav} aria-label="Favoritar">
          <Heart size={14} fill={isFav ? '#B8601E' : 'none'} color={isFav ? '#B8601E' : '#A88070'} />
        </button>
        <div className="rc-go">
          <ChevronRight size={14} color="white" />
        </div>
      </div>

      <style>{`
        .rc {
          height: 88px;
          display: flex;
          align-items: center;
          padding: 0 12px;
          background: #FFFFFF;
          border-radius: 14px;
          border: 0.5px solid #EAD8C4;
          border-left: 6px solid;
          cursor: pointer;
          transition: transform 200ms, box-shadow 200ms;
          gap: 12px;
        }
        .rc:hover {
          transform: translateY(-1px);
          box-shadow: 0 4px 16px rgba(45,26,10,0.08);
        }
        .rc-icon {
          width: 36px; height: 36px;
          border-radius: 8px;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
        }
        .rc-info { flex: 1; min-width: 0; }
        .rc-title {
          font-family: var(--font-sans);
          font-size: 14px; font-weight: 600;
          color: #2D1A0A;
          white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
          margin-bottom: 2px;
        }
        .rc-meta { font-size: 12px; color: #7A5C48; margin-bottom: 2px; }
        .rc-profit { font-size: 12px; color: #6B8F6D; font-weight: 500; }
        .rc-actions { display: flex; flex-direction: column; gap: 6px; flex-shrink: 0; }
        .rc-fav {
          width: 28px; height: 28px;
          border-radius: 50%; border: 0.5px solid #EAD8C4;
          background: #FFF;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; transition: all 200ms;
        }
        .rc-fav.active { border-color: #B8601E; background: #FDF7F2; }
        .rc-go {
          width: 28px; height: 28px;
          border-radius: 50%; border: none;
          background: #B8601E;
          display: flex; align-items: center; justify-content: center;
        }
      `}</style>
    </div>
  );
};

export default RecipeCard;
