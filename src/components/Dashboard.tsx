import React from 'react';
import useSymptomForm from '../hooks/useSymptomForm';
import useAIAnalysis from '../hooks/useAIAnalysis';
import { AppData, SymptomAssessmentData, HealthRecommendation, HealthLog } from '../types';

interface DashboardProps {
  data: AppData;
  setData: React.Dispatch<React.SetStateAction<AppData>>;
  setCurrentPage: (page: string) => void;
}

function Dashboard({ data, setData, setCurrentPage }: DashboardProps) {
  // Callbacks to update the main data state from hooks
  const updateSymptomAssessment = (newSymptomForm: SymptomAssessmentData) => {
    setData(prevData => ({
      ...prevData,
      symptomAssessment: newSymptomForm
    }));
  };

  const updateHealthRecommendations = (newRecommendations: HealthRecommendation) => {
    setData(prevData => ({
      ...prevData,
      healthRecommendations: newRecommendations
    }));
  };

  const [symptomForm, handleSymptomChange] = useSymptomForm(
    data.symptomAssessment,
    updateSymptomAssessment
  );

  const [getAIAnalysis, isLoadingAI, aiError] = useAIAnalysis(
    symptomForm,
    updateHealthRecommendations
  );

  return (
    <main className="flex flex-col lg:flex-row gap-8 max-w-7xl mx-auto px-4 py-8 w-full">
      {/* Left Column */}
      <div className="flex-1 flex flex-col gap-8">
        {/* Welcome Banner */}
        <div className="info-banner">
          <h1 className="text-3xl font-bold text-white mb-2">Good morning, {data.userInfo.name}</h1>
          <p className="text-lg text-blue-banner-light">How are you feeling today? Let's track your health journey together.</p>
        </div>

        {/* Symptom Assessment Section */}
        <section className="card-section">
          <h2 className="card-title">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2 text-blue-action-text">
              <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.58 20 4 16.42 4 12C4 7.58 7.58 4 12 4C16.42 4 20 7.58 20 12C20 16.42 16.42 20 12 20ZM11 15H13V17H11V15ZM11 7H13V13H11V7Z" fill="currentColor"/>
            </svg>
            Symptom Assessment
          </h2>
          <div className="space-y-4">
            <div>
              <label htmlFor="symptoms" className="form-label">Describe your symptoms</label>
              <textarea
                id="symptoms"
                name="symptoms"
                rows={5}
                className="form-textarea"
                placeholder="Tell me about any symptoms you're experiencing today..."
                value={symptomForm.symptoms}
                onChange={handleSymptomChange}
              ></textarea>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <label htmlFor="painLevel" className="form-label">Pain Level (1-10)</label>
                <div className="relative">
                  <select
                    id="painLevel"
                    name="painLevel"
                    className="form-select"
                    value={symptomForm.painLevel}
                    onChange={handleSymptomChange}
                  >
                    <option value="">Select level</option>
                    {[...Array(10)].map((_, i) => (
                      <option key={i + 1} value={i + 1}>{i + 1}</option>
                    ))}
                  </select>
                  <div className="select-arrow">
                    <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="flex-1">
                <label htmlFor="duration" className="form-label">Duration</label>
                <div className="relative">
                  <select
                    id="duration"
                    name="duration"
                    className="form-select"
                    value={symptomForm.duration}
                    onChange={handleSymptomChange}
                  >
                    <option value="">Select duration</option>
                    <option value="Less than 1 day">Less than 1 day</option>
                    <option value="1-3 days">1-3 days</option>
                    <option value="3-7 days">3-7 days</option>
                    <option value="More than 1 week">More than 1 week</option>
                  </select>
                  <div className="select-arrow">
                    <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            <button
              onClick={getAIAnalysis}
              disabled={isLoadingAI}
              className="primary-action-button"
            >
              {isLoadingAI ? (
                <svg className="animate-spin h-5 w-5 mr-3 text-blue-action-text" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-blue-action-text">
                  <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.58 20 4 16.42 4 12C4 7.58 7.58 4 12 4C16.42 4 20 7.58 20 12C20 16.42 16.42 20 12 20ZM11 15H13V17H11V15ZM11 7H13V13H11V7Z" fill="currentColor"/>
                </svg>
              )}
              <span>{isLoadingAI ? 'Analyzing...' : 'Get AI Analysis'}</span>
            </button>
            {aiError && <p className="text-red-600 text-sm mt-2">{aiError}</p>}
          </div>
        </section>

        {/* AI Health Recommendations Section */}
        <section className="card-section">
          <h2 className="card-title">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2 text-blue-log-icon">
              <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.58 20 4 16.42 4 12C4 7.58 7.58 4 12 4C16.42 4 20 7.58 20 12C20 16.42 16.42 20 12 20ZM11 15H13V17H11V15ZM11 7H13V13H11V7Z" fill="currentColor"/>
            </svg>
            AI Health Recommendations
          </h2>
          <div className="space-y-4">
            <div className="recommendation-card">
              <div className="flex items-start mb-2">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2 mt-1 text-blue-log-icon">
                  <path d="M10 2C5.58 2 2 5.58 2 10C2 14.42 5.58 18 10 18C14.42 18 18 14.42 18 10C18 5.58 14.42 2 10 2ZM10 16C6.69 16 4 13.31 4 10C4 6.69 6.69 4 10 4C13.31 4 16 6.69 16 10C16 13.31 13.31 16 10 16ZM9 13H11V15H9V13ZM9 5H11V11H9V5Z" fill="currentColor"/>
                </svg>
                <div>
                  <h3 className="text-lg font-medium text-text-dark">Immediate Recommendations</h3>
                  <p className="text-sm text-text-medium">Based on your symptoms, here are some suggestions:</p>
                </div>
              </div>
              <ul className="list-disc list-inside text-text-medium text-sm space-y-1 pl-6">
                {data.healthRecommendations.immediate.map((rec, index) => (
                  <li key={index}>{rec}</li>
                ))}
              </ul>
            </div>

            <div className="warning-card">
              <div className="flex items-start mb-2">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2 mt-1 text-orange-warning-text">
                  <path d="M10 2C5.58 2 2 5.58 2 10C2 14.42 5.58 18 10 18C14.42 18 18 14.42 18 10C18 5.58 14.42 2 10 2ZM10 16C6.69 16 4 13.31 4 10C4 6.69 6.69 4 10 4C13.31 4 16 6.69 16 10C16 13.31 13.31 16 10 16ZM9 13H11V15H9V13ZM9 5H11V11H9V5Z" fill="currentColor"/>
                </svg>
                <div>
                  <h3 className="text-lg font-medium text-text-dark">When to Seek Care</h3>
                  <p className="text-sm text-text-medium">{data.healthRecommendations.seekCareWarning}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Recent Health Logs Section (on Dashboard) */}
        <section className="card-section">
          <div className="flex justify-between items-center mb-4">
            <h2 className="card-title">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2 text-blue-action-text">
                <path d="M19 3H5C3.89 3 3 3.9 3 5V19C3 20.1 3.89 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM19 19H5V9H19V19ZM5 7H19V5H5V7ZM7 11H17V13H7V11ZM7 15H17V17H7V15Z" fill="currentColor"/>
              </svg>
              Recent Health Logs
            </h2>
            <button
              onClick={() => setCurrentPage('healthLogs')}
              className="secondary-button"
            >
              View All
            </button>
          </div>
          <div className="space-y-4">
            {data.healthLogs.slice(0, 2).map((log: HealthLog) => ( // Display only first 2 for dashboard
              <div key={log.id} className="health-log-item">
                <div className="flex justify-between items-center mb-2">
                  <p className="text-sm font-medium text-text-dark">{log.timeAgo}</p>
                  <span className={`log-status-tag ${log.bgColor} ${log.statusColor}`}>
                    {log.status}
                  </span>
                </div>
                <p className="text-sm text-text-medium">
                  {log.type}: {Object.values(log.details).join(', ')}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Right Column */}
      <div className="flex-none w-full lg:w-96 flex flex-col gap-8">
        {/* Health Overview Section */}
        <section className="card-section">
          <h2 className="card-title">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2 text-blue-action-text">
              <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.58 20 4 16.42 4 12C4 7.58 7.58 4 12 4C16.42 4 20 7.58 20 12C20 16.42 16.42 20 12 20ZM11 15H13V17H11V15ZM11 7H13V13H11V7Z" fill="currentColor"/>
            </svg>
            Health Overview
          </h2>
          <div className="space-y-4">
            <div className="health-metric-score-card">
              <div>
                <p className="text-sm font-medium text-teal-score-text">Overall Health Score</p>
                <p className="text-2xl font-bold text-teal-score-text">{data.healthOverview.score}</p>
              </div>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-teal-score-text">
                <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.58 20 4 16.42 4 12C4 7.58 7.58 4 12 4C16.42 4 20 7.58 20 12C20 16.42 16.42 20 12 20ZM11 15H13V17H11V15ZM11 7H13V13H11V7Z" fill="currentColor"/>
            </svg>
            </div>

            {/* Progress Bars */}
            {['Sleep Quality', 'Hydration', 'Activity Level'].map((item) => {
              const key = item.replace(/\s+/g, '').toLowerCase();
              const value = data.healthOverview[key as keyof typeof data.healthOverview]; // Type assertion
              const barClass = key === 'activitylevel' ? 'progress-bar-fill-orange' : 'progress-bar-fill-indigo';
              return (
                <div key={key} className="flex items-center justify-between">
                  <p className="text-sm text-text-medium">{item}</p>
                  <div className="flex items-center space-x-2 w-1/2">
                    <div className="progress-bar-container">
                      <div
                        className={barClass}
                        style={{ width: `${value}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium text-text-dark">{value}%</span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Daily Health Tips Section */}
        <section className="card-section">
          <h2 className="card-title">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2 text-blue-action-text">
              <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.58 20 4 16.42 4 12C4 7.58 7.58 4 12 4C16.42 4 20 7.58 20 12C20 16.42 16.42 20 12 20ZM11 15H13V17H11V15ZM11 7H13V13H11V7Z" fill="currentColor"/>
            </svg>
            Daily Health Tips
          </h2>
          <div className="space-y-4">
            {data.dailyHealthTips.map((tip) => (
              <div key={tip.id} className="tip-card-blue">
                <h3 className="text-base font-semibold text-text-dark mb-1">{tip.title}</h3>
                <p className="text-sm text-text-medium">{tip.description}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}

export default Dashboard; 