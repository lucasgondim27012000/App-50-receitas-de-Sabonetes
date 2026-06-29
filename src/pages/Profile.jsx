import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Award, Lock, Star, BookOpen, GraduationCap, Share2, DollarSign, Trophy, CheckCircle, Edit3, Camera } from 'lucide-react';
import { recipes } from '../data/recipes';
import { jsPDF } from 'jspdf';

var achievements = [
  { id: 'first', name: 'Primeira Receita', icon: '🌱', check: function(s) { return s.done >= 1; }, progress: function(s) { return s.done + '/1'; } },
  { id: 'learner', name: 'Aprendiz Dedicada', icon: '📚', check: function(s) { return s.aulas >= 5; }, progress: function(s) { return s.aulas + '/5'; } },
  { id: 'sale', name: 'Primeira Venda', icon: '💰', check: function(s) { return s.faturamento > 0; }, progress: function(s) { return s.faturamento > 0 ? 'Feito!' : 'Registre sua venda'; } },
  { id: 'ten', name: 'Saboeira de Verdade', icon: '⭐', check: function(s) { return s.done >= 10; }, progress: function(s) { return s.done + '/10'; } },
  { id: 'hundred', name: 'R$100 Faturados', icon: '💵', check: function(s) { return s.faturamento >= 100; }, progress: function(s) { return 'R$ ' + s.faturamento + '/100'; } },
  { id: 'master', name: 'Mestra Artesã', icon: '👑', check: function(s) { return s.done >= 50; }, progress: function(s) { return s.done + '/50'; } },
];

var Profile = function() {
  var navigate = useNavigate();
  var [nome, setNome] = useState('');
  var [faturamento, setFaturamento] = useState(0);
  var [editingName, setEditingName] = useState(false);
  var [stats, setStats] = useState({ done: 0, aulas: 0, faturamento: 0, achievements: 0 });
  var [profilePhoto, setProfilePhoto] = useState(null);

  useEffect(function() {
    var n = localStorage.getItem('nome_cliente') || '';
    var f = parseInt(localStorage.getItem('faturamento') || '0', 10);
    var photo = localStorage.getItem('profile_photo') || null;
    setNome(n);
    setFaturamento(f);
    setProfilePhoto(photo);

    var done = 0;
    for (var i = 1; i <= 50; i++) {
      if (localStorage.getItem('recipe_done_' + i) === 'true') done++;
    }

    var s = { done: done, aulas: done, faturamento: f, achievements: 0 };
    var unlocked = 0;
    achievements.forEach(function(a) { if (a.check(s)) unlocked++; });
    s.achievements = unlocked;
    setStats(s);
  }, []);

  var saveName = function() {
    localStorage.setItem('nome_cliente', nome);
    setEditingName(false);
  };

  var saveFaturamento = function(val) {
    var num = parseInt(val, 10) || 0;
    setFaturamento(num);
    localStorage.setItem('faturamento', String(num));
    var s = Object.assign({}, stats, { faturamento: num });
    var unlocked = 0;
    achievements.forEach(function(a) { if (a.check(s)) unlocked++; });
    s.achievements = unlocked;
    setStats(s);
  };

  var generateCertificate = function() {
    var doc = new jsPDF({ unit: 'mm', format: 'a4', orientation: 'landscape' });

    doc.setFillColor(45, 26, 10);
    doc.rect(0, 0, 297, 210, 'F');

    doc.setFillColor(253, 247, 242);
    doc.roundedRect(15, 15, 267, 180, 5, 5, 'F');

    doc.setTextColor(45, 26, 10);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(14);
    doc.text('CERTIFICADO DE CONCLUSAO', 148.5, 45, { align: 'center' });

    doc.setFontSize(28);
    doc.text(nome || 'Saboeira Artesa', 148.5, 75, { align: 'center' });

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(14);
    doc.setTextColor(122, 92, 72);
    doc.text('concluiu com sucesso 10 receitas do curso', 148.5, 95, { align: 'center' });
    doc.text('50 Receitas de Sabonetes Artesanais de Glicerina', 148.5, 108, { align: 'center' });

    doc.setFontSize(12);
    var today = new Date();
    var dateStr = today.getDate() + '/' + (today.getMonth() + 1) + '/' + today.getFullYear();
    doc.text(dateStr, 148.5, 135, { align: 'center' });

    doc.setDrawColor(184, 96, 30);
    doc.setLineWidth(0.5);
    doc.line(80, 155, 217, 155);

    doc.setTextColor(184, 96, 30);
    doc.setFontSize(10);
    doc.text('Saboaria Artesanal - Guia Pratico Completo', 148.5, 165, { align: 'center' });

    doc.save('certificado_saboeira.pdf');
  };

  var handleShare = function() {
    var msg = 'Olha que app incrível que estou usando para fazer e vender sabonetes artesanais! 🧼💰';
    var link = 'https://brp2-sabonetes-artesanais.vercel.app/';
    if (navigator.share) {
      navigator.share({ title: 'Saboaria Artesanal', text: msg, url: link }).catch(function() {});
    } else {
      navigator.clipboard.writeText(msg + '\n\n' + link).then(function() {
        alert('Link copiado!');
      });
    }
  };

  var certProgress = Math.min(stats.done, 10);

  return (
    <div className="animate-fade-in pf">
      <h1 className="pf-page-title mb-6">Meu Perfil</h1>

      {/* A) Profile Card */}
      <div className="card pf-profile mb-6">
        <div className="pf-avatar-wrap">
          <div className="pf-avatar" onClick={function() { document.getElementById('photo-input').click(); }}>
            {profilePhoto ? (
              React.createElement('img', { src: profilePhoto, className: 'pf-avatar-img', alt: '' })
            ) : (
              nome ? nome.charAt(0).toUpperCase() : '🧼'
            )}
            <div className="pf-avatar-overlay"><Camera size={16} /></div>
          </div>
          <input id="photo-input" type="file" accept="image/*" style={{ display: 'none' }} onChange={function(e) {
            var file = e.target.files && e.target.files[0];
            if (!file) return;
            var reader = new FileReader();
            reader.onload = function(ev) {
              var data = ev.target.result;
              // Compress by resizing if too large
              var img = new Image();
              img.onload = function() {
                var canvas = document.createElement('canvas');
                var maxSize = 200;
                var w = img.width;
                var h = img.height;
                if (w > maxSize || h > maxSize) {
                  if (w > h) { h = Math.round(h * maxSize / w); w = maxSize; }
                  else { w = Math.round(w * maxSize / h); h = maxSize; }
                }
                canvas.width = w;
                canvas.height = h;
                canvas.getContext('2d').drawImage(img, 0, 0, w, h);
                var compressed = canvas.toDataURL('image/jpeg', 0.7);
                setProfilePhoto(compressed);
                localStorage.setItem('profile_photo', compressed);
              };
              img.src = data;
            };
            reader.readAsDataURL(file);
          }} />
        </div>
        <div className="pf-info">
          {editingName ? (
            <div className="pf-edit-row">
              <input className="pf-name-input" value={nome} placeholder="Seu nome"
                onChange={function(e) { setNome(e.target.value); }} />
              <button className="btn btn-primary" style={{ padding: '8px 14px', minHeight: '36px' }} onClick={saveName}>Salvar</button>
            </div>
          ) : (
            <div>
              <h2 className="pf-greeting">{'Olá, ' + (nome || 'Saboeira') + '! 🧼'}</h2>
              <button className="pf-edit-btn" onClick={function() { setEditingName(true); }}>
                <Edit3 size={14} /> Editar nome
              </button>
            </div>
          )}
        </div>
      </div>

      {/* B) Stats */}
      <div className="grid grid-2 gap-3 mb-6">
        <div className="card pf-stat">
          <BookOpen size={22} color="#B8601E" />
          <span className="pf-stat-val">{stats.done}</span>
          <span className="pf-stat-label">receitas feitas</span>
        </div>
        <div className="card pf-stat">
          <GraduationCap size={22} color="#9060BC" />
          <span className="pf-stat-val">{stats.aulas}</span>
          <span className="pf-stat-label">apresentações</span>
        </div>
        <div className="card pf-stat">
          <DollarSign size={22} color="#6B8F6D" />
          <div className="pf-fat-row">
            <span>R$</span>
            <input type="number" className="pf-fat-input" value={faturamento}
              onChange={function(e) { saveFaturamento(e.target.value); }} />
          </div>
          <span className="pf-stat-label">faturado</span>
        </div>
        <div className="card pf-stat">
          <Trophy size={22} color="#C89B3C" />
          <span className="pf-stat-val">{stats.achievements}</span>
          <span className="pf-stat-label">conquistas</span>
        </div>
      </div>

      {/* C) Achievements */}
      <h3 className="pf-section-title mb-3">🏅 Suas Conquistas</h3>
      <div className="flex flex-col gap-3 mb-6">
        {achievements.map(function(a) {
          var unlocked = a.check(stats);
          return (
            <div key={a.id} className={'card pf-achievement' + (unlocked ? ' unlocked' : '')}>
              <span className="pa-icon">{unlocked ? a.icon : '🔒'}</span>
              <div className="pa-info">
                <h4>{a.name}</h4>
                <p className="text-muted" style={{ fontSize: '13px' }}>{unlocked ? 'Conquista desbloqueada!' : a.progress(stats)}</p>
              </div>
              {unlocked && <CheckCircle size={20} color="#6B8F6D" />}
            </div>
          );
        })}
      </div>

      {/* D) Certificate */}
      <div className="card pf-cert mb-6">
        <h3 className="pf-section-title mb-3">🎓 Seu Certificado</h3>
        {stats.done >= 10 ? (
          <div>
            <p className="text-muted mb-3">Parabéns! Você completou 10 receitas e desbloqueou seu certificado.</p>
            <button className="btn btn-primary w-full" onClick={generateCertificate}>
              Gerar Certificado em PDF
            </button>
          </div>
        ) : (
          <div>
            <p className="text-muted mb-3">{'Complete 10 receitas para desbloquear. Progresso: ' + certProgress + '/10'}</p>
            <div className="pf-cert-bar">
              <div className="pf-cert-fill" style={{ width: (certProgress * 10) + '%' }}></div>
            </div>
            <p className="text-muted mt-2" style={{ fontSize: '13px' }}>
              {'🔒 Faltam ' + (10 - certProgress) + ' receitas'}
            </p>
          </div>
        )}
      </div>

      {/* E) Share */}
      <div className="pf-share mb-8">
        <p className="pf-share-title">💚 Indique uma amiga</p>
        <p className="text-muted" style={{ fontSize: '14px' }}>
          Conhece alguém que também quer ganhar uma renda extra? Compartilhe!
        </p>
        <button className="btn btn-outline mt-3 w-full" style={{ borderColor: '#6B8F6D', color: '#27500A' }} onClick={handleShare}>
          <Share2 size={16} /> Compartilhar app
        </button>
      </div>

      <style>{`
        .pf-page-title { font-family: var(--font-serif); font-size: 22px; }
        .pf-section-title { font-family: var(--font-serif); font-size: 18px; }

        .pf-profile {
          display: flex; align-items: center; gap: 16px;
        }
        .pf-avatar-wrap { flex-shrink: 0; }
        .pf-avatar {
          width: 64px; height: 64px;
          border-radius: 50%;
          background: linear-gradient(135deg, #B8601E, #C89B3C);
          display: flex; align-items: center; justify-content: center;
          color: white; font-size: 24px; font-weight: 700;
          cursor: pointer; position: relative; overflow: hidden;
        }
        .pf-avatar-img {
          width: 100%; height: 100%; object-fit: cover;
          border-radius: 50%;
        }
        .pf-avatar-overlay {
          position: absolute; inset: 0;
          background: rgba(0,0,0,0.3);
          display: flex; align-items: center; justify-content: center;
          color: white; opacity: 0;
          transition: opacity 200ms;
        }
        .pf-avatar:hover .pf-avatar-overlay { opacity: 1; }
        .pf-info { flex: 1; }
        .pf-greeting {
          font-family: var(--font-serif); font-size: 20px; margin-bottom: 4px;
        }
        .pf-edit-btn {
          background: none; border: none;
          color: #7A5C48; font-size: 13px;
          cursor: pointer; display: flex;
          align-items: center; gap: 4px;
          font-family: var(--font-sans);
        }
        .pf-edit-row { display: flex; gap: 8px; }
        .pf-name-input {
          flex: 1; border: 1px solid #EAD8C4;
          border-radius: 8px; padding: 8px 12px;
          font-family: var(--font-sans); font-size: 15px;
          outline: none;
        }

        .pf-stat {
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          padding: 16px 12px; gap: 4px; text-align: center;
        }
        .pf-stat-val { font-size: 22px; font-weight: 700; color: #2D1A0A; }
        .pf-stat-label { font-size: 12px; color: #7A5C48; }
        .pf-fat-row {
          display: flex; align-items: center; gap: 2px;
          font-size: 18px; font-weight: 700; color: #27500A;
        }
        .pf-fat-input {
          width: 60px; border: none; outline: none;
          font-size: 18px; font-weight: 700;
          color: #27500A; text-align: center;
          background: transparent;
          font-family: var(--font-sans);
        }

        .pf-achievement {
          display: flex; align-items: center; gap: 12px;
          padding: 14px 16px; opacity: 0.5;
        }
        .pf-achievement.unlocked { opacity: 1; }
        .pa-icon { font-size: 24px; }
        .pa-info { flex: 1; }
        .pa-info h4 { font-size: 14px; font-weight: 600; margin-bottom: 2px; }

        .pf-cert-bar {
          height: 8px; background: #EAD8C4;
          border-radius: 4px; overflow: hidden;
        }
        .pf-cert-fill {
          height: 100%; background: #B8601E;
          border-radius: 4px; transition: width 300ms;
        }

        .pf-share {
          background: #EAF2EB;
          border-left: 3px solid #6B8F6D;
          border-radius: 14px; padding: 20px;
        }
        .pf-share-title { font-size: 16px; font-weight: 600; color: #27500A; margin-bottom: 4px; }
      `}</style>
    </div>
  );
};

export default Profile;
