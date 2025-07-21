import React, { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Dashboard from './components/Dashboard';
import HealthLogsPage from './components/HealthLogPage';
import useHealthData from './hooks/useHealthData';

function App() {
  const [data, setData] = useHealthData();
  const [currentPage, setCurrentPage] = useState<string>('dashboard'); // 'dashboard' or 'healthLogs'

  return (
    <div className="min-h-screen bg-bg-page font-roboto text-text-dark antialiased flex flex-col items-center">
      <Header currentPage={currentPage} setCurrentPage={setCurrentPage} />

      {currentPage === 'dashboard' && (
        <Dashboard data={data} setData={setData} setCurrentPage={setCurrentPage} />
      )}

      {currentPage === 'healthLogs' && (
        <HealthLogsPage healthLogs={data.healthLogs} />
      )}

      <Footer />
    </div>
  );
}

export default App;
