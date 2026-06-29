import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const WelcomeModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('welcomed') !== 'true') {
      setIsOpen(true);
    }
  }, []);

  const close = () => {
    localStorage.setItem('welcomed', 'true');
    setIsOpen(false);
  };

  const handleStart = () => {
    close();
    navigate('/recipe/1');
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="wm-overlay" onClick={close} />
      <div className="wm-modal">
        <div className="wm-emoji">🧴</div>
        <h2 className="wm-title">Bem-vinda à sua Saboaria!</h2>
        <p className="wm-body">
          Você acabou de dar o primeiro passo para transformar um hobby em renda extra real.
        </p>
        <p className="wm-body">
          Aqui você tem <strong>50 receitas testadas</strong>, com custos e preços incluídos — tudo que precisa para fazer e vender hoje.
        </p>
        <button className="btn btn-primary w-full wm-btn" onClick={handleStart}>
          Fazer minha 1ª receita agora
        </button>
        <button className="wm-link" onClick={close}>
          Explorar por conta própria
        </button>
      </div>

      <style>{`
        .wm-overlay {
          position: fixed;
          inset: 0;
          background: rgba(45,26,10,0.6);
          z-index: 200;
          animation: fadeIn 200ms ease;
        }
        .wm-modal {
          position: fixed;
          inset: 0;
          background: #FFFFFF;
          z-index: 210;
          padding: 40px 24px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          animation: slideUp 300ms ease;
        }
        @media (min-width: 640px) {
          .wm-modal {
            inset: auto;
            top: 50%; left: 50%;
            transform: translate(-50%, -50%);
            max-width: 420px;
            width: 90%;
            border-radius: 20px;
            padding: 36px 28px;
          }
        }
        @keyframes slideUp {
          from { transform: translateY(40px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .wm-emoji { font-size: 56px; margin-bottom: 16px; }
        .wm-title {
          font-family: var(--font-serif);
          font-size: 24px;
          color: #2D1A0A;
          margin-bottom: 16px;
        }
        .wm-body {
          font-size: 15px;
          color: #7A5C48;
          line-height: 1.6;
          margin-bottom: 12px;
          max-width: 340px;
        }
        .wm-btn {
          margin-top: 20px;
          border-radius: 12px;
          padding: 16px;
          font-size: 16px;
          width: 100%;
          max-width: 320px;
        }
        .wm-link {
          background: none;
          border: none;
          color: #7A5C48;
          font-family: var(--font-sans);
          font-size: 14px;
          margin-top: 16px;
          cursor: pointer;
          text-decoration: underline;
        }
      `}</style>
    </>
  );
};

export default WelcomeModal;
