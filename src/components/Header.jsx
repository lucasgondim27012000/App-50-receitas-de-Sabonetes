import React from 'react';
import { User, Bell } from 'lucide-react';

const Header = () => {
  return (
    <header className="header animate-fade-in">
      <div className="header-greeting">
        <h1>Bem-vinda, Cliente</h1>
        <p>Pronta para criar sabonetes incríveis hoje?</p>
      </div>

      <div className="header-actions">
        <button className="icon-btn">
          <Bell size={20} />
        </button>
        <div className="user-profile">
          <div className="avatar">
            <User size={20} />
          </div>
        </div>
      </div>

      <style>{`
        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: var(--spacing-2xl);
          padding-bottom: var(--spacing-lg);
          border-bottom: 1px solid var(--color-border);
        }

        .header-greeting h1 {
          font-size: 2rem;
          margin-bottom: 4px;
        }

        .header-actions {
          display: flex;
          align-items: center;
          gap: var(--spacing-md);
        }

        .icon-btn {
          background: none;
          border: 1px solid var(--color-border);
          border-radius: 50%;
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          color: var(--color-text-muted);
          transition: all var(--transition-fast);
        }

        .icon-btn:hover {
          background-color: var(--color-bg-alt);
          color: var(--color-text);
        }

        .user-profile {
          display: flex;
          align-items: center;
          gap: var(--spacing-sm);
          cursor: pointer;
        }

        .avatar {
          width: 40px;
          height: 40px;
          background-color: var(--color-primary-light);
          color: var(--color-primary);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      `}</style>
    </header>
  );
};

export default Header;
