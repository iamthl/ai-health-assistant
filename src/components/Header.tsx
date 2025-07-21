import React from 'react';
import TPIcapLogo from '../assets/TP ICAP Logo.png';

interface HeaderProps {
  currentPage: string;
  setCurrentPage: (page: string) => void;
}

function Header({ currentPage, setCurrentPage }: HeaderProps) {
  return (
    <header className="w-full bg-bg-header-overlay backdrop-blur-sm border-b border-border-light shadow-sm z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          {/* Logo Icon (TP ICAP Logo) */}
          <img src={TPIcapLogo} alt="TP ICAP Logo" className="h-6 mr-2" />
          <span className="text-xl font-semibold text-primary-indigo">AI Health Assistant</span>
        </div>
        <nav className="hidden md:flex space-x-8">
          <button
            onClick={() => setCurrentPage('dashboard')}
            className={`text-base hover:text-primary-indigo transition-colors ${currentPage === 'dashboard' ? 'text-primary-indigo font-bold' : 'text-text-medium'}`}
          >
            Dashboard
          </button>
          <button
            onClick={() => setCurrentPage('healthLogs')}
            className={`text-base hover:text-primary-indigo transition-colors ${currentPage === 'healthLogs' ? 'text-primary-indigo font-bold' : 'text-text-medium'}`}
          >
            Health Logs
          </button>
        </nav>
        <div className="flex items-center space-x-2">
          <img
            src="https://placehold.co/32x32/E0F2F7/334155?text=User"
            alt="User Avatar"
            className="w-8 h-8 rounded-full border border-border-medium"
          />
        </div>
      </div>
    </header>
  );
}

export default Header; 