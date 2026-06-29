import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Home, BookOpen, Presentation, DollarSign, User } from 'lucide-react';

const BottomNav = () => {
  return (
    <>
      <nav className="bottom-nav" id="bottom-nav">
        <NavLink to="/" className={({ isActive }) => 'bnav-item' + (isActive ? ' active' : '')} end>
          <Home size={24} />
          <span>Início</span>
        </NavLink>
        
        <NavLink to="/receitas" className={({ isActive }) => 'bnav-item' + (isActive ? ' active' : '')}>
          <BookOpen size={24} />
          <span>Receitas</span>
        </NavLink>
        
        <NavLink to="/aprender" className={({ isActive }) => 'bnav-item' + (isActive ? ' active' : '')}>
          <Presentation size={24} />
          <span>Guia</span>
        </NavLink>
        
        <NavLink to="/vender" className={({ isActive }) => 'bnav-item' + (isActive ? ' active' : '')}>
          <DollarSign size={24} />
          <span>Vender</span>
        </NavLink>
        
        <NavLink to="/eu" className={({ isActive }) => 'bnav-item' + (isActive ? ' active' : '')}>
          <User size={24} />
          <span>Eu</span>
        </NavLink>
      </nav>

      <style>{`
        .bottom-nav {
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          height: 64px;
          background-color: #FFFFFF;
          border-top: 0.5px solid #EAD8C4;
          display: flex;
          z-index: 40;
          box-shadow: 0 -2px 10px rgba(0,0,0,0.04);
        }

        .bnav-item {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 2px;
          color: #A88070;
          font-size: 11px;
          font-family: var(--font-sans);
          text-decoration: none;
          transition: color 200ms;
          -webkit-tap-highlight-color: transparent;
        }

        .bnav-item.active {
          color: #B8601E;
        }
      `}</style>
    </>
  );
};

export default BottomNav;
