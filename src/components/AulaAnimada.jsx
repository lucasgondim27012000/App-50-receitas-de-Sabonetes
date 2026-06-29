import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react';

/* ──────────────────────────────────────────────
   ANIMATION SCENES — Pure CSS + React
   Each returns a styled div with keyframe anims
   ────────────────────────────────────────────── */

function SceneMateriaisIntro() {
  return (
    <div className="scene">
      <div className="si-title">O que você precisa</div>
      <div className="si-icons">
        <div className="si-icon si-d1">🧴</div>
        <div className="si-icon si-d2">🎨</div>
        <div className="si-icon si-d3">🔬</div>
        <div className="si-icon si-d4">📦</div>
      </div>
      <style>{`
        .si-title { font-family: var(--font-serif); font-size: 20px; color: #2D1A0A; margin-bottom: 20px; animation: fadeInUp 600ms ease; }
        .si-icons { display: flex; gap: 20px; justify-content: center; }
        .si-icon { font-size: 40px; opacity: 0; animation: popIn 400ms ease forwards; }
        .si-d1 { animation-delay: 300ms; }
        .si-d2 { animation-delay: 600ms; }
        .si-d3 { animation-delay: 900ms; }
        .si-d4 { animation-delay: 1200ms; }
        @keyframes popIn { from { opacity:0; transform:scale(0.3); } to { opacity:1; transform:scale(1); } }
      `}</style>
    </div>
  );
}

function SceneBaseGlicerina() {
  return (
    <div className="scene">
      <div className="bg-block">
        <div className="bg-shine"></div>
      </div>
      <div className="bg-label">Base de Glicerina</div>
      <style>{`
        .bg-block {
          width: 100px; height: 80px; border-radius: 8px;
          background: linear-gradient(135deg, rgba(255,255,255,0.9), rgba(220,210,200,0.6));
          border: 1px solid rgba(200,180,160,0.4);
          position: relative; overflow: hidden;
          box-shadow: 0 4px 20px rgba(0,0,0,0.1);
          animation: fadeInUp 500ms ease;
        }
        .bg-shine {
          position: absolute; top: -50%; left: -50%;
          width: 200%; height: 200%;
          background: linear-gradient(45deg, transparent 40%, rgba(255,255,255,0.6) 50%, transparent 60%);
          animation: shineMove 2s ease infinite;
        }
        @keyframes shineMove { from { transform: translateX(-100%); } to { transform: translateX(100%); } }
        .bg-label { margin-top: 14px; font-size: 14px; font-weight: 600; color: #2D1A0A; animation: fadeInUp 600ms ease 300ms both; }
      `}</style>
    </div>
  );
}

function SceneAromasCorantes() {
  return (
    <div className="scene">
      <div className="ac-row">
        <div className="ac-bottle ac-d1" style={{ background: 'linear-gradient(to bottom, #B57CBD, #8A4A8A)' }}></div>
        <div className="ac-bottle ac-d2" style={{ background: 'linear-gradient(to bottom, #5A8A5A, #3A6A3A)' }}></div>
        <div className="ac-bottle ac-d3" style={{ background: 'linear-gradient(to bottom, #E07B39, #C06020)' }}></div>
        <div className="ac-bottle ac-d4" style={{ background: 'linear-gradient(to bottom, #5A8BB0, #3A6B90)' }}></div>
      </div>
      <style>{`
        .ac-row { display: flex; gap: 16px; justify-content: center; align-items: flex-end; }
        .ac-bottle {
          width: 28px; border-radius: 4px 4px 8px 8px; opacity: 0;
          animation: slideUp 400ms ease forwards;
          box-shadow: 0 2px 8px rgba(0,0,0,0.15);
        }
        .ac-d1 { height: 60px; animation-delay: 200ms; }
        .ac-d2 { height: 50px; animation-delay: 500ms; }
        .ac-d3 { height: 55px; animation-delay: 800ms; }
        .ac-d4 { height: 45px; animation-delay: 1100ms; }
        @keyframes slideUp { from { opacity:0; transform:translateY(30px); } to { opacity:1; transform:translateY(0); } }
      `}</style>
    </div>
  );
}

function SceneUtensilios() {
  return (
    <div className="scene">
      <div className="ut-grid">
        <div className="ut-item ut-d1"><span>🧊</span><small>Forma</small></div>
        <div className="ut-item ut-d2"><span>🍳</span><small>Panela</small></div>
        <div className="ut-item ut-d3"><span>🥄</span><small>Espátula</small></div>
        <div className="ut-item ut-d4"><span>🌡️</span><small>Termômetro</small></div>
      </div>
      <style>{`
        .ut-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; max-width: 200px; }
        .ut-item {
          display: flex; flex-direction: column; align-items: center; gap: 4px;
          background: rgba(255,255,255,0.7); border-radius: 10px; padding: 12px 8px;
          opacity: 0; animation: popIn 400ms ease forwards;
        }
        .ut-item span { font-size: 28px; }
        .ut-item small { font-size: 11px; color: #7A5C48; }
        .ut-d1 { animation-delay: 200ms; }
        .ut-d2 { animation-delay: 400ms; }
        .ut-d3 { animation-delay: 600ms; }
        .ut-d4 { animation-delay: 800ms; }
      `}</style>
    </div>
  );
}

function SceneOndeComprar() {
  return (
    <div className="scene">
      <div className="oc-cart">🛒</div>
      <div className="oc-price">a partir de R$50</div>
      <div className="oc-pulse"></div>
      <style>{`
        .oc-cart { font-size: 48px; animation: fadeInUp 500ms ease; position: relative; z-index: 2; }
        .oc-price {
          margin-top: 12px; font-size: 18px; font-weight: 700; color: #27500A;
          animation: fadeInUp 500ms ease 400ms both;
        }
        .oc-pulse {
          position: absolute; width: 80px; height: 80px; border-radius: 50%;
          background: rgba(107,143,109,0.15);
          animation: pulse 2s ease infinite;
        }
        @keyframes pulse { 0%,100% { transform: scale(0.8); opacity: 0.5; } 50% { transform: scale(1.3); opacity: 0; } }
      `}</style>
    </div>
  );
}

/* AULA 2 — Derreter */
function SceneCortarBase() {
  return (
    <div className="scene">
      <div className="cb-block">
        <div className="cb-line cb-h"></div>
        <div className="cb-line cb-v"></div>
      </div>
      <div className="cb-cubes">
        <div className="cb-cube cb-c1"></div>
        <div className="cb-cube cb-c2"></div>
        <div className="cb-cube cb-c3"></div>
        <div className="cb-cube cb-c4"></div>
      </div>
      <style>{`
        .cb-block {
          width: 90px; height: 60px; border-radius: 6px;
          background: linear-gradient(135deg, rgba(255,255,255,0.85), rgba(230,220,210,0.6));
          border: 1px solid rgba(200,180,160,0.3);
          position: relative; animation: fadeInUp 400ms ease;
        }
        .cb-line { position: absolute; background: #B8601E; }
        .cb-h { width: 0; height: 1px; top: 50%; left: 0; animation: cutH 800ms ease 600ms forwards; }
        .cb-v { width: 1px; height: 0; top: 0; left: 50%; animation: cutV 800ms ease 1000ms forwards; }
        @keyframes cutH { to { width: 100%; } }
        @keyframes cutV { to { height: 100%; } }
        .cb-cubes { display: flex; gap: 6px; margin-top: 16px; }
        .cb-cube {
          width: 20px; height: 20px; border-radius: 3px;
          background: linear-gradient(135deg, rgba(255,255,255,0.9), rgba(230,220,210,0.5));
          border: 0.5px solid rgba(200,180,160,0.3);
          opacity: 0; animation: popIn 300ms ease forwards;
        }
        .cb-c1 { animation-delay: 1600ms; }
        .cb-c2 { animation-delay: 1800ms; }
        .cb-c3 { animation-delay: 2000ms; }
        .cb-c4 { animation-delay: 2200ms; }
      `}</style>
    </div>
  );
}

function SceneBanhoMaria() {
  return (
    <div className="scene">
      <div className="bm-outer">
        <div className="bm-water"></div>
        <div className="bm-inner">
          <div className="bm-liquid"></div>
        </div>
        <div className="bm-heat bm-h1"></div>
        <div className="bm-heat bm-h2"></div>
        <div className="bm-heat bm-h3"></div>
      </div>
      <style>{`
        .bm-outer {
          width: 120px; height: 80px; border-radius: 0 0 12px 12px;
          border: 2px solid #A88070; border-top: none;
          position: relative; animation: fadeInUp 400ms ease;
        }
        .bm-water {
          position: absolute; bottom: 0; left: 0; right: 0; height: 40%;
          background: rgba(90,139,176,0.3); border-radius: 0 0 10px 10px;
        }
        .bm-inner {
          position: absolute; top: 10px; left: 20px; right: 20px; bottom: 15px;
          border: 1.5px solid #A88070; border-radius: 0 0 6px 6px; border-top: none;
          overflow: hidden;
        }
        .bm-liquid {
          position: absolute; bottom: 0; left: 0; right: 0; height: 0;
          background: rgba(253,247,242,0.8);
          animation: fillLiquid 2s ease 800ms forwards;
        }
        @keyframes fillLiquid { to { height: 60%; } }
        .bm-heat {
          position: absolute; bottom: -20px; width: 8px; height: 8px;
          border-radius: 50%; background: rgba(184,96,30,0.4);
          animation: heatWave 1.5s ease infinite;
        }
        .bm-h1 { left: 25%; animation-delay: 0s; }
        .bm-h2 { left: 50%; animation-delay: 0.5s; }
        .bm-h3 { left: 75%; animation-delay: 1s; }
        @keyframes heatWave { 0% { transform: translateY(0) scale(1); opacity: 0.6; } 100% { transform: translateY(-30px) scale(0.3); opacity: 0; } }
      `}</style>
    </div>
  );
}

function SceneTermometro(props) {
  var target = props.target || 65;
  var fillPct = Math.min(target / 100, 0.85) * 100;
  var isWarning = props.warning;
  var fillColor = isWarning ? '#E04040' : (target <= 55 ? '#5A8BB0' : '#B8601E');
  return (
    <div className="scene">
      <div className="tm-body">
        <div className="tm-tube">
          <div className="tm-fill" style={{ background: fillColor, animationName: 'tmFill' }}></div>
          <div className="tm-mark" style={{ bottom: (fillPct - 2) + '%' }}>
            <span>{target + '°C'}</span>
          </div>
        </div>
        <div className="tm-bulb" style={{ background: fillColor }}></div>
      </div>
      {isWarning && <div className="tm-warn">⚠️</div>}
      <style>{`
        .tm-body { display: flex; flex-direction: column; align-items: center; animation: fadeInUp 400ms ease; }
        .tm-tube {
          width: 16px; height: 100px; border-radius: 8px 8px 0 0;
          border: 2px solid #A88070; position: relative; overflow: hidden;
          background: rgba(255,255,255,0.5);
        }
        .tm-fill {
          position: absolute; bottom: 0; left: 0; right: 0;
          height: 0; border-radius: 6px 6px 0 0;
          animation: tmFill 2s ease forwards;
        }
        @keyframes tmFill { to { height: ${fillPct}%; } }
        .tm-mark {
          position: absolute; right: -50px; font-size: 14px;
          font-weight: 700; color: #2D1A0A;
          opacity: 0; animation: fadeIn 300ms ease 1.5s forwards;
        }
        @keyframes fadeIn { to { opacity: 1; } }
        .tm-bulb {
          width: 24px; height: 24px; border-radius: 50%;
          border: 2px solid #A88070; margin-top: -2px;
        }
        .tm-warn {
          font-size: 36px; margin-top: 10px;
          animation: shake 500ms ease 2s both;
        }
        @keyframes shake { 0%,100% { transform: translateX(0); } 25% { transform: translateX(-6px); } 75% { transform: translateX(6px); } }
      `}</style>
    </div>
  );
}

function ScenePontoCerto() {
  return (
    <div className="scene">
      <div className="pc-bowl">
        <div className="pc-liquid">
          <div className="pc-shine"></div>
        </div>
        <div className="pc-stir"></div>
      </div>
      <style>{`
        .pc-bowl {
          width: 100px; height: 60px; border-radius: 0 0 50px 50px;
          border: 2px solid #A88070; border-top: none;
          position: relative; overflow: hidden;
          animation: fadeInUp 400ms ease;
        }
        .pc-liquid {
          position: absolute; bottom: 0; left: 0; right: 0; height: 80%;
          background: linear-gradient(to bottom, rgba(253,247,242,0.9), rgba(245,230,218,0.7));
          border-radius: 0 0 48px 48px;
        }
        .pc-shine {
          position: absolute; top: 5px; left: 20%;
          width: 30px; height: 6px; border-radius: 3px;
          background: rgba(255,255,255,0.6);
          animation: shimmer 2s ease infinite;
        }
        @keyframes shimmer { 0%,100% { opacity: 0.4; } 50% { opacity: 1; } }
        .pc-stir {
          position: absolute; top: -10px; right: 20px;
          width: 3px; height: 50px; background: #A88070;
          border-radius: 2px; transform-origin: bottom center;
          animation: stir 3s ease infinite;
        }
        @keyframes stir { 0%,100% { transform: rotate(-15deg); } 50% { transform: rotate(15deg); } }
      `}</style>
    </div>
  );
}

/* AULA 3 — Cor e Aroma */
function SceneAdicionarAroma() {
  return (
    <div className="scene">
      <div className="aa-container">
        <div className="aa-bottle">💧</div>
        <div className="aa-drops">
          <div className="aa-drop aa-dr1"></div>
          <div className="aa-drop aa-dr2"></div>
          <div className="aa-drop aa-dr3"></div>
        </div>
        <div className="aa-bowl"></div>
        <div className="aa-wave aa-w1"></div>
        <div className="aa-wave aa-w2"></div>
      </div>
      <style>{`
        .aa-container { position: relative; width: 120px; height: 120px; }
        .aa-bottle { font-size: 32px; position: absolute; top: 0; left: 50%; transform: translateX(-50%); animation: fadeInUp 400ms ease; }
        .aa-drops { position: absolute; top: 35px; left: 50%; transform: translateX(-50%); }
        .aa-drop {
          width: 6px; height: 10px; background: #B57CBD; border-radius: 50% 50% 50% 50% / 30% 30% 70% 70%;
          position: absolute; animation: drop 1.5s ease infinite;
        }
        .aa-dr1 { left: -2px; animation-delay: 0s; }
        .aa-dr2 { left: 2px; animation-delay: 0.5s; }
        .aa-dr3 { left: 0; animation-delay: 1s; }
        @keyframes drop { 0% { transform: translateY(0); opacity: 0; } 30% { opacity: 1; } 100% { transform: translateY(50px); opacity: 0; } }
        .aa-bowl {
          position: absolute; bottom: 0; left: 10px; right: 10px; height: 40px;
          border-radius: 0 0 40px 40px;
          border: 2px solid #A88070; border-top: none;
          background: rgba(253,247,242,0.6);
        }
        .aa-wave {
          position: absolute; bottom: 20px; left: 50%; transform: translateX(-50%);
          width: 30px; height: 30px; border-radius: 50%;
          border: 1px solid rgba(181,124,189,0.3);
          animation: wave 2s ease infinite;
        }
        .aa-w1 { animation-delay: 0.5s; }
        .aa-w2 { animation-delay: 1.2s; }
        @keyframes wave { 0% { transform: translateX(-50%) scale(0.5); opacity: 0.8; } 100% { transform: translateX(-50%) scale(2); opacity: 0; } }
      `}</style>
    </div>
  );
}

function SceneAdicionarCor() {
  return (
    <div className="scene">
      <div className="acr-container">
        <div className="acr-bowl">
          <div className="acr-liquid"></div>
          <div className="acr-spread"></div>
        </div>
      </div>
      <style>{`
        .acr-container { position: relative; width: 120px; height: 90px; animation: fadeInUp 400ms ease; }
        .acr-bowl {
          width: 120px; height: 70px; border-radius: 0 0 60px 60px;
          border: 2px solid #A88070; border-top: none;
          position: absolute; bottom: 0; overflow: hidden;
        }
        .acr-liquid {
          position: absolute; bottom: 0; left: 0; right: 0; height: 75%;
          background: rgba(253,247,242,0.8);
          animation: colorChange 3s ease forwards;
        }
        @keyframes colorChange {
          0% { background: rgba(253,247,242,0.8); }
          50% { background: rgba(181,124,189,0.3); }
          100% { background: rgba(181,124,189,0.6); }
        }
        .acr-spread {
          position: absolute; bottom: 30%; left: 50%; transform: translateX(-50%);
          width: 8px; height: 8px; border-radius: 50%;
          background: #B57CBD;
          animation: spread 3s ease forwards;
        }
        @keyframes spread { 0% { width: 8px; height: 8px; opacity: 1; } 100% { width: 80px; height: 40px; opacity: 0; } }
      `}</style>
    </div>
  );
}

function SceneMisturar() {
  return (
    <div className="scene">
      <div className="mx-bowl">
        <div className="mx-liquid"></div>
        <div className="mx-spatula"></div>
      </div>
      <style>{`
        .mx-bowl {
          width: 100px; height: 60px; border-radius: 0 0 50px 50px;
          border: 2px solid #A88070; border-top: none;
          position: relative; overflow: hidden;
          animation: fadeInUp 400ms ease;
        }
        .mx-liquid {
          position: absolute; bottom: 0; left: 0; right: 0; height: 80%;
          background: linear-gradient(to right, rgba(181,124,189,0.5), rgba(181,124,189,0.3));
          border-radius: 0 0 48px 48px;
          animation: swirl 2s ease infinite;
        }
        @keyframes swirl { 0%,100% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } }
        .mx-spatula {
          position: absolute; top: -15px; left: 50%; transform-origin: bottom center;
          width: 4px; height: 55px; background: #A88070; border-radius: 2px;
          animation: stir 2.5s ease infinite;
        }
      `}</style>
    </div>
  );
}

function SceneResultadoCor() {
  return (
    <div className="scene">
      <div className="rc-soap">
        <div className="rc-glow"></div>
      </div>
      <div className="rc-check">✨</div>
      <style>{`
        .rc-soap {
          width: 70px; height: 50px; border-radius: 8px;
          background: linear-gradient(135deg, #C9A0D8, #B57CBD);
          box-shadow: 0 4px 20px rgba(181,124,189,0.3);
          position: relative; overflow: hidden;
          animation: fadeInUp 500ms ease;
        }
        .rc-glow {
          position: absolute; top: -50%; left: -50%;
          width: 200%; height: 200%;
          background: linear-gradient(45deg, transparent 40%, rgba(255,255,255,0.4) 50%, transparent 60%);
          animation: shineMove 2.5s ease infinite;
        }
        .rc-check { font-size: 32px; margin-top: 10px; animation: popIn 400ms ease 500ms both; }
      `}</style>
    </div>
  );
}

/* AULA 4 — Bolhas */
function SceneProblemaBolhas() {
  return (
    <div className="scene">
      <div className="pb-soap">
        <div className="pb-bubble pb-b1"></div>
        <div className="pb-bubble pb-b2"></div>
        <div className="pb-bubble pb-b3"></div>
        <div className="pb-bubble pb-b4"></div>
        <div className="pb-bubble pb-b5"></div>
      </div>
      <div className="pb-x">✗</div>
      <style>{`
        .pb-soap {
          width: 90px; height: 60px; border-radius: 8px;
          background: linear-gradient(135deg, #E8D8C8, #DCC8B8);
          position: relative; animation: fadeInUp 400ms ease;
        }
        .pb-bubble {
          position: absolute; border-radius: 50%;
          border: 1px solid rgba(255,255,255,0.6);
          background: rgba(255,255,255,0.2);
          animation: float 2s ease infinite;
        }
        .pb-b1 { width: 8px; height: 8px; top: 10px; left: 15px; animation-delay: 0s; }
        .pb-b2 { width: 5px; height: 5px; top: 5px; left: 40px; animation-delay: 0.3s; }
        .pb-b3 { width: 7px; height: 7px; top: 15px; left: 60px; animation-delay: 0.6s; }
        .pb-b4 { width: 4px; height: 4px; top: 8px; left: 30px; animation-delay: 0.9s; }
        .pb-b5 { width: 6px; height: 6px; top: 12px; left: 50px; animation-delay: 1.2s; }
        @keyframes float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-4px); } }
        .pb-x { color: #E04040; font-size: 28px; font-weight: 700; margin-top: 10px; animation: popIn 300ms ease 600ms both; }
      `}</style>
    </div>
  );
}

function SceneAlcoolSpray() {
  return (
    <div className="scene">
      <div className="as-bottle">
        <div className="as-body"></div>
        <div className="as-nozzle"></div>
        <div className="as-label">Álcool 70%</div>
      </div>
      <style>{`
        .as-bottle { position: relative; animation: fadeInUp 500ms ease; display: flex; flex-direction: column; align-items: center; }
        .as-body {
          width: 50px; height: 70px; border-radius: 0 0 8px 8px;
          background: linear-gradient(to bottom, #ADD8E6, #87CEEB);
          border: 1.5px solid #5A8BB0;
        }
        .as-nozzle {
          width: 20px; height: 15px; background: #888;
          border-radius: 3px 3px 0 0; margin-bottom: -1px;
        }
        .as-label { font-size: 11px; font-weight: 600; color: #2D1A0A; margin-top: 8px; }
      `}</style>
    </div>
  );
}

function SceneBorrifar() {
  return (
    <div className="scene">
      <div className="bf-container">
        <div className="bf-spray">
          <div className="bf-mist bf-m1"></div>
          <div className="bf-mist bf-m2"></div>
          <div className="bf-mist bf-m3"></div>
        </div>
        <div className="bf-soap">
          <div className="bf-bub bf-bb1"></div>
          <div className="bf-bub bf-bb2"></div>
          <div className="bf-bub bf-bb3"></div>
        </div>
      </div>
      <style>{`
        .bf-container { position: relative; width: 140px; height: 100px; animation: fadeInUp 400ms ease; }
        .bf-spray { position: absolute; top: 0; right: 10px; }
        .bf-mist {
          width: 4px; height: 4px; border-radius: 50%;
          background: rgba(90,139,176,0.4); position: absolute;
          animation: sprayDown 1s ease infinite;
        }
        .bf-m1 { left: 0; animation-delay: 0s; }
        .bf-m2 { left: 8px; animation-delay: 0.2s; }
        .bf-m3 { left: 16px; animation-delay: 0.4s; }
        @keyframes sprayDown { 0% { transform: translateY(0); opacity: 1; } 100% { transform: translateY(40px); opacity: 0; } }
        .bf-soap {
          position: absolute; bottom: 0; left: 10px; right: 10px; height: 40px;
          background: #E8D8C8; border-radius: 6px;
        }
        .bf-bub {
          position: absolute; border-radius: 50%;
          background: rgba(255,255,255,0.3); border: 1px solid rgba(255,255,255,0.5);
          animation: pop 2s ease forwards;
        }
        .bf-bb1 { width: 8px; height: 8px; top: 5px; left: 15px; animation-delay: 1s; }
        .bf-bb2 { width: 6px; height: 6px; top: 8px; left: 40px; animation-delay: 1.5s; }
        .bf-bb3 { width: 7px; height: 7px; top: 3px; left: 60px; animation-delay: 2s; }
        @keyframes pop { 0%,80% { transform: scale(1); opacity: 1; } 100% { transform: scale(0); opacity: 0; } }
      `}</style>
    </div>
  );
}

function SceneBolhasSumindo() {
  return (
    <div className="scene">
      <div className="bs-soap">
        <div className="bs-surface"></div>
      </div>
      <div className="bs-ok">✓</div>
      <style>{`
        .bs-soap {
          width: 90px; height: 60px; border-radius: 8px;
          background: linear-gradient(135deg, #E8D8C8, #DCC8B8);
          position: relative; overflow: hidden;
          animation: fadeInUp 400ms ease;
        }
        .bs-surface {
          position: absolute; top: 0; left: 0; right: 0; height: 4px;
          background: linear-gradient(to right, rgba(255,255,255,0.6), rgba(255,255,255,0.3));
          animation: smoothSurface 1.5s ease 500ms forwards;
        }
        @keyframes smoothSurface { from { opacity: 0; } to { opacity: 1; } }
        .bs-ok {
          color: #6B8F6D; font-size: 28px; font-weight: 700;
          margin-top: 10px; animation: popIn 400ms ease 1s both;
        }
      `}</style>
    </div>
  );
}

/* AULA 5 — Desenformar */
function SceneEsperarCurar() {
  return (
    <div className="scene">
      <div className="ec-clock">⏳</div>
      <div className="ec-text">2–4 horas</div>
      <style>{`
        .ec-clock { font-size: 48px; animation: fadeInUp 400ms ease; }
        .ec-text {
          margin-top: 10px; font-size: 16px; font-weight: 600; color: #7A5C48;
          animation: fadeInUp 400ms ease 400ms both;
        }
      `}</style>
    </div>
  );
}

function SceneTesteToque() {
  return (
    <div className="scene">
      <div className="tt-container">
        <div className="tt-soap"></div>
        <div className="tt-finger">👆</div>
      </div>
      <style>{`
        .tt-container { position: relative; width: 100px; height: 80px; }
        .tt-soap {
          position: absolute; bottom: 0; left: 5px; right: 5px; height: 50px;
          background: #E8D8C8; border-radius: 8px;
          animation: fadeInUp 400ms ease;
        }
        .tt-finger {
          position: absolute; top: 0; left: 50%; transform: translateX(-50%);
          font-size: 28px;
          animation: touchDown 1.5s ease infinite;
        }
        @keyframes touchDown { 0%,100% { transform: translateX(-50%) translateY(0); } 50% { transform: translateX(-50%) translateY(10px); } }
      `}</style>
    </div>
  );
}

function SceneGeladeira() {
  return (
    <div className="scene">
      <div className="gl-fridge">
        <div className="gl-door">
          <div className="gl-handle"></div>
        </div>
        <div className="gl-cold gl-c1">❄️</div>
        <div className="gl-cold gl-c2">❄️</div>
      </div>
      <div className="gl-time">15 min</div>
      <style>{`
        .gl-fridge {
          width: 60px; height: 80px; background: #E0E0E0;
          border-radius: 6px; position: relative;
          border: 1.5px solid #BDBDBD;
          animation: fadeInUp 400ms ease;
        }
        .gl-door {
          position: absolute; top: 2px; left: 2px; right: 2px; height: 45%;
          background: #F5F5F5; border-radius: 4px;
          border-bottom: 1px solid #BDBDBD;
        }
        .gl-handle { position: absolute; right: 4px; top: 50%; width: 2px; height: 10px; background: #999; border-radius: 1px; transform: translateY(-50%); }
        .gl-cold { position: absolute; font-size: 14px; animation: floatUp 2s ease infinite; }
        .gl-c1 { top: -5px; right: -15px; animation-delay: 0s; }
        .gl-c2 { top: 5px; right: -20px; animation-delay: 0.7s; }
        @keyframes floatUp { 0% { opacity: 0; transform: translateY(5px); } 50% { opacity: 1; } 100% { opacity: 0; transform: translateY(-10px); } }
        .gl-time { margin-top: 10px; font-size: 16px; font-weight: 600; color: #5A8BB0; animation: fadeInUp 400ms ease 500ms both; }
      `}</style>
    </div>
  );
}

function SceneDesenformar() {
  return (
    <div className="scene">
      <div className="df-container">
        <div className="df-mold">
          <div className="df-soap-inside"></div>
        </div>
        <div className="df-soap-out"></div>
      </div>
      <style>{`
        .df-container { position: relative; width: 140px; height: 80px; }
        .df-mold {
          position: absolute; left: 0; bottom: 0;
          width: 60px; height: 50px; border-radius: 6px;
          border: 2px dashed #A88070; background: rgba(200,180,160,0.1);
          animation: bendMold 2s ease 500ms forwards;
        }
        @keyframes bendMold { 50% { transform: perspective(100px) rotateY(-10deg); } 100% { transform: perspective(100px) rotateY(0); } }
        .df-soap-inside {
          position: absolute; inset: 4px; border-radius: 4px;
          background: #E8D8C8;
          animation: hideSoap 1s ease 1.5s forwards;
        }
        @keyframes hideSoap { to { opacity: 0; } }
        .df-soap-out {
          position: absolute; right: 10px; bottom: 5px;
          width: 55px; height: 40px; border-radius: 8px;
          background: linear-gradient(135deg, #F0E0D0, #E8D0C0);
          box-shadow: 0 4px 15px rgba(0,0,0,0.1);
          opacity: 0; animation: slideOut 600ms ease 2s forwards;
        }
        @keyframes slideOut { from { opacity: 0; transform: translateX(-20px); } to { opacity: 1; transform: translateX(0); } }
      `}</style>
    </div>
  );
}

function SceneResultadoPerfeito() {
  return (
    <div className="scene">
      <div className="rp-soap">
        <div className="rp-glow"></div>
      </div>
      <div className="rp-stars">
        <span className="rp-s1">✨</span>
        <span className="rp-s2">✨</span>
        <span className="rp-s3">✨</span>
      </div>
      <style>{`
        .rp-soap {
          width: 80px; height: 55px; border-radius: 10px;
          background: linear-gradient(135deg, #F5E6DA, #E8D0C0);
          box-shadow: 0 6px 24px rgba(184,96,30,0.15);
          position: relative; overflow: hidden;
          animation: fadeInUp 500ms ease;
        }
        .rp-glow {
          position: absolute; inset: -50%;
          background: linear-gradient(45deg, transparent 40%, rgba(255,255,255,0.5) 50%, transparent 60%);
          animation: shineMove 2s ease infinite;
        }
        .rp-stars { margin-top: 8px; display: flex; gap: 6px; }
        .rp-s1 { animation: popIn 300ms ease 300ms both; }
        .rp-s2 { animation: popIn 300ms ease 600ms both; }
        .rp-s3 { animation: popIn 300ms ease 900ms both; }
      `}</style>
    </div>
  );
}

/* AULA 6 — Embalar */
function ScenePorQueEmbalar() {
  return (
    <div className="scene">
      <div className="pe-compare">
        <div className="pe-item">
          <div className="pe-plain"></div>
          <small>Sem embalagem</small>
        </div>
        <div className="pe-arrow">→</div>
        <div className="pe-item pe-better">
          <div className="pe-wrapped">
            <div className="pe-ribbon"></div>
          </div>
          <small>Embalado</small>
        </div>
      </div>
      <style>{`
        .pe-compare { display: flex; align-items: center; gap: 16px; animation: fadeInUp 400ms ease; }
        .pe-item { display: flex; flex-direction: column; align-items: center; gap: 6px; }
        .pe-item small { font-size: 11px; color: #7A5C48; }
        .pe-plain { width: 45px; height: 30px; background: #E0D0C0; border-radius: 6px; }
        .pe-arrow { font-size: 20px; color: #B8601E; animation: pulseArrow 1.5s ease infinite; }
        @keyframes pulseArrow { 0%,100% { transform: translateX(0); } 50% { transform: translateX(5px); } }
        .pe-wrapped {
          width: 50px; height: 35px; background: #DEB887; border-radius: 6px;
          position: relative; box-shadow: 0 3px 12px rgba(0,0,0,0.1);
        }
        .pe-ribbon {
          position: absolute; top: -3px; left: 50%; transform: translateX(-50%);
          width: 30px; height: 6px; background: #B8601E; border-radius: 3px;
        }
        .pe-better { animation: popIn 500ms ease 600ms both; }
      `}</style>
    </div>
  );
}

function SceneOpcaoEconomica() {
  return (
    <div className="scene">
      <div className="oe-pkg">
        <div className="oe-kraft">
          <div className="oe-twine"></div>
        </div>
        <small>Papel Kraft + Barbante</small>
      </div>
      <style>{`
        .oe-pkg { display: flex; flex-direction: column; align-items: center; gap: 8px; animation: fadeInUp 500ms ease; }
        .oe-kraft {
          width: 65px; height: 50px; background: #C4A070; border-radius: 6px;
          position: relative; box-shadow: 0 3px 12px rgba(0,0,0,0.08);
        }
        .oe-twine {
          position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);
          width: 50px; height: 50px; border: 2px solid #8B6914; border-radius: 50%;
          clip-path: polygon(0 0, 100% 0, 100% 50%, 0 50%);
        }
        .oe-pkg small { font-size: 12px; color: #7A5C48; font-weight: 500; }
      `}</style>
    </div>
  );
}

function SceneOpcaoPremium() {
  return (
    <div className="scene">
      <div className="op-box">
        <div className="op-lid"></div>
        <div className="op-bow">🎀</div>
      </div>
      <small className="op-label">Caixinha com laço</small>
      <style>{`
        .op-box {
          width: 60px; height: 45px; background: #FFFFFF; border-radius: 4px;
          border: 1.5px solid #EAD8C4; position: relative;
          box-shadow: 0 4px 16px rgba(0,0,0,0.08);
          animation: fadeInUp 400ms ease;
        }
        .op-lid {
          position: absolute; top: -6px; left: -4px; right: -4px; height: 10px;
          background: #FFFFFF; border: 1.5px solid #EAD8C4; border-radius: 3px;
        }
        .op-bow { position: absolute; top: -18px; left: 50%; transform: translateX(-50%); font-size: 20px; animation: popIn 400ms ease 500ms both; }
        .op-label { display: block; margin-top: 10px; font-size: 12px; color: #7A5C48; font-weight: 500; animation: fadeInUp 400ms ease 300ms both; }
      `}</style>
    </div>
  );
}

function SceneEtiqueta() {
  return (
    <div className="scene">
      <div className="et-tag">
        <div className="et-name">Sabonete de Lavanda</div>
        <div className="et-info">Artesanal · 100g</div>
      </div>
      <style>{`
        .et-tag {
          width: 110px; padding: 10px 14px; background: #FFFFFF;
          border: 1px solid #EAD8C4; border-radius: 8px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.06);
          animation: fadeInUp 500ms ease;
          transform: rotate(-3deg);
        }
        .et-name { font-family: var(--font-serif); font-size: 12px; color: #2D1A0A; margin-bottom: 2px; }
        .et-info { font-size: 10px; color: #7A5C48; }
      `}</style>
    </div>
  );
}

function SceneConservacao() {
  return (
    <div className="scene">
      <div className="cv-icon">🏠</div>
      <div className="cv-text">Local fresco e seco</div>
      <div className="cv-val">Validade: 6 meses</div>
      <style>{`
        .cv-icon { font-size: 40px; animation: fadeInUp 400ms ease; }
        .cv-text { font-size: 14px; font-weight: 600; color: #2D1A0A; margin-top: 8px; animation: fadeInUp 400ms ease 300ms both; }
        .cv-val { font-size: 13px; color: #6B8F6D; font-weight: 500; margin-top: 4px; animation: fadeInUp 400ms ease 600ms both; }
      `}</style>
    </div>
  );
}

function SceneProntoVender() {
  return (
    <div className="scene">
      <div className="pv-product">
        <div className="pv-soap">
          <div className="pv-wrap"></div>
          <div className="pv-tag">R$15</div>
        </div>
        <div className="pv-sparkle pv-sp1">✨</div>
        <div className="pv-sparkle pv-sp2">💰</div>
        <div className="pv-sparkle pv-sp3">✨</div>
      </div>
      <style>{`
        .pv-product { position: relative; width: 120px; height: 80px; display: flex; align-items: center; justify-content: center; }
        .pv-soap {
          width: 60px; height: 45px; background: linear-gradient(135deg, #F0E0D0, #DCC8B8);
          border-radius: 8px; position: relative;
          box-shadow: 0 4px 16px rgba(0,0,0,0.1);
          animation: fadeInUp 500ms ease;
        }
        .pv-wrap {
          position: absolute; inset: 2px; border: 1px dashed #C4A070;
          border-radius: 6px;
        }
        .pv-tag {
          position: absolute; top: -8px; right: -12px;
          background: #27500A; color: white; font-size: 10px;
          font-weight: 700; padding: 2px 6px; border-radius: 4px;
          animation: popIn 300ms ease 600ms both;
        }
        .pv-sparkle { position: absolute; animation: popIn 400ms ease both; }
        .pv-sp1 { top: 0; left: 0; animation-delay: 800ms; }
        .pv-sp2 { bottom: 0; right: 0; font-size: 20px; animation-delay: 1000ms; }
        .pv-sp3 { top: 5px; right: 5px; animation-delay: 1200ms; }
      `}</style>
    </div>
  );
}

/* Generic scenes for tecnica track */
function SceneGenericIntro() {
  return (
    <div className="scene">
      <div className="gi-icon">🎨</div>
      <style>{`
        .gi-icon { font-size: 48px; animation: fadeInUp 500ms ease; }
      `}</style>
    </div>
  );
}

function SceneGenericStep() {
  return (
    <div className="scene">
      <div className="gs-hand">👆</div>
      <div className="gs-bar">
        <div className="gs-progress"></div>
      </div>
      <style>{`
        .gs-hand { font-size: 36px; animation: fadeInUp 400ms ease; margin-bottom: 12px; }
        .gs-bar { width: 100px; height: 6px; background: #EAD8C4; border-radius: 3px; overflow: hidden; }
        .gs-progress { height: 100%; width: 0; background: #B8601E; border-radius: 3px; animation: fillBar 2s ease forwards; }
        @keyframes fillBar { to { width: 100%; } }
      `}</style>
    </div>
  );
}

function SceneGenericResult() {
  return (
    <div className="scene">
      <div className="gr-check">✅</div>
      <div className="gr-sparkles">
        <span>✨</span><span>✨</span><span>✨</span>
      </div>
      <style>{`
        .gr-check { font-size: 48px; animation: popIn 500ms ease; }
        .gr-sparkles { display: flex; gap: 8px; margin-top: 8px; }
        .gr-sparkles span { animation: popIn 300ms ease both; }
        .gr-sparkles span:nth-child(1) { animation-delay: 400ms; }
        .gr-sparkles span:nth-child(2) { animation-delay: 600ms; }
        .gr-sparkles span:nth-child(3) { animation-delay: 800ms; }
      `}</style>
    </div>
  );
}

/* ──────────────────────────────────────────────
   ANIMATION MAPPER
   ────────────────────────────────────────────── */
var animMap = {
  'materiais-intro': SceneMateriaisIntro,
  'base-glicerina': SceneBaseGlicerina,
  'aromas-corantes': SceneAromasCorantes,
  'utensilios': SceneUtensilios,
  'onde-comprar': SceneOndeComprar,
  'cortar-base': SceneCortarBase,
  'banho-maria': SceneBanhoMaria,
  'temperatura-ideal': function() { return React.createElement(SceneTermometro, { target: 65 }); },
  'ponto-certo': ScenePontoCerto,
  'aviso-temperatura': function() { return React.createElement(SceneTermometro, { target: 80, warning: true }); },
  'resfriar-primeiro': function() { return React.createElement(SceneTermometro, { target: 55 }); },
  'adicionar-aroma': SceneAdicionarAroma,
  'adicionar-cor': SceneAdicionarCor,
  'misturar': SceneMisturar,
  'resultado-cor': SceneResultadoCor,
  'problema-bolhas': SceneProblemaBolhas,
  'alcool-spray': SceneAlcoolSpray,
  'borrifar': SceneBorrifar,
  'bolhas-sumindo': SceneBolhasSumindo,
  'dica-camadas': SceneBolhasSumindo,
  'esperar-curar': SceneEsperarCurar,
  'teste-toque': SceneTesteToque,
  'geladeira': SceneGeladeira,
  'desenformar': SceneDesenformar,
  'resultado-perfeito': SceneResultadoPerfeito,
  'por-que-embalar': ScenePorQueEmbalar,
  'opcao-economica': SceneOpcaoEconomica,
  'opcao-premium': SceneOpcaoPremium,
  'etiqueta': SceneEtiqueta,
  'conservacao': SceneConservacao,
  'pronto-vender': SceneProntoVender,
  'generic-intro': SceneGenericIntro,
  'generic-step': SceneGenericStep,
  'generic-result': SceneGenericResult,
};

/* ──────────────────────────────────────────────
   MAIN PLAYER COMPONENT
   ────────────────────────────────────────────── */
var AulaAnimada = function(props) {
  var aula = props.aula;
  var onComplete = props.onComplete;
  var etapas = aula.etapas || [];
  var [etapaAtual, setEtapaAtual] = useState(0);
  var [tocando, setTocando] = useState(true);

  // Reset when aula changes
  useEffect(function() {
    setEtapaAtual(0);
    setTocando(true);
  }, [aula.id]);

  // Auto-advance every 4 seconds
  useEffect(function() {
    if (!tocando) return;
    var timer = setTimeout(function() {
      if (etapaAtual < etapas.length - 1) {
        setEtapaAtual(function(e) { return e + 1; });
      } else {
        setTocando(false);
      }
    }, 4000);
    return function() { clearTimeout(timer); };
  }, [etapaAtual, tocando, etapas.length]);

  var goBack = function() {
    if (etapaAtual > 0) setEtapaAtual(etapaAtual - 1);
  };

  var goNext = function() {
    if (etapaAtual < etapas.length - 1) {
      setEtapaAtual(etapaAtual + 1);
    } else {
      setTocando(false);
    }
  };

  var togglePlay = function() {
    if (!tocando && etapaAtual >= etapas.length - 1) {
      setEtapaAtual(0);
      setTocando(true);
    } else {
      setTocando(!tocando);
    }
  };

  if (etapas.length === 0) {
    return (
      <div className="aa-placeholder">
        <Play size={48} color="#C8A890" />
        <p>Aula chegando em breve!</p>
      </div>
    );
  }

  var currentEtapa = etapas[etapaAtual];
  var AnimComponent = animMap[currentEtapa.animacao];
  var isLast = etapaAtual >= etapas.length - 1;

  return (
    <div className="aa-player">
      {/* Animation area */}
      <div className="aa-stage" key={etapaAtual}>
        <div className="aa-scene-wrapper">
          {AnimComponent ? (typeof AnimComponent === 'function' ? React.createElement(AnimComponent) : null) : null}
        </div>
      </div>

      {/* Progress dots */}
      <div className="aa-dots">
        {etapas.map(function(_, i) {
          return (
            <button
              key={i}
              className={'aa-dot' + (i === etapaAtual ? ' active' : i < etapaAtual ? ' done' : '')}
              onClick={function() { setEtapaAtual(i); }}
            />
          );
        })}
      </div>
      <div className="aa-step-label">
        {'Etapa ' + (etapaAtual + 1) + ' de ' + etapas.length}
      </div>

      {/* Text */}
      <div className="aa-text" key={'t' + etapaAtual}>
        {currentEtapa.texto}
      </div>

      {/* Controls */}
      <div className="aa-controls">
        <button className="aa-ctrl-btn" onClick={goBack} disabled={etapaAtual === 0}>
          <ChevronLeft size={20} />
        </button>
        <button className="aa-ctrl-play" onClick={togglePlay}>
          {tocando ? React.createElement(Pause, { size: 18 }) : React.createElement(Play, { size: 18 })}
          <span>{tocando ? 'Pausar' : (isLast ? 'Replay' : 'Continuar')}</span>
        </button>
        <button className="aa-ctrl-btn" onClick={goNext} disabled={isLast && !tocando}>
          <ChevronRight size={20} />
        </button>
      </div>

      <style>{`
        @media (prefers-reduced-motion: reduce) {
          .aa-stage * { animation: none !important; transition: none !important; }
        }

        @keyframes fadeInUp { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }

        .aa-player { width: 100%; }

        .aa-placeholder {
          width: 100%; aspect-ratio: 16/9;
          background: #2D1A0A; border-radius: 14px;
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          gap: 12px; color: #C8A890; font-size: 15px;
        }

        .aa-stage {
          width: 100%; aspect-ratio: 16/9;
          background: linear-gradient(135deg, #FBF3EA, #F5E6DA);
          border-radius: 14px; overflow: hidden;
          display: flex; align-items: center; justify-content: center;
          animation: fadeIn 300ms ease;
        }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }

        .aa-scene-wrapper {
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
        }

        .scene {
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          position: relative;
        }

        .aa-dots {
          display: flex; gap: 6px; justify-content: center;
          margin-top: 14px;
        }
        .aa-dot {
          width: 10px; height: 10px; border-radius: 50%;
          border: 1.5px solid #EAD8C4; background: transparent;
          cursor: pointer; padding: 0;
          transition: all 200ms;
        }
        .aa-dot.active { background: #B8601E; border-color: #B8601E; transform: scale(1.2); }
        .aa-dot.done { background: #6B8F6D; border-color: #6B8F6D; }

        .aa-step-label {
          text-align: center; font-size: 12px;
          color: #A88070; margin-top: 6px;
        }

        .aa-text {
          text-align: center; font-size: 15px;
          color: #2D1A0A; line-height: 1.5;
          padding: 14px 8px; min-height: 60px;
          animation: fadeInUp 300ms ease;
        }

        .aa-controls {
          display: flex; align-items: center;
          justify-content: center; gap: 12px;
        }

        .aa-ctrl-btn {
          width: 44px; height: 44px; border-radius: 50%;
          border: 1px solid #EAD8C4; background: #FFFFFF;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; color: #7A5C48;
          transition: all 200ms;
        }
        .aa-ctrl-btn:disabled { opacity: 0.3; cursor: default; }
        .aa-ctrl-btn:not(:disabled):hover { border-color: #B8601E; color: #B8601E; }

        .aa-ctrl-play {
          display: flex; align-items: center; gap: 6px;
          padding: 10px 20px; border-radius: 24px;
          border: none; background: #B8601E; color: white;
          font-family: var(--font-sans); font-size: 14px;
          font-weight: 600; cursor: pointer;
          min-height: 44px;
          transition: background 200ms;
        }
        .aa-ctrl-play:hover { background: #8A4010; }
      `}</style>
    </div>
  );
};

export default AulaAnimada;
