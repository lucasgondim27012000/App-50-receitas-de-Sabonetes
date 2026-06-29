import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle, ChevronRight } from 'lucide-react';
import { miniAulas } from '../data/miniAulas';
import AulaAnimada from '../components/AulaAnimada';

var LessonDetail = function() {
  var params = useParams();
  var lessonId = parseInt(params.lessonId, 10);
  var navigate = useNavigate();
  var [isViewed, setIsViewed] = useState(false);

  var aula = miniAulas.find(function(a) { return a.id === lessonId; });

  useEffect(function() {
    if (aula) {
      setIsViewed(localStorage.getItem('aula_vista_' + aula.id) === 'true');
    }
  }, [aula]);

  if (!aula) {
    return (
      <div className="text-center" style={{ padding: '60px 20px' }}>
        <h2>Aula não encontrada</h2>
        <button className="btn btn-primary mt-4" onClick={function() { navigate('/aprender'); }}>Voltar</button>
      </div>
    );
  }

  var sameTrack = miniAulas.filter(function(a) { return a.track === aula.track; })
    .sort(function(a, b) { return a.order - b.order; });
  var currentIndex = sameTrack.findIndex(function(a) { return a.id === aula.id; });
  var nextLesson = sameTrack[currentIndex + 1];

  var markViewed = function() {
    localStorage.setItem('aula_vista_' + aula.id, 'true');
    setIsViewed(true);
  };

  return (
    <div className="animate-fade-in ld">
      <button className="ld-back mb-4" onClick={function() { navigate('/aprender'); }}>
        <ArrowLeft size={20} /> Voltar
      </button>

      {/* Animated Player */}
      <div className="mb-4">
        <AulaAnimada aula={aula} onComplete={markViewed} />
      </div>

      <h1 className="ld-title mb-2">{aula.title}</h1>
      <p className="ld-meta text-muted mb-4">
        {'Aula ' + (currentIndex + 1) + ' de ' + sameTrack.length + ' · ' + aula.duration}
      </p>
      <p className="ld-desc mb-6">{aula.description}</p>

      <button
        className={'btn w-full mb-3' + (isViewed ? ' ld-viewed' : ' btn-primary')}
        onClick={markViewed}
      >
        {isViewed ? '✓ Aula concluída!' : '✓ Marcar como vista'}
      </button>

      {nextLesson && (
        <button className="btn btn-outline w-full mb-8" onClick={function() { navigate('/aula/' + nextLesson.id); }}>
          Próxima aula → <ChevronRight size={16} />
        </button>
      )}

      <style>{`
        .ld-back {
          display: flex; align-items: center; gap: 6px;
          background: none; border: none; color: #7A5C48;
          font-family: var(--font-sans); font-size: 15px;
          cursor: pointer; padding: 4px 0;
        }
        .ld-title { font-family: var(--font-serif); font-size: 20px; }
        .ld-meta { font-size: 13px; }
        .ld-desc { font-size: 15px; line-height: 1.6; color: #4A3A2D; }
        .ld-viewed {
          background: #C0DD97; border: 1px solid #9BC06D;
          color: #27500A;
        }
      `}</style>
    </div>
  );
};

export default LessonDetail;
