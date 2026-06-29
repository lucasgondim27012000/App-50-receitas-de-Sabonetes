import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react';

/* ═══════════════════════════════════════════
   KEYWORD-BASED ANIMATION DETECTION
   Maps step text to the best animation type
   ═══════════════════════════════════════════ */
function detectAnimation(text) {
  var t = (text || '').toLowerCase();
  if (t.indexOf('derreter') >= 0 || t.indexOf('derreta') >= 0 || t.indexOf('derret') >= 0) return 'melt';
  if (t.indexOf('cortar') >= 0 || t.indexOf('corte') >= 0 || t.indexOf('pique') >= 0 || t.indexOf('cubo') >= 0) return 'cut';
  if (t.indexOf('mistur') >= 0 || t.indexOf('mexa') >= 0 || t.indexOf('mexer') >= 0 || t.indexOf('mexendo') >= 0) return 'stir';
  if (t.indexOf('adicionar') >= 0 || t.indexOf('adicione') >= 0 || t.indexOf('gota') >= 0 || t.indexOf('pingo') >= 0 || t.indexOf('pingue') >= 0) return 'add';
  if (t.indexOf('despejar') >= 0 || t.indexOf('despeje') >= 0 || t.indexOf('coloqu') >= 0 || t.indexOf('coloque na forma') >= 0 || t.indexOf('verta') >= 0) return 'pour';
  if (t.indexOf('borrifar') >= 0 || t.indexOf('borrife') >= 0 || t.indexOf('lcool') >= 0 || t.indexOf('spray') >= 0) return 'spray';
  if (t.indexOf('desenformar') >= 0 || t.indexOf('desenforme') >= 0 || t.indexOf('retire da forma') >= 0 || t.indexOf('remov') >= 0) return 'unmold';
  if (t.indexOf('esperar') >= 0 || t.indexOf('espere') >= 0 || t.indexOf('descans') >= 0 || t.indexOf('endurec') >= 0 || t.indexOf('curar') >= 0 || t.indexOf('secar') >= 0) return 'wait';
  if (t.indexOf('embalar') >= 0 || t.indexOf('embale') >= 0 || t.indexOf('embalag') >= 0 || t.indexOf('envol') >= 0) return 'pack';
  if (t.indexOf('aque') >= 0 || t.indexOf('banho-maria') >= 0 || t.indexOf('banho maria') >= 0 || t.indexOf('fogo') >= 0 || t.indexOf('micro') >= 0) return 'heat';
  if (t.indexOf('forma') >= 0 || t.indexOf('molde') >= 0) return 'mold';
  if (t.indexOf('camada') >= 0 || t.indexOf('camad') >= 0) return 'layers';
  if (t.indexOf('decor') >= 0 || t.indexOf('enfeite') >= 0) return 'decorate';
  if (t.indexOf('resfri') >= 0 || t.indexOf('esfriar') >= 0 || t.indexOf('temperat') >= 0) return 'cool';
  if (t.indexOf('cor ') >= 0 || t.indexOf('corante') >= 0 || t.indexOf('tintura') >= 0 || t.indexOf('corant') >= 0) return 'color';
  if (t.indexOf('aroma') >= 0 || t.indexOf('essenc') >= 0 || t.indexOf('perfum') >= 0 || t.indexOf('fragr') >= 0) return 'aroma';
  if (t.indexOf('esfolian') >= 0 || t.indexOf('esfoliar') >= 0) return 'exfoliate';
  return 'generic';
}

/* Category-specific emojis and gradients */
var catThemes = {
  aromaticos: { emoji: '🌸', gradient: 'linear-gradient(135deg, #F9EEF5, #F0DDE8)', accent: '#C47F9B' },
  pele: { emoji: '💧', gradient: 'linear-gradient(135deg, #EAF2F8, #D6E8F2)', accent: '#5A8BB0' },
  especiais: { emoji: '⭐', gradient: 'linear-gradient(135deg, #FDF5E6, #F5E6C8)', accent: '#C89B3C' },
  decorativos: { emoji: '🎨', gradient: 'linear-gradient(135deg, #F3EAF8, #E8D8F0)', accent: '#9060BC' },
  ocasioes: { emoji: '🎁', gradient: 'linear-gradient(135deg, #EAF5EC, #D8EDD8)', accent: '#6B8F6D' },
  tematicos: { emoji: '🔥', gradient: 'linear-gradient(135deg, #E8F2F2, #D0E8E8)', accent: '#50888A' },
};

/* ═══════════════════════════════════════════
   RICH ANIMATION SCENES (parameterized)
   Each accepts { color, text } props
   ═══════════════════════════════════════════ */

function SceneTitleCard(p) {
  var theme = catThemes[p.recipe.category] || catThemes.aromaticos;
  return (
    <div className="scene-full" style={{ background: theme.gradient }}>
      <div className="st-badge" style={{ background: theme.accent + '22', color: theme.accent }}>{p.recipe.level}</div>
      <div className="st-emoji">{theme.emoji}</div>
      <h2 className="st-title" style={{ color: p.color }}>{p.recipe.title}</h2>
      <div className="st-meta">
        <span>⏱ {p.recipe.time}</span>
        <span>📦 {p.recipe.yield}</span>
        <span>💰 {p.recipe.profitEstimate}</span>
      </div>
      <style>{'\
        .st-badge { display:inline-block; padding:4px 14px; border-radius:20px; font-size:12px; font-weight:600; animation:fadeInUp 400ms ease; margin-bottom:12px; }\
        .st-emoji { font-size:56px; margin-bottom:10px; animation:popIn 500ms ease 200ms both; }\
        .st-title { font-family:var(--font-serif); font-size:22px; text-align:center; line-height:1.3; margin-bottom:12px; animation:fadeInUp 500ms ease 400ms both; }\
        .st-meta { display:flex; gap:14px; font-size:12px; color:#7A5C48; animation:fadeInUp 400ms ease 600ms both; flex-wrap:wrap; justify-content:center; }\
      '}</style>
    </div>
  );
}

function SceneIngredients(p) {
  var items = p.recipe.ingredients || [];
  return (
    <div className="scene-full si-scene" style={{ background: 'linear-gradient(135deg, #FBF3EA, #F5E6DA)' }}>
      <h3 className="si-heading">🧂 Ingredientes</h3>
      <div className="si-list">
        {items.slice(0, 7).map(function(ing, i) {
          var text = typeof ing === 'string' ? ing : ((ing.qty || '') + ' ' + (ing.name || ''));
          return (
            <div key={i} className="si-item" style={{ animationDelay: (200 + i * 200) + 'ms', borderLeftColor: p.color }}>
              <span className="si-check" style={{ color: p.color }}>●</span>
              <span>{text}</span>
            </div>
          );
        })}
        {items.length > 7 && <div className="si-more" style={{ animationDelay: '1800ms' }}>{'+ ' + (items.length - 7) + ' mais...'}</div>}
      </div>
      <style>{'\
        .si-heading { font-family:var(--font-serif); font-size:16px; color:#2D1A0A; margin-bottom:12px; animation:fadeInUp 400ms ease; }\
        .si-list { display:flex; flex-direction:column; gap:6px; width:100%; max-width:260px; }\
        .si-item { display:flex; align-items:center; gap:8px; font-size:13px; color:#2D1A0A; background:rgba(255,255,255,0.6); border-radius:8px; padding:6px 10px; border-left:3px solid; opacity:0; animation:slideInLeft 300ms ease forwards; }\
        .si-check { font-size:8px; flex-shrink:0; }\
        .si-more { font-size:12px; color:#7A5C48; font-style:italic; opacity:0; animation:fadeInUp 300ms ease forwards; }\
        @keyframes slideInLeft { from{opacity:0;transform:translateX(-15px)} to{opacity:1;transform:translateX(0)} }\
      '}</style>
    </div>
  );
}

function SceneMaterials(p) {
  var items = p.recipe.materials || [];
  var emojis = ['🥄', '🍳', '🧊', '🌡️', '🧪', '🔪', '📏', '🧤'];
  return (
    <div className="scene-full" style={{ background: 'linear-gradient(135deg, #FDF7F2, #F5E6DA)' }}>
      <h3 className="sm-heading">🔧 Materiais Necessários</h3>
      <div className="sm-grid">
        {items.slice(0, 6).map(function(m, i) {
          return (
            <div key={i} className="sm-card" style={{ animationDelay: (200 + i * 150) + 'ms' }}>
              <span className="sm-emoji">{emojis[i % emojis.length]}</span>
              <span className="sm-name">{m}</span>
            </div>
          );
        })}
      </div>
      <style>{'\
        .sm-heading { font-family:var(--font-serif); font-size:16px; color:#2D1A0A; margin-bottom:14px; animation:fadeInUp 400ms ease; }\
        .sm-grid { display:grid; grid-template-columns:1fr 1fr; gap:8px; width:100%; max-width:280px; }\
        .sm-card { display:flex; flex-direction:column; align-items:center; gap:4px; background:rgba(255,255,255,0.7); border-radius:10px; padding:10px 6px; text-align:center; opacity:0; animation:popIn 300ms ease forwards; }\
        .sm-emoji { font-size:22px; }\
        .sm-name { font-size:11px; color:#4A3A2D; line-height:1.3; }\
      '}</style>
    </div>
  );
}

/* STEP ANIMATION SCENES — keyword-driven, color-parameterized */

function AnimMelt(p) {
  return (
    <div className="anim-wrap">
      <div className="am-container">
        <div className="am-block" style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.85), ' + p.color + '30)' }}>
          <div className="am-drip" style={{ background: p.color + '40' }}></div>
        </div>
        <div className="am-puddle" style={{ background: p.color + '25' }}></div>
        <div className="am-heat am-h1" style={{ background: p.color + '40' }}></div>
        <div className="am-heat am-h2" style={{ background: p.color + '40' }}></div>
        <div className="am-heat am-h3" style={{ background: p.color + '40' }}></div>
      </div>
      <style>{'\
        .am-container { position:relative; width:100px; height:90px; }\
        .am-block { width:60px; height:45px; border-radius:6px; position:absolute; top:0; left:20px; border:1px solid rgba(200,180,160,0.3); animation:meltDown 2.5s ease forwards; }\
        @keyframes meltDown { 0%{border-radius:6px;height:45px} 50%{border-radius:6px 6px 20px 20px;height:35px;top:10px} 100%{border-radius:6px 6px 30px 30px;height:25px;top:20px} }\
        .am-drip { position:absolute; bottom:-5px; left:50%; width:8px; height:0; border-radius:0 0 4px 4px; transform:translateX(-50%); animation:dripDown 2s ease 1s forwards; }\
        @keyframes dripDown { to{height:20px} }\
        .am-puddle { position:absolute; bottom:0; left:10px; right:10px; height:0; border-radius:50%; animation:puddleGrow 1.5s ease 1.5s forwards; }\
        @keyframes puddleGrow { to{height:12px} }\
        .am-heat { position:absolute; bottom:-8px; width:6px; height:6px; border-radius:50%; animation:rise 1.2s ease infinite; }\
        .am-h1 { left:25px; animation-delay:0s; }\
        .am-h2 { left:45px; animation-delay:0.4s; }\
        .am-h3 { left:65px; animation-delay:0.8s; }\
        @keyframes rise { 0%{transform:translateY(0) scale(1);opacity:.6} 100%{transform:translateY(-25px) scale(.3);opacity:0} }\
      '}</style>
    </div>
  );
}

function AnimCut(p) {
  return (
    <div className="anim-wrap">
      <div className="ac-block" style={{ background: 'linear-gradient(135deg, ' + p.color + '20, ' + p.color + '40)' }}>
        <div className="ac-blade ac-bh"></div>
        <div className="ac-blade ac-bv"></div>
      </div>
      <div className="ac-cubes">
        <div className="ac-cube ac-c1" style={{ background: p.color + '30' }}></div>
        <div className="ac-cube ac-c2" style={{ background: p.color + '25' }}></div>
        <div className="ac-cube ac-c3" style={{ background: p.color + '35' }}></div>
        <div className="ac-cube ac-c4" style={{ background: p.color + '20' }}></div>
      </div>
      <style>{'\
        .ac-block { width:80px; height:55px; border-radius:6px; border:1px solid ' + p.color + '40; position:relative; animation:fadeInUp 400ms ease; }\
        .ac-blade { position:absolute; background:#B8601E; }\
        .ac-bh { width:0; height:1.5px; top:50%; left:0; animation:cutH 600ms ease 500ms forwards; }\
        .ac-bv { width:1.5px; height:0; top:0; left:50%; animation:cutV 600ms ease 900ms forwards; }\
        @keyframes cutH { to{width:100%} }\
        @keyframes cutV { to{height:100%} }\
        .ac-cubes { display:flex; gap:5px; margin-top:12px; }\
        .ac-cube { width:18px; height:18px; border-radius:3px; border:0.5px solid ' + p.color + '50; opacity:0; animation:popIn 250ms ease forwards; }\
        .ac-c1{animation-delay:1.3s} .ac-c2{animation-delay:1.5s} .ac-c3{animation-delay:1.7s} .ac-c4{animation-delay:1.9s}\
      '}</style>
    </div>
  );
}

function AnimStir(p) {
  return (
    <div className="anim-wrap">
      <div className="as-bowl">
        <div className="as-liquid" style={{ background: p.color + '30' }}>
          <div className="as-swirl" style={{ borderColor: p.color + '50' }}></div>
        </div>
        <div className="as-spoon"></div>
      </div>
      <style>{'\
        .as-bowl { width:90px; height:55px; border-radius:0 0 45px 45px; border:2px solid #A88070; border-top:none; position:relative; overflow:hidden; animation:fadeInUp 400ms ease; }\
        .as-liquid { position:absolute; bottom:0; left:0; right:0; height:80%; border-radius:0 0 43px 43px; }\
        .as-swirl { width:30px; height:30px; border-radius:50%; border:2px dashed; position:absolute; top:50%; left:50%; transform:translate(-50%,-50%); animation:spin 3s linear infinite; }\
        @keyframes spin { to{transform:translate(-50%,-50%) rotate(360deg)} }\
        .as-spoon { position:absolute; top:-12px; right:18px; width:3px; height:48px; background:#A88070; border-radius:2px; transform-origin:bottom center; animation:stirMove 2.5s ease infinite; }\
        @keyframes stirMove { 0%,100%{transform:rotate(-12deg)} 50%{transform:rotate(12deg)} }\
      '}</style>
    </div>
  );
}

function AnimAdd(p) {
  return (
    <div className="anim-wrap">
      <div className="aa-scene">
        <div className="aa-dropper">
          <div className="aa-tube" style={{ background: p.color }}></div>
          <div className="aa-bulb" style={{ background: p.color + '80' }}></div>
        </div>
        <div className="aa-drops">
          <div className="aa-drop" style={{ background: p.color }}></div>
          <div className="aa-drop aa-dd2" style={{ background: p.color }}></div>
          <div className="aa-drop aa-dd3" style={{ background: p.color }}></div>
        </div>
        <div className="aa-bowl">
          <div className="aa-fill" style={{ background: p.color + '20' }}></div>
          <div className="aa-ripple" style={{ borderColor: p.color + '40' }}></div>
        </div>
      </div>
      <style>{'\
        .aa-scene { position:relative; width:100px; height:110px; display:flex; flex-direction:column; align-items:center; }\
        .aa-dropper { position:absolute; top:0; display:flex; flex-direction:column; align-items:center; animation:fadeInUp 300ms ease; }\
        .aa-tube { width:4px; height:20px; border-radius:0 0 2px 2px; }\
        .aa-bulb { width:16px; height:10px; border-radius:8px 8px 0 0; margin-bottom:-1px; }\
        .aa-drops { position:absolute; top:32px; }\
        .aa-drop { width:5px; height:8px; border-radius:50% 50% 50% 50%/30% 30% 70% 70%; position:absolute; animation:dropFall 1.4s ease infinite; }\
        .aa-dd2 { animation-delay:.5s; left:3px; }\
        .aa-dd3 { animation-delay:1s; left:-2px; }\
        @keyframes dropFall { 0%{transform:translateY(0);opacity:0} 20%{opacity:1} 100%{transform:translateY(45px);opacity:0} }\
        .aa-bowl { position:absolute; bottom:0; width:80px; height:40px; border-radius:0 0 40px 40px; border:2px solid #A88070; border-top:none; overflow:hidden; }\
        .aa-fill { position:absolute; bottom:0; left:0; right:0; height:0; border-radius:0 0 38px 38px; animation:fillUp 3s ease forwards; }\
        @keyframes fillUp { to{height:70%} }\
        .aa-ripple { position:absolute; bottom:25%; left:50%; width:20px; height:10px; border-radius:50%; border:1px solid; transform:translateX(-50%); animation:wave 2s ease infinite; }\
        @keyframes wave { 0%{transform:translateX(-50%) scale(.5);opacity:.8} 100%{transform:translateX(-50%) scale(2);opacity:0} }\
      '}</style>
    </div>
  );
}

function AnimPour(p) {
  return (
    <div className="anim-wrap">
      <div className="ap-scene">
        <div className="ap-pitcher">
          <div className="ap-stream" style={{ background: p.color + '40' }}></div>
        </div>
        <div className="ap-mold">
          <div className="ap-filling" style={{ background: p.color + '30' }}></div>
        </div>
      </div>
      <style>{'\
        .ap-scene { position:relative; width:130px; height:90px; }\
        .ap-pitcher { position:absolute; top:0; left:10px; width:35px; height:30px; border:2px solid #A88070; border-radius:0 0 6px 6px; border-top:none; transform:rotate(-25deg); animation:fadeInUp 400ms ease; }\
        .ap-stream { position:absolute; bottom:-30px; right:-2px; width:6px; height:0; border-radius:3px; animation:streamDown 1s ease 500ms forwards; }\
        @keyframes streamDown { to{height:35px} }\
        .ap-mold { position:absolute; bottom:0; right:10px; width:65px; height:35px; border:2px solid #A88070; border-radius:4px; animation:fadeInUp 400ms ease 200ms both; }\
        .ap-filling { position:absolute; bottom:0; left:0; right:0; height:0; border-radius:0 0 2px 2px; animation:fillMold 2s ease 1s forwards; }\
        @keyframes fillMold { to{height:80%} }\
      '}</style>
    </div>
  );
}

function AnimSpray(p) {
  return (
    <div className="anim-wrap">
      <div className="asp-scene">
        <div className="asp-bottle">
          <div className="asp-body"></div>
          <div className="asp-nozzle"></div>
        </div>
        <div className="asp-mist">
          <div className="asp-p asp-p1"></div>
          <div className="asp-p asp-p2"></div>
          <div className="asp-p asp-p3"></div>
          <div className="asp-p asp-p4"></div>
          <div className="asp-p asp-p5"></div>
        </div>
        <div className="asp-surface" style={{ background: p.color + '25' }}>
          <div className="asp-shine"></div>
        </div>
      </div>
      <style>{'\
        .asp-scene { position:relative; width:130px; height:100px; }\
        .asp-bottle { position:absolute; top:0; right:15px; animation:fadeInUp 400ms ease; display:flex; flex-direction:column; align-items:center; }\
        .asp-body { width:22px; height:35px; background:linear-gradient(#ADD8E6,#87CEEB); border:1px solid #5A8BB0; border-radius:0 0 4px 4px; }\
        .asp-nozzle { width:12px; height:8px; background:#888; border-radius:2px 2px 0 0; margin-bottom:-1px; }\
        .asp-mist { position:absolute; top:8px; right:45px; }\
        .asp-p { width:3px; height:3px; border-radius:50%; background:rgba(90,139,176,.4); position:absolute; animation:sprayMist 1s ease infinite; }\
        .asp-p1{left:0;top:0;animation-delay:0s} .asp-p2{left:6px;top:4px;animation-delay:.15s} .asp-p3{left:3px;top:8px;animation-delay:.3s} .asp-p4{left:9px;top:2px;animation-delay:.45s} .asp-p5{left:5px;top:12px;animation-delay:.6s}\
        @keyframes sprayMist { 0%{transform:translate(0,0);opacity:1} 100%{transform:translate(-20px,15px);opacity:0} }\
        .asp-surface { position:absolute; bottom:0; left:5px; right:5px; height:20px; border-radius:6px; }\
        .asp-shine { position:absolute; top:3px; left:15%; width:40%; height:3px; background:rgba(255,255,255,.7); border-radius:2px; animation:shimmer 2s ease infinite; }\
        @keyframes shimmer { 0%,100%{opacity:.3} 50%{opacity:1} }\
      '}</style>
    </div>
  );
}

function AnimHeat(p) {
  return (
    <div className="anim-wrap">
      <div className="ah-scene">
        <div className="ah-pot">
          <div className="ah-water" style={{ background: p.color + '20' }}></div>
          <div className="ah-inner">
            <div className="ah-content" style={{ background: p.color + '25' }}></div>
          </div>
        </div>
        <div className="ah-flames">
          <div className="ah-flame ah-f1">🔥</div>
          <div className="ah-flame ah-f2">🔥</div>
        </div>
        <div className="ah-steam ah-s1"></div>
        <div className="ah-steam ah-s2"></div>
      </div>
      <style>{'\
        .ah-scene { position:relative; width:110px; height:100px; }\
        .ah-pot { position:absolute; top:10px; left:10px; right:10px; height:55px; border:2px solid #A88070; border-radius:0 0 10px 10px; border-top:none; overflow:hidden; animation:fadeInUp 400ms ease; }\
        .ah-water { position:absolute; bottom:0; left:0; right:0; height:35%; border-radius:0 0 8px 8px; }\
        .ah-inner { position:absolute; top:5px; left:12px; right:12px; bottom:8px; border:1.5px solid #A88070; border-radius:0 0 5px 5px; border-top:none; overflow:hidden; }\
        .ah-content { position:absolute; bottom:0; left:0; right:0; height:0; animation:fillUp 2s ease 800ms forwards; }\
        .ah-flames { position:absolute; bottom:0; left:0; right:0; display:flex; justify-content:center; gap:6px; }\
        .ah-flame { font-size:14px; animation:flicker .8s ease infinite alternate; }\
        .ah-f2 { animation-delay:.4s; }\
        @keyframes flicker { 0%{transform:scale(1);opacity:.8} 100%{transform:scale(1.1);opacity:1} }\
        .ah-steam { position:absolute; top:0; width:4px; height:4px; border-radius:50%; background:rgba(200,200,200,.4); animation:steamUp 1.5s ease infinite; }\
        .ah-s1 { left:35px; animation-delay:0s; }\
        .ah-s2 { left:60px; animation-delay:.7s; }\
        @keyframes steamUp { 0%{transform:translateY(0);opacity:.6} 100%{transform:translateY(-20px);opacity:0} }\
      '}</style>
    </div>
  );
}

function AnimWait(p) {
  return (
    <div className="anim-wrap">
      <div className="aw-scene">
        <div className="aw-clock">⏳</div>
        <div className="aw-progress">
          <div className="aw-bar" style={{ background: p.color }}></div>
        </div>
        <div className="aw-label">Aguardando...</div>
      </div>
      <style>{'\
        .aw-scene { display:flex; flex-direction:column; align-items:center; gap:12px; }\
        .aw-clock { font-size:44px; animation:flipHourglass 3s ease infinite; }\
        @keyframes flipHourglass { 0%,45%{transform:rotate(0)} 50%,95%{transform:rotate(180deg)} 100%{transform:rotate(360deg)} }\
        .aw-progress { width:120px; height:6px; background:#EAD8C4; border-radius:3px; overflow:hidden; }\
        .aw-bar { height:100%; width:0; border-radius:3px; animation:fillBar 3s ease forwards; }\
        @keyframes fillBar { to{width:100%} }\
        .aw-label { font-size:13px; color:#7A5C48; animation:fadeInUp 400ms ease 500ms both; }\
      '}</style>
    </div>
  );
}

function AnimUnmold(p) {
  return (
    <div className="anim-wrap">
      <div className="au-scene">
        <div className="au-mold">
          <div className="au-inside" style={{ background: p.color + '35' }}></div>
        </div>
        <div className="au-arrow">→</div>
        <div className="au-soap" style={{ background: 'linear-gradient(135deg, ' + p.color + '30, ' + p.color + '50)' }}>
          <div className="au-glow"></div>
        </div>
      </div>
      <style>{'\
        .au-scene { display:flex; align-items:center; gap:14px; }\
        .au-mold { width:50px; height:40px; border:2px dashed #A88070; border-radius:5px; position:relative; overflow:hidden; animation:fadeInUp 400ms ease; }\
        .au-inside { position:absolute; inset:3px; border-radius:3px; animation:fadeOut 1s ease 1.5s forwards; }\
        @keyframes fadeOut { to{opacity:0} }\
        .au-arrow { font-size:20px; color:#B8601E; animation:pulseRight 1.5s ease infinite; }\
        @keyframes pulseRight { 0%,100%{transform:translateX(0)} 50%{transform:translateX(5px)} }\
        .au-soap { width:50px; height:38px; border-radius:8px; position:relative; overflow:hidden; box-shadow:0 4px 16px rgba(0,0,0,.1); opacity:0; animation:slideInRight 600ms ease 1.5s forwards; }\
        @keyframes slideInRight { from{opacity:0;transform:translateX(-10px)} to{opacity:1;transform:translateX(0)} }\
        .au-glow { position:absolute; inset:-50%; background:linear-gradient(45deg,transparent 40%,rgba(255,255,255,.4) 50%,transparent 60%); animation:shineMove 2s ease infinite; }\
        @keyframes shineMove { from{transform:translateX(-100%)} to{transform:translateX(100%)} }\
      '}</style>
    </div>
  );
}

function AnimPack(p) {
  return (
    <div className="anim-wrap">
      <div className="apk-scene">
        <div className="apk-soap" style={{ background: p.color + '35' }}></div>
        <div className="apk-wrap">
          <div className="apk-paper"></div>
          <div className="apk-ribbon" style={{ background: p.color }}></div>
          <div className="apk-bow">🎀</div>
        </div>
      </div>
      <style>{'\
        .apk-scene { position:relative; width:80px; height:70px; }\
        .apk-soap { position:absolute; bottom:5px; left:5px; width:50px; height:35px; border-radius:6px; animation:fadeInUp 400ms ease; }\
        .apk-wrap { position:absolute; bottom:5px; left:5px; width:50px; height:35px; opacity:0; animation:wrapIn 500ms ease 1.2s forwards; }\
        @keyframes wrapIn { to{opacity:1} }\
        .apk-paper { position:absolute; inset:0; background:#C4A070; border-radius:6px; }\
        .apk-ribbon { position:absolute; top:50%; left:0; right:0; height:3px; transform:translateY(-50%); }\
        .apk-bow { position:absolute; top:-10px; left:50%; transform:translateX(-50%); font-size:16px; opacity:0; animation:popIn 300ms ease 1.8s forwards; }\
      '}</style>
    </div>
  );
}

function AnimMold(p) {
  return (
    <div className="anim-wrap">
      <div className="amo-scene">
        <div className="amo-mold">
          <div className="amo-cavity amo-c1" style={{ background: p.color + '20' }}></div>
          <div className="amo-cavity amo-c2" style={{ background: p.color + '25' }}></div>
          <div className="amo-cavity amo-c3" style={{ background: p.color + '30' }}></div>
        </div>
      </div>
      <style>{'\
        .amo-scene { animation:fadeInUp 400ms ease; }\
        .amo-mold { display:flex; gap:6px; background:rgba(180,160,140,.15); padding:8px; border-radius:8px; }\
        .amo-cavity { width:35px; height:30px; border-radius:6px; border:1.5px dashed #A88070; animation:fillCavity 1.5s ease forwards; }\
        .amo-c1{animation-delay:.5s} .amo-c2{animation-delay:1s} .amo-c3{animation-delay:1.5s}\
        @keyframes fillCavity { 0%{background:transparent} 100%{border-style:solid} }\
      '}</style>
    </div>
  );
}

function AnimLayers(p) {
  return (
    <div className="anim-wrap">
      <div className="al-mold">
        <div className="al-layer al-l1" style={{ background: p.color + '20' }}></div>
        <div className="al-layer al-l2" style={{ background: p.color + '40' }}></div>
        <div className="al-layer al-l3" style={{ background: p.color + '60' }}></div>
      </div>
      <style>{'\
        .al-mold { width:70px; height:60px; border:2px solid #A88070; border-radius:4px; overflow:hidden; position:relative; display:flex; flex-direction:column-reverse; animation:fadeInUp 400ms ease; }\
        .al-layer { width:100%; height:0; animation:layerFill .8s ease forwards; }\
        .al-l1{animation-delay:.3s} .al-l2{animation-delay:1.2s} .al-l3{animation-delay:2.1s}\
        @keyframes layerFill { to{height:33%} }\
      '}</style>
    </div>
  );
}

function AnimColor(p) {
  return (
    <div className="anim-wrap">
      <div className="acl-scene">
        <div className="acl-drop" style={{ background: p.color }}></div>
        <div className="acl-bowl">
          <div className="acl-liquid"></div>
          <div className="acl-spread" style={{ background: p.color }}></div>
        </div>
      </div>
      <style>{'\
        .acl-scene { position:relative; width:100px; height:90px; display:flex; flex-direction:column; align-items:center; }\
        .acl-drop { width:8px; height:12px; border-radius:50% 50% 50% 50%/30% 30% 70% 70%; animation:dropFall 1.5s ease infinite; position:absolute; top:0; }\
        .acl-bowl { position:absolute; bottom:0; width:80px; height:40px; border-radius:0 0 40px 40px; border:2px solid #A88070; border-top:none; overflow:hidden; }\
        .acl-liquid { position:absolute; bottom:0; left:0; right:0; height:70%; background:rgba(253,247,242,.8); }\
        .acl-spread { position:absolute; bottom:30%; left:50%; width:6px; height:6px; border-radius:50%; transform:translateX(-50%); animation:colorSpread 3s ease forwards; }\
        @keyframes colorSpread { 0%{width:6px;height:6px;opacity:1} 100%{width:70px;height:30px;opacity:.4} }\
      '}</style>
    </div>
  );
}

function AnimAroma(p) {
  return (
    <div className="anim-wrap">
      <div className="aar-scene">
        <div className="aar-bottle" style={{ background: 'linear-gradient(to bottom, ' + p.color + '80, ' + p.color + ')' }}></div>
        <div className="aar-waves">
          <div className="aar-w aar-w1" style={{ borderColor: p.color + '40' }}></div>
          <div className="aar-w aar-w2" style={{ borderColor: p.color + '30' }}></div>
          <div className="aar-w aar-w3" style={{ borderColor: p.color + '20' }}></div>
        </div>
      </div>
      <style>{'\
        .aar-scene { position:relative; width:80px; height:80px; display:flex; align-items:center; justify-content:center; }\
        .aar-bottle { width:24px; height:40px; border-radius:4px 4px 6px 6px; position:relative; z-index:2; animation:fadeInUp 400ms ease; box-shadow:0 2px 8px rgba(0,0,0,.1); }\
        .aar-waves { position:absolute; inset:0; display:flex; align-items:center; justify-content:center; }\
        .aar-w { position:absolute; border-radius:50%; border:1.5px solid; animation:aromaWave 2.5s ease infinite; }\
        .aar-w1 { width:40px; height:40px; animation-delay:0s; }\
        .aar-w2 { width:55px; height:55px; animation-delay:.8s; }\
        .aar-w3 { width:70px; height:70px; animation-delay:1.6s; }\
        @keyframes aromaWave { 0%{transform:scale(.6);opacity:.8} 100%{transform:scale(1.2);opacity:0} }\
      '}</style>
    </div>
  );
}

function AnimCool(p) {
  return (
    <div className="anim-wrap">
      <div className="aco-scene">
        <div className="aco-therm">
          <div className="aco-tube"><div className="aco-mercury" style={{ background: p.color }}></div></div>
          <div className="aco-bulb" style={{ background: p.color }}></div>
        </div>
        <div className="aco-snow aco-sn1">❄️</div>
        <div className="aco-snow aco-sn2">❄️</div>
      </div>
      <style>{'\
        .aco-scene { position:relative; width:80px; height:90px; display:flex; align-items:center; justify-content:center; }\
        .aco-therm { display:flex; flex-direction:column; align-items:center; animation:fadeInUp 400ms ease; }\
        .aco-tube { width:12px; height:60px; border-radius:6px 6px 0 0; border:2px solid #A88070; position:relative; overflow:hidden; background:rgba(255,255,255,.5); }\
        .aco-mercury { position:absolute; bottom:0; left:0; right:0; height:70%; border-radius:4px 4px 0 0; animation:coolDown 2.5s ease forwards; }\
        @keyframes coolDown { to{height:30%} }\
        .aco-bulb { width:20px; height:20px; border-radius:50%; border:2px solid #A88070; margin-top:-2px; }\
        .aco-snow { position:absolute; font-size:12px; animation:floatSnow 2s ease infinite; }\
        .aco-sn1 { top:5px; right:5px; animation-delay:0s; }\
        .aco-sn2 { top:15px; right:15px; animation-delay:1s; }\
        @keyframes floatSnow { 0%{opacity:0;transform:translateY(5px)} 50%{opacity:1} 100%{opacity:0;transform:translateY(-10px)} }\
      '}</style>
    </div>
  );
}

function AnimDecorate(p) {
  return (
    <div className="anim-wrap">
      <div className="ad-scene">
        <div className="ad-soap" style={{ background: p.color + '30' }}>
          <div className="ad-deco ad-d1" style={{ background: p.color }}>✿</div>
          <div className="ad-deco ad-d2" style={{ color: p.color }}>★</div>
          <div className="ad-deco ad-d3" style={{ color: p.color }}>♥</div>
        </div>
      </div>
      <style>{'\
        .ad-scene { animation:fadeInUp 400ms ease; }\
        .ad-soap { width:70px; height:50px; border-radius:8px; position:relative; border:1px solid ' + p.color + '40; }\
        .ad-deco { position:absolute; font-size:14px; opacity:0; animation:popIn 300ms ease forwards; }\
        .ad-d1 { top:5px; left:8px; background:transparent; animation-delay:.5s; }\
        .ad-d2 { top:25px; right:10px; animation-delay:1s; }\
        .ad-d3 { bottom:5px; left:25px; animation-delay:1.5s; }\
      '}</style>
    </div>
  );
}

function AnimExfoliate(p) {
  return (
    <div className="anim-wrap">
      <div className="ae-scene">
        <div className="ae-soap" style={{ background: p.color + '30' }}>
          <div className="ae-grain ae-g1" style={{ background: p.color }}></div>
          <div className="ae-grain ae-g2" style={{ background: p.color }}></div>
          <div className="ae-grain ae-g3" style={{ background: p.color }}></div>
          <div className="ae-grain ae-g4" style={{ background: p.color }}></div>
          <div className="ae-grain ae-g5" style={{ background: p.color }}></div>
        </div>
      </div>
      <style>{'\
        .ae-scene { animation:fadeInUp 400ms ease; }\
        .ae-soap { width:70px; height:50px; border-radius:8px; position:relative; border:1px solid ' + p.color + '40; overflow:hidden; }\
        .ae-grain { position:absolute; width:4px; height:4px; border-radius:50%; opacity:.6; animation:grainFloat 2s ease infinite; }\
        .ae-g1{top:10px;left:15px;animation-delay:0s} .ae-g2{top:25px;left:35px;animation-delay:.4s} .ae-g3{top:15px;left:50px;animation-delay:.8s} .ae-g4{top:35px;left:20px;animation-delay:1.2s} .ae-g5{top:8px;left:40px;animation-delay:1.6s}\
        @keyframes grainFloat { 0%,100%{transform:translate(0,0)} 50%{transform:translate(3px,-3px)} }\
      '}</style>
    </div>
  );
}

function AnimGeneric(p) {
  return (
    <div className="anim-wrap">
      <div className="ag-hand">👆</div>
      <div className="ag-bar"><div className="ag-fill" style={{ background: p.color }}></div></div>
      <style>{'\
        .ag-hand { font-size:32px; animation:fadeInUp 400ms ease; margin-bottom:10px; }\
        .ag-bar { width:100px; height:5px; background:#EAD8C4; border-radius:3px; overflow:hidden; }\
        .ag-fill { height:100%; width:0; border-radius:3px; animation:fillBar 2.5s ease forwards; }\
      '}</style>
    </div>
  );
}

function SceneTips(p) {
  var tips = p.recipe.tips || [];
  return (
    <div className="scene-full" style={{ background: 'linear-gradient(135deg, #FDF7F2, #F5E6DA)' }}>
      <h3 className="stp-heading">💡 Dicas</h3>
      <div className="stp-list">
        {tips.slice(0, 4).map(function(tip, i) {
          return (
            <div key={i} className="stp-item" style={{ animationDelay: (300 + i * 250) + 'ms' }}>
              <span className="stp-bulb">💡</span>
              <span>{typeof tip === 'string' ? tip : ''}</span>
            </div>
          );
        })}
      </div>
      <style>{'\
        .stp-heading { font-family:var(--font-serif); font-size:16px; color:#2D1A0A; margin-bottom:12px; animation:fadeInUp 400ms ease; }\
        .stp-list { display:flex; flex-direction:column; gap:8px; width:100%; max-width:280px; }\
        .stp-item { display:flex; gap:8px; align-items:flex-start; font-size:12px; color:#4A3A2D; line-height:1.4; background:rgba(255,255,255,.6); border-radius:8px; padding:8px 10px; opacity:0; animation:slideInLeft 300ms ease forwards; }\
        .stp-bulb { flex-shrink:0; }\
        @keyframes slideInLeft { from{opacity:0;transform:translateX(-15px)} to{opacity:1;transform:translateX(0)} }\
      '}</style>
    </div>
  );
}

function SceneProfit(p) {
  return (
    <div className="scene-full" style={{ background: 'linear-gradient(135deg, #EAF5EC, #D8EDD8)' }}>
      <h3 className="spf-heading">💰 Resumo Financeiro</h3>
      <div className="spf-grid">
        <div className="spf-card">
          <span className="spf-label">Custo</span>
          <span className="spf-val">{p.recipe.cost || '—'}</span>
        </div>
        <div className="spf-card">
          <span className="spf-label">Venda</span>
          <span className="spf-val spf-gold">{p.recipe.salePrice || '—'}</span>
        </div>
      </div>
      <div className="spf-profit" style={{ color: '#27500A' }}>
        {'✅ Lucro: ' + (p.recipe.profitEstimate || '—')}
      </div>
      <style>{'\
        .spf-heading { font-family:var(--font-serif); font-size:16px; color:#27500A; margin-bottom:14px; animation:fadeInUp 400ms ease; }\
        .spf-grid { display:grid; grid-template-columns:1fr 1fr; gap:10px; margin-bottom:12px; width:100%; max-width:240px; }\
        .spf-card { background:rgba(255,255,255,.6); border-radius:10px; padding:10px; text-align:center; animation:popIn 400ms ease 300ms both; }\
        .spf-label { display:block; font-size:11px; color:#7A5C48; margin-bottom:4px; }\
        .spf-val { font-size:16px; font-weight:700; color:#2D1A0A; }\
        .spf-gold { color:#C89B3C; }\
        .spf-profit { font-size:16px; font-weight:700; animation:fadeInUp 400ms ease 600ms both; }\
      '}</style>
    </div>
  );
}

function SceneFinal(p) {
  return (
    <div className="scene-full" style={{ background: 'linear-gradient(135deg, #FBF3EA, #F5E6DA)' }}>
      <div className="sf-emoji">🧼</div>
      <h3 className="sf-title">Receita completa!</h3>
      <p className="sf-sub">Agora é só fazer e vender 💰</p>
      <style>{'\
        .sf-emoji { font-size:56px; animation:popIn 500ms ease; }\
        .sf-title { font-family:var(--font-serif); font-size:20px; color:#2D1A0A; margin-top:10px; animation:fadeInUp 400ms ease 300ms both; }\
        .sf-sub { font-size:14px; color:#7A5C48; margin-top:6px; animation:fadeInUp 400ms ease 600ms both; }\
      '}</style>
    </div>
  );
}

/* Animation type to component mapping */
var animComponents = {
  melt: AnimMelt, cut: AnimCut, stir: AnimStir, add: AnimAdd,
  pour: AnimPour, spray: AnimSpray, heat: AnimHeat, wait: AnimWait,
  unmold: AnimUnmold, pack: AnimPack, mold: AnimMold, layers: AnimLayers,
  color: AnimColor, aroma: AnimAroma, cool: AnimCool, decorate: AnimDecorate,
  exfoliate: AnimExfoliate, generic: AnimGeneric,
};

/* ═══════════════════════════════════════════
   SLIDE GENERATOR — builds slides from recipe
   ═══════════════════════════════════════════ */
function generateSlides(recipe) {
  var slides = [];
  var color = recipe.color || '#B8601E';

  // 1. Title
  slides.push({ type: 'title', render: function() { return React.createElement(SceneTitleCard, { recipe: recipe, color: color }); } });

  // 2. Ingredients
  if (recipe.ingredients && recipe.ingredients.length > 0) {
    slides.push({ type: 'ingredients', render: function() { return React.createElement(SceneIngredients, { recipe: recipe, color: color }); } });
  }

  // 3. Materials
  if (recipe.materials && recipe.materials.length > 0) {
    slides.push({ type: 'materials', render: function() { return React.createElement(SceneMaterials, { recipe: recipe, color: color }); } });
  }

  // 4. Steps
  var steps = recipe.steps || [];
  steps.forEach(function(step, i) {
    var title = typeof step === 'string' ? '' : (step.title || '');
    var desc = typeof step === 'string' ? step : (step.desc || step.description || '');
    var fullText = title + ' ' + desc;
    var animType = detectAnimation(fullText);
    var AnimComp = animComponents[animType] || AnimGeneric;

    slides.push({
      type: 'step',
      stepNum: i + 1,
      totalSteps: steps.length,
      title: title,
      desc: desc,
      render: function() { return React.createElement(AnimComp, { color: color, text: fullText }); }
    });
  });

  // 5. Tips
  if (recipe.tips && recipe.tips.length > 0) {
    slides.push({ type: 'tips', render: function() { return React.createElement(SceneTips, { recipe: recipe, color: color }); } });
  }

  // 6. Profit
  slides.push({ type: 'profit', render: function() { return React.createElement(SceneProfit, { recipe: recipe, color: color }); } });

  // 7. Final
  slides.push({ type: 'final', render: function() { return React.createElement(SceneFinal, { recipe: recipe, color: color }); } });

  return slides;
}

/* ═══════════════════════════════════════════
   MAIN PLAYER COMPONENT
   ═══════════════════════════════════════════ */
var RecipePresentation = function(props) {
  var recipe = props.recipe;
  var onComplete = props.onComplete;
  var slides = generateSlides(recipe);
  var [current, setCurrent] = useState(0);
  var [playing, setPlaying] = useState(true);
  var color = recipe.color || '#B8601E';

  useEffect(function() {
    setCurrent(0);
    setPlaying(true);
  }, [recipe.id]);

  useEffect(function() {
    if (!playing) return;
    var timer = setTimeout(function() {
      if (current < slides.length - 1) {
        setCurrent(function(c) { return c + 1; });
      } else {
        setPlaying(false);
        if (onComplete) onComplete();
      }
    }, 4000);
    return function() { clearTimeout(timer); };
  }, [current, playing, slides.length]);

  var goBack = function() { if (current > 0) setCurrent(current - 1); };
  var goNext = function() {
    if (current < slides.length - 1) setCurrent(current + 1);
    else { setPlaying(false); if (onComplete) onComplete(); }
  };
  var togglePlay = function() {
    if (!playing && current >= slides.length - 1) { setCurrent(0); setPlaying(true); }
    else setPlaying(!playing);
  };

  var slide = slides[current];
  var isLast = current >= slides.length - 1;

  // Build bottom text based on slide type
  var bottomText = '';
  if (slide.type === 'step') {
    bottomText = (slide.title ? slide.title + ': ' : '') + slide.desc;
  }

  return (
    <div className="rp-player">
      {/* Stage */}
      <div className="rp-stage" key={current + '-' + recipe.id}>
        {slide.type === 'step' && (
          <div className="rp-step-badge" style={{ background: color + '20', color: color }}>
            {'Passo ' + slide.stepNum + ' de ' + slide.totalSteps}
          </div>
        )}
        <div className="rp-scene-center">
          {slide.render()}
        </div>
      </div>

      {/* Progress dots */}
      <div className="rp-dots">
        {slides.map(function(_, i) {
          var dotClass = 'rp-dot';
          if (i === current) dotClass += ' active';
          else if (i < current) dotClass += ' done';
          return React.createElement('button', {
            key: i, className: dotClass,
            style: i === current ? { background: color, borderColor: color } : (i < current ? { background: '#6B8F6D', borderColor: '#6B8F6D' } : {}),
            onClick: function() { setCurrent(i); }
          });
        })}
      </div>
      <div className="rp-step-label">
        {'Etapa ' + (current + 1) + ' de ' + slides.length}
      </div>

      {/* Text */}
      {bottomText && (
        <div className="rp-text" key={'t' + current}>{bottomText}</div>
      )}

      {/* Controls */}
      <div className="rp-controls">
        <button className="rp-ctrl-btn" onClick={goBack} disabled={current === 0}>
          <ChevronLeft size={20} />
        </button>
        <button className="rp-ctrl-play" style={{ background: color }} onClick={togglePlay}>
          {playing ? React.createElement(Pause, { size: 18 }) : React.createElement(Play, { size: 18 })}
          <span>{playing ? 'Pausar' : (isLast ? 'Replay' : 'Continuar')}</span>
        </button>
        <button className="rp-ctrl-btn" onClick={goNext} disabled={isLast && !playing}>
          <ChevronRight size={20} />
        </button>
      </div>

      <style>{'\
        @media(prefers-reduced-motion:reduce) { .rp-stage *{animation:none!important;transition:none!important} }\
        @keyframes fadeInUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }\
        @keyframes popIn { from{opacity:0;transform:scale(.3)} to{opacity:1;transform:scale(1)} }\
        .rp-player { width:100%; }\
        .rp-stage { width:100%; aspect-ratio:4/3; border-radius:16px; overflow:hidden; display:flex; align-items:center; justify-content:center; position:relative; background:linear-gradient(135deg,#FBF3EA,#F5E6DA); animation:fadeIn 300ms ease; }\
        @keyframes fadeIn { from{opacity:0} to{opacity:1} }\
        .rp-step-badge { position:absolute; top:12px; right:12px; padding:4px 10px; border-radius:12px; font-size:11px; font-weight:600; }\
        .rp-scene-center { display:flex; flex-direction:column; align-items:center; justify-content:center; padding:16px; }\
        .scene-full { display:flex; flex-direction:column; align-items:center; justify-content:center; width:100%; height:100%; padding:20px; }\
        .anim-wrap { display:flex; flex-direction:column; align-items:center; justify-content:center; }\
        .rp-dots { display:flex; gap:5px; justify-content:center; margin-top:14px; flex-wrap:wrap; }\
        .rp-dot { width:8px; height:8px; border-radius:50%; border:1.5px solid #EAD8C4; background:transparent; cursor:pointer; padding:0; transition:all 200ms; }\
        .rp-dot.active { transform:scale(1.3); }\
        .rp-dot.done { }\
        .rp-step-label { text-align:center; font-size:11px; color:#A88070; margin-top:5px; }\
        .rp-text { text-align:center; font-size:14px; color:#2D1A0A; line-height:1.5; padding:12px 8px; min-height:50px; animation:fadeInUp 300ms ease; }\
        .rp-controls { display:flex; align-items:center; justify-content:center; gap:12px; margin-top:4px; }\
        .rp-ctrl-btn { width:42px; height:42px; border-radius:50%; border:1px solid #EAD8C4; background:#FFF; display:flex; align-items:center; justify-content:center; cursor:pointer; color:#7A5C48; transition:all 200ms; }\
        .rp-ctrl-btn:disabled { opacity:.3; cursor:default; }\
        .rp-ctrl-btn:not(:disabled):hover { border-color:#B8601E; color:#B8601E; }\
        .rp-ctrl-play { display:flex; align-items:center; gap:6px; padding:10px 20px; border-radius:24px; border:none; color:white; font-family:var(--font-sans); font-size:14px; font-weight:600; cursor:pointer; min-height:42px; transition:opacity 200ms; }\
        .rp-ctrl-play:hover { opacity:.9; }\
      '}</style>
    </div>
  );
};

export default RecipePresentation;
