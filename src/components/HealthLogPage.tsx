import React, { useState, useEffect } from 'react';
import HealthLogCard from './HealthLogCard';
import { HealthLog } from '../types'; // Import the HealthLog type

interface HealthLogsPageProps {
  healthLogs: HealthLog[];
}

function HealthLogsPage({ healthLogs }: HealthLogsPageProps) {
  const [orderBy, setOrderBy] = useState<string>('Latest');
  const [category, setCategory] = useState<string>('All Categories');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filteredHealthLogs, setFilteredHealthLogs] = useState<HealthLog[]>([]);

  useEffect(() => {
    let currentLogs = [...healthLogs]; // Create a mutable copy

    // Filter by search term
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      currentLogs = currentLogs.filter(log => {
        const detailsString = JSON.stringify(log.details).toLowerCase();
        return (
          log.type.toLowerCase().includes(searchLower) ||
          log.category.toLowerCase().includes(searchLower) ||
          detailsString.includes(searchLower) ||
          log.status.toLowerCase().includes(searchLower) ||
          log.timeAgo.toLowerCase().includes(searchLower)
        );
      });
    }

    // Filter by category
    if (category !== 'All Categories') {
      currentLogs = currentLogs.filter(log => log.category === category);
    }

    // Sort
    currentLogs.sort((a, b) => {
      // For demonstration, we'll sort by ID for 'Latest'/'Oldest'
      // In a real app, you'd parse timeAgo or use actual timestamps for accurate sorting
      if (orderBy === 'Latest') {
        return b.id - a.id;
      } else if (orderBy === 'Oldest') {
        return a.id - b.id;
      }
      return 0;
    });

    setFilteredHealthLogs(currentLogs);
  }, [healthLogs, orderBy, category, searchTerm]);


  // Extract unique categories for the filter dropdown
  const uniqueCategories = ['All Categories', ...new Set(healthLogs.map(log => log.category))];

  return (
    <main className="flex flex-col max-w-7xl mx-auto px-4 py-8 w-full">
      {/* Health Logs Header Section */}
      <section className="card-section mb-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-blue-action-text mb-1">Health Logs</h1>
            <p className="text-base text-text-medium">Track and monitor your health metrics over time</p>
          </div>
          <div className="flex flex-wrap gap-3 mt-4 sm:mt-0">
            <button className="quick-action-button text-xs sm:text-sm min-w-[100px] sm:min-w-[120px]">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mb-1 text-blue-action-text">
                <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.58 20 4 16.42 4 12C4 7.58 7.58 4 12 4C16.42 4 20 7.58 20 12C20 16.42 16.42 20 12 20ZM11 15H13V17H11V15ZM11 7H13V13H11V7Z" fill="currentColor"/>
              </svg>
              Log Symptoms
            </button>
            <button className="quick-action-button text-xs sm:text-sm min-w-[100px] sm:min-w-[120px]">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mb-1 text-blue-action-text">
                <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.58 20 4 16.42 4 12C4 7.58 7.58 4 12 4C16.42 4 20 7.58 20 12C20 16.42 16.42 20 12 20ZM11 15H13V17H11V15ZM11 7H13V13H11V7Z" fill="currentColor"/>
              </svg>
              Log Exercise
            </button>
            <button className="quick-action-button text-xs sm:text-sm min-w-[100px] sm:min-w-[120px]">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mb-1 text-blue-action-text">
                <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.58 20 4 16.42 4 12C4 7.58 7.58 4 12 4C16.42 4 20 7.58 20 12C20 16.42 16.42 20 12 20ZM11 15H13V17H11V15ZM11 7H13V13H11V7Z" fill="currentColor"/>
              </svg>
              Track Medication
            </button>
            <button className="quick-action-button text-xs sm:text-sm min-w-[100px] sm:min-w-[120px]">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mb-1 text-blue-action-text">
                <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.58 20 4 16.42 4 12C4 7.58 7.58 4 12 4C16.42 4 20 7.58 20 12C20 16.42 16.42 20 12 20ZM11 15H13V17H11V15ZM11 7H13V13H11V7Z" fill="currentColor"/>
              </svg>
              Sleep Tracker
            </button>
          </div>
        </div>

        {/* Filter and Search Bar */}
        <div className="flex flex-col md:flex-row gap-4 items-center w-full">
          <div className="flex items-center gap-2 w-full md:w-auto">
            <label htmlFor="orderBy" className="form-label">Order by:</label>
            <div className="relative flex-1">
              <select
                id="orderBy"
                value={orderBy}
                onChange={(e) => setOrderBy(e.target.value)}
                className="filter-select"
              >
                <option value="Latest">Latest</option>
                <option value="Oldest">Oldest</option>
              </select>
              <div className="select-arrow">
                <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto">
            <label htmlFor="category" className="form-label">Category:</label>
            <div className="relative flex-1">
              <select
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="filter-select"
              >
                {uniqueCategories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
              <div className="select-arrow">
                <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          </div>

          <div className="relative flex-1 w-full md:w-auto">
            <input
              type="text"
              placeholder="Search logs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="filter-search-input"
            />
            <button className="filter-search-button">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-text-medium">
                <path d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19ZM11 17C7.68629 17 5 14.3137 5 11C5 7.68629 7.68629 5 11 5C14.3137 5 17 7.68629 17 11C17 14.3137 14.3137 17 11 17ZM19.4853 19.4853L22.3137 22.3137" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* Health Log Cards Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredHealthLogs.length > 0 ? (
          filteredHealthLogs.map((log: HealthLog) => (
            <HealthLogCard key={log.id} log={log} />
          ))
        ) : (
          <p className="col-span-full text-center text-text-medium">No health logs found matching your criteria.</p>
        )}
      </section>
    </main>
  );
}

export default HealthLogsPage; 