import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calculator, MessageSquare, Calendar, ShoppingBag, Copy, TrendingUp, Award, ShieldCheck, ChevronRight } from 'lucide-react';
import { recipes } from '../data/recipes';
import { salesDates } from '../data/salesDates';
import { generateSalesCopy } from '../data/salesCopy';

var Sell = function() {
  var navigate = useNavigate();
  var [activeTab, setActiveTab] = useState('calc');
  var [units, setUnits] = useState(20);
  var [costLote, setCostLote] = useState(50);
  var [priceUnit, setPriceUnit] = useState(18);
  var [selectedRecipeId, setSelectedRecipeId] = useState(1);
  var [copyStates, setCopyStates] = useState({});

  var revenue = units * priceUnit;
  var profit = revenue - costLote;
  var margin = revenue > 0 ? Math.round((profit / revenue) * 100) : 0;
  var unitsFor500 = priceUnit > 0 ? Math.ceil(500 / (priceUnit - (costLote / units))) : 0;

  var selectedRecipe = recipes.find(function(r) { return r.id === selectedRecipeId; }) || recipes[0];
  var salesCopy = generateSalesCopy(selectedRecipe);

  var handleCopy = function(key, text) {
    navigator.clipboard.writeText(text).then(function() {
      var newStates = {};
      newStates[key] = true;
      setCopyStates(Object.assign({}, copyStates, newStates));
      setTimeout(function() {
        setCopyStates(function(prev) {
          var next = Object.assign({}, prev);
          delete next[key];
          return next;
        });
      }, 2000);
    });
  };

  // Dates calculation
  var now = new Date();
  var datesWithDays = salesDates.map(function(d) {
    var target = new Date(now.getFullYear(), d.month - 1, d.day);
    if (target < now) target = new Date(now.getFullYear() + 1, d.month - 1, d.day);
    var diffMs = target - now;
    var diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
    return Object.assign({}, d, { daysLeft: diffDays });
  }).sort(function(a, b) { return a.daysLeft - b.daysLeft; });

  var tabs = [
    { key: 'calc', icon: Calculator, label: 'Lucro' },
    { key: 'copy', icon: MessageSquare, label: 'Vender' },
    { key: 'dates', icon: Calendar, label: 'Datas' },
    { key: 'offers', icon: ShoppingBag, label: 'Ofertas' },
  ];

  return (
    <div className="animate-fade-in sell">
      <h1 className="sell-title mb-2">Ferramentas de Venda</h1>
      <p className="text-muted mb-4">Tudo que você precisa para lucrar</p>

      {/* Tabs */}
      <div className="sell-tabs mb-6">
        {tabs.map(function(tab) {
          var Icon = tab.icon;
          return (
            <button
              key={tab.key}
              className={'sell-tab' + (activeTab === tab.key ? ' active' : '')}
              onClick={function() { setActiveTab(tab.key); }}
            >
              <Icon size={18} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TOOL 1 - Calculator */}
      {activeTab === 'calc' && (
        <div className="card">
          <h3 className="sell-h3 mb-4">💰 Quanto você vai ganhar?</h3>

          <div className="sell-field mb-4">
            <label>Quantas unidades quer vender?</label>
            <div className="sell-slider-row">
              <input type="range" min="5" max="50" value={units}
                onChange={function(e) { setUnits(Number(e.target.value)); }}
                className="sell-slider" />
              <span className="sell-slider-val">{units}</span>
            </div>
          </div>

          <div className="sell-field mb-4">
            <label>Custo do material por lote:</label>
            <div className="sell-input-row">
              <span>R$</span>
              <input type="number" value={costLote} min="10" max="200"
                onChange={function(e) { setCostLote(Number(e.target.value)); }} />
            </div>
          </div>

          <div className="sell-field mb-4">
            <label>Preço de venda por unidade:</label>
            <div className="sell-input-row">
              <span>R$</span>
              <input type="number" value={priceUnit} min="5" max="60"
                onChange={function(e) { setPriceUnit(Number(e.target.value)); }} />
            </div>
          </div>

          <div className="sell-results">
            <div className="sr-row"><span>Faturamento:</span><strong>{'R$ ' + revenue.toFixed(0)}</strong></div>
            <div className="sr-row"><span>Custo:</span><strong>{'R$ ' + costLote.toFixed(0)}</strong></div>
            <div className="sr-divider"></div>
            <div className="sr-row sr-highlight"><span>✅ Seu lucro:</span><strong>{'R$ ' + profit.toFixed(0)}</strong></div>
            <div className="sr-row"><span>Margem:</span><strong>{margin + '%'}</strong></div>
          </div>

          <p className="sell-suggestion mt-4">
            {'💡 Para lucrar R$500/mês, venda ' + unitsFor500 + ' unidades por mês.'}
          </p>
        </div>
      )}

      {/* TOOL 2 - Sales Copy */}
      {activeTab === 'copy' && (
        <div className="card">
          <h3 className="sell-h3 mb-4">📱 Textos prontos para vender</h3>

          <div className="sell-field mb-4">
            <label>Escolha a receita:</label>
            <select className="sell-select" value={selectedRecipeId}
              onChange={function(e) { setSelectedRecipeId(Number(e.target.value)); }}>
              {recipes.map(function(r) {
                return React.createElement('option', { key: r.id, value: r.id }, r.title);
              })}
            </select>
          </div>

          <div className="sell-copy-block mb-4">
            <p className="scb-label">Legenda para Instagram</p>
            <div className="scb-text">{salesCopy.instagram}</div>
            <button className="btn btn-outline scb-btn"
              onClick={function() { handleCopy('ig', salesCopy.instagram); }}
              style={copyStates.ig ? { background: '#EAF2EB', color: '#27500A', borderColor: '#6B8F6D' } : {}}>
              <Copy size={14} /> {copyStates.ig ? 'Copiado!' : 'Copiar'}
            </button>
          </div>

          <div className="sell-copy-block mb-4">
            <p className="scb-label">Mensagem de WhatsApp</p>
            <div className="scb-text">{salesCopy.whatsapp}</div>
            <button className="btn btn-outline scb-btn"
              onClick={function() { handleCopy('wpp', salesCopy.whatsapp); }}
              style={copyStates.wpp ? { background: '#EAF2EB', color: '#27500A', borderColor: '#6B8F6D' } : {}}>
              <Copy size={14} /> {copyStates.wpp ? 'Copiado!' : 'Copiar'}
            </button>
          </div>

          <div className="sell-copy-block">
            <p className="scb-label">Tabela de preços</p>
            <div className="scb-text">{salesCopy.priceTable}</div>
            <button className="btn btn-outline scb-btn"
              onClick={function() { handleCopy('tbl', salesCopy.priceTable); }}
              style={copyStates.tbl ? { background: '#EAF2EB', color: '#27500A', borderColor: '#6B8F6D' } : {}}>
              <Copy size={14} /> {copyStates.tbl ? 'Copiado!' : 'Copiar'}
            </button>
          </div>
        </div>
      )}

      {/* TOOL 3 - Dates */}
      {activeTab === 'dates' && (
        <div>
          <div className="card sell-date-highlight mb-4">
            <p className="sdh-label">🔜 PRÓXIMA OPORTUNIDADE</p>
            <h3 className="sdh-name">{datesWithDays[0].emoji + ' ' + datesWithDays[0].name}</h3>
            <p className="sdh-days">{'Faltam ' + datesWithDays[0].daysLeft + ' dias'}</p>
            <p className="sdh-tip text-muted mt-2">{datesWithDays[0].tip}</p>
            <button className="btn btn-primary mt-3" onClick={function() {
              var first = datesWithDays[0].recipeIds[0];
              if (first) navigate('/recipe/' + first);
            }}>
              Ver receitas recomendadas →
            </button>
          </div>

          <h3 className="sell-h3 mb-3">Próximas datas</h3>
          <div className="flex flex-col gap-3">
            {datesWithDays.slice(1).map(function(d, i) {
              return (
                <div key={i} className="card sell-date-card">
                  <span className="sdc-emoji">{d.emoji}</span>
                  <div className="sdc-info">
                    <h4>{d.name}</h4>
                    <p className="text-muted" style={{ fontSize: '13px' }}>{'Faltam ' + d.daysLeft + ' dias'}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TOOL 4 - Offers */}
      {activeTab === 'offers' && (
        <div>
          <div className="card mb-4" style={{ background: '#FDF7F2' }}>
            <p className="text-center" style={{ fontSize: '15px' }}>
              🚀 <strong>Pronta para o próximo nível?</strong><br/>
              <span className="text-muted">Você já tem as receitas. Veja como transformar isso em renda de verdade.</span>
            </p>
          </div>

          <div className="flex flex-col gap-4">
            {/* OFERTA 1 — Combo */}
            <div className="card sell-offer" style={{ borderLeftColor: '#B8601E' }}>
              <span className="badge mb-3">Mais pedido pelas alunas</span>
              <h3 className="so-title">📈 Combo Gerador de Renda Extra</h3>
              <p className="text-muted mt-2 mb-3">
                Adicione o Combo e leve 2 produtos completos para vender ainda mais:
              </p>
              <ul className="so-list mb-3">
                <li>✔️ <strong>30 Receitas de Sabonetes Premium</strong> — para vender mais caro</li>
                <li>✔️ <strong>30 Receitas de Shampoos Naturais</strong> — alta procura</li>
              </ul>
              <div className="so-highlight mb-3">
                <span>⚠️</span> 9 em cada 10 alunas adicionam este Combo na compra
              </div>
              <p className="so-detail mb-3">
                👉 São <strong>60 receitas</strong> prontas para produzir e vender<br/>
                💰 Aumente até <strong>200% seus lucros</strong> com produtos de maior valor
              </p>
              <a href="https://pay.hotmart.com/I106208951S" target="_blank" rel="noreferrer" className="btn btn-primary w-full">
                Quero adicionar o Combo →
              </a>
              <p className="so-fine text-muted mt-2">Oferta única</p>
            </div>

            {/* OFERTA 2 — Kit Saboaria (destaque principal) */}
            <div className="card sell-offer sell-offer-main" style={{ borderLeftColor: '#C89B3C' }}>
              <div className="so-best-badge">⭐ Mais completo</div>
              <span className="badge mb-3">Para construir um negócio de verdade</span>
              <h3 className="so-title">🏆 Kit Saboaria Lucrativa</h3>
              <p className="so-headline mt-2 mb-3">
                Você já tem as receitas.<br/>Agora garanta as vendas.
              </p>
              <p className="text-muted mb-3" style={{ fontSize: '14px', lineHeight: '1.6' }}>
                O momento entre "eu sei fazer" e "eu consigo vender" é onde 8 em cada 10 mulheres travam. Este kit resolve isso com 4 ferramentas prontas:
              </p>
              <div className="so-tools mb-3">
                <div className="so-tool-item">
                  <span className="so-tool-icon">🎨</span>
                  <div>
                    <strong>12 Templates editáveis no Canva</strong>
                    <p>Artes profissionais — só trocar o texto</p>
                  </div>
                </div>
                <div className="so-tool-item">
                  <span className="so-tool-icon">📊</span>
                  <div>
                    <strong>Planilha de gestão completa</strong>
                    <p>Calculadora de preço + simulador de renda</p>
                  </div>
                </div>
                <div className="so-tool-item">
                  <span className="so-tool-icon">💬</span>
                  <div>
                    <strong>15 Scripts prontos de venda</strong>
                    <p>Roteiros de WhatsApp e Instagram</p>
                  </div>
                </div>
                <div className="so-tool-item">
                  <span className="so-tool-icon">🎁</span>
                  <div>
                    <strong>Bônus: Guia Lembrancinhas Lucrativas</strong>
                    <p>Como fechar pedidos de 100 sabonetes</p>
                  </div>
                </div>
              </div>
              <div className="so-price-box mb-3">
                <span className="so-price-old">De R$348</span>
                <span className="so-price-new">por apenas R$97</span>
                <span className="so-price-parcela">ou 8x de menos de R$15</span>
              </div>
              <p className="so-guarantee mb-3">✅ Garantia de 7 dias · 🔒 Pagamento seguro</p>
              <a href="https://kit-saboaria-lucrativa.vercel.app/" target="_blank" rel="noreferrer" className="btn btn-primary w-full">
                Quero o Kit Lucrativo →
              </a>
            </div>

            {/* OFERTA 3 — Kit Essencial */}
            <div className="card sell-offer" style={{ borderLeftColor: '#6B8F6D' }}>
              <span className="badge mb-3">Para dar o primeiro passo</span>
              <h3 className="so-title">🛡️ Kit Essencial Saboaria</h3>
              <p className="so-headline mt-2 mb-3">
                Comece do jeito certo — com o essencial para a sua primeira venda acontecer.
              </p>
              <p className="text-muted mb-3" style={{ fontSize: '14px', lineHeight: '1.6' }}>
                A primeira venda precisa de só duas coisas: uma cara profissional para o produto, e as palavras certas para mandar.
              </p>
              <div className="so-tools mb-3">
                <div className="so-tool-item">
                  <span className="so-tool-icon">🎨</span>
                  <div>
                    <strong>12 Templates editáveis no Canva</strong>
                    <p>Posts, stories, catálogo e etiquetas</p>
                  </div>
                </div>
                <div className="so-tool-item">
                  <span className="so-tool-icon">💬</span>
                  <div>
                    <strong>15 Scripts de venda</strong>
                    <p>WhatsApp, Instagram e respostas a objeções — palavra por palavra</p>
                  </div>
                </div>
              </div>
              <div className="so-price-box so-price-sage mb-3">
                <span className="so-price-new so-sage-price">Apenas R$47</span>
                <span className="so-price-parcela">O mesmo valor do seu Guia</span>
              </div>
              <p className="so-guarantee mb-3">✅ Garantia de 7 dias</p>
              <a href="https://kit-essencial-eight.vercel.app/" target="_blank" rel="noreferrer" className="btn btn-primary w-full">
                Quero começar com o essencial →
              </a>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .sell-title { font-family: var(--font-serif); font-size: 22px; }
        .sell-h3 { font-family: var(--font-serif); font-size: 18px; }

        .sell-tabs {
          display: flex; gap: 8px;
          overflow-x: auto; padding-bottom: 4px;
        }
        .sell-tabs::-webkit-scrollbar { height: 0; }
        .sell-tab {
          display: flex; align-items: center; gap: 6px;
          padding: 10px 16px;
          border-radius: 20px;
          border: 0.5px solid #EAD8C4;
          background: transparent;
          color: #7A5C48;
          font-family: var(--font-sans);
          font-size: 13px; font-weight: 500;
          cursor: pointer; white-space: nowrap;
          transition: all 200ms;
          min-height: 40px;
        }
        .sell-tab.active {
          background: #F5E6DA; color: #B8601E; border-color: #B8601E;
        }

        .sell-field label {
          display: block; font-size: 14px; font-weight: 500;
          color: #2D1A0A; margin-bottom: 8px;
        }
        .sell-slider-row { display: flex; align-items: center; gap: 12px; }
        .sell-slider { flex: 1; accent-color: #B8601E; }
        .sell-slider-val {
          font-weight: 700; color: #B8601E;
          min-width: 24px; text-align: center;
        }
        .sell-input-row {
          display: flex; align-items: center; gap: 8px;
          border: 1px solid #EAD8C4; border-radius: 10px;
          padding: 10px 14px;
        }
        .sell-input-row input {
          border: none; outline: none;
          font-family: var(--font-sans); font-size: 16px;
          color: #2D1A0A; width: 100%; background: transparent;
        }

        .sell-results {
          background: #FDF7F2; border: 1px solid #EAD8C4;
          border-radius: 14px; padding: 16px;
          display: flex; flex-direction: column; gap: 8px;
        }
        .sr-row {
          display: flex; justify-content: space-between;
          font-size: 14px; color: #7A5C48;
        }
        .sr-divider { height: 1px; background: #EAD8C4; margin: 4px 0; }
        .sr-highlight { font-size: 16px; color: #2D1A0A; }
        .sr-highlight strong { color: #27500A; }

        .sell-suggestion {
          font-size: 14px; color: #6B8F6D;
          font-weight: 500; line-height: 1.5;
        }

        .sell-select {
          width: 100%; padding: 12px;
          border: 1px solid #EAD8C4; border-radius: 10px;
          font-family: var(--font-sans); font-size: 15px;
          color: #2D1A0A; background: #FFFFFF;
          outline: none; min-height: 48px;
        }

        .sell-copy-block {
          background: #FDF7F2; border-radius: 14px;
          padding: 14px;
        }
        .scb-label {
          font-size: 12px; font-weight: 600;
          color: #B8601E; margin-bottom: 8px;
          text-transform: uppercase; letter-spacing: 0.5px;
        }
        .scb-text {
          font-size: 14px; color: #4A3A2D;
          white-space: pre-line; line-height: 1.5;
          margin-bottom: 10px;
        }
        .scb-btn { padding: 8px 14px; min-height: 36px; font-size: 13px; }

        .sell-date-highlight {
          background: #FAF2DC; border-left: 4px solid #C89B3C;
        }
        .sdh-label {
          font-size: 11px; font-weight: 600;
          color: #C89B3C; letter-spacing: 0.5px;
          margin-bottom: 6px;
        }
        .sdh-name { font-family: var(--font-serif); font-size: 20px; }
        .sdh-days { font-size: 14px; color: #8A6A20; font-weight: 500; }

        .sell-date-card {
          display: flex; align-items: center; gap: 14px;
          padding: 14px 16px;
        }
        .sdc-emoji { font-size: 28px; }
        .sdc-info h4 { font-size: 15px; margin-bottom: 2px; }

        .sell-offer {
          border-left: 4px solid; display: flex; flex-direction: column;
          position: relative;
        }
        .sell-offer-main {
          border-width: 2px;
          box-shadow: 0 4px 20px rgba(200,155,60,0.12);
        }
        .so-title { font-family: var(--font-serif); font-size: 18px; }
        .so-headline {
          font-family: var(--font-serif); font-size: 16px;
          color: #2D1A0A; line-height: 1.4;
        }
        .so-list {
          list-style: none; display: flex; flex-direction: column; gap: 6px;
          font-size: 14px;
        }
        .so-highlight {
          background: #FAF2DC; border-radius: 10px; padding: 10px 14px;
          font-size: 13px; font-weight: 600; color: #854F0B;
          display: flex; align-items: center; gap: 8px;
        }
        .so-detail { font-size: 14px; line-height: 1.6; color: #2D1A0A; }
        .so-fine { font-size: 12px; text-align: center; }
        .so-best-badge {
          position: absolute; top: -10px; right: 16px;
          background: #C89B3C; color: white;
          font-size: 11px; font-weight: 600;
          padding: 4px 12px; border-radius: 12px;
        }
        .so-tools {
          display: flex; flex-direction: column; gap: 12px;
        }
        .so-tool-item {
          display: flex; gap: 10px; align-items: flex-start;
        }
        .so-tool-icon { font-size: 20px; flex-shrink: 0; margin-top: 2px; }
        .so-tool-item strong { font-size: 14px; display: block; margin-bottom: 2px; }
        .so-tool-item p { font-size: 13px; color: #7A5C48; margin: 0; }
        .so-price-box {
          background: #FAF2DC; border-radius: 12px; padding: 14px;
          text-align: center; display: flex; flex-direction: column; gap: 4px;
        }
        .so-price-old {
          font-size: 14px; color: #7A5C48;
          text-decoration: line-through;
        }
        .so-price-new {
          font-size: 22px; font-weight: 700; color: #8A4010;
        }
        .so-price-parcela { font-size: 13px; color: #7A5C48; }
        .so-price-sage {
          background: #EAF2EB;
        }
        .so-sage-price { color: #27500A; }
        .so-guarantee {
          font-size: 13px; color: #7A5C48; text-align: center;
        }
      `}</style>
    </div>
  );
};

export default Sell;
