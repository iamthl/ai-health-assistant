import React from 'react';
import { HealthLog, BloodPressureDetails, WeightDetails, MedicationDetails, TemperatureDetails, ExerciseDetails, SymptomDetails } from '../types';

interface HealthLogCardProps {
  log: HealthLog;
}

function HealthLogCard({ log }: HealthLogCardProps) {
  const renderDetails = () => {
    switch (log.type) {
      case "Blood Pressure":
        const bpDetails = log.details as BloodPressureDetails;
        return (
          <>
            <p className="text-sm text-text-medium flex justify-between">
              <span>Systolic:</span>
              <span className="font-medium text-text-dark">{bpDetails.systolic}</span>
            </p>
            <p className="text-sm text-text-medium flex justify-between">
              <span>Diastolic:</span>
              <span className="font-medium text-text-dark">{bpDetails.diastolic}</span>
            </p>
          </>
        );
      case "Weight":
        const weightDetails = log.details as WeightDetails;
        return (
          <>
            <p className="text-sm text-text-medium flex justify-between">
              <span>Current:</span>
              <span className="font-medium text-text-dark">{weightDetails.current}</span>
            </p>
            <p className="text-sm text-text-medium flex justify-between">
              <span>Change:</span>
              <span className="font-medium text-emerald-600">{weightDetails.change}</span>
            </p>
          </>
        );
      case "Medication":
        const medDetails = log.details as MedicationDetails;
        return (
          <>
            <p className="text-sm text-text-medium flex justify-between">
              <span>Medication:</span>
              <span className="font-medium text-text-dark">{medDetails.medication}</span>
            </p>
            <p className="text-sm text-text-medium flex justify-between">
              <span>Dosage:</span>
              <span className="font-medium text-text-dark">{medDetails.dosage}</span>
            </p>
          </>
        );
      case "Temperature":
        const tempDetails = log.details as TemperatureDetails;
        return (
          <>
            <p className="text-sm text-text-medium flex justify-between">
              <span>Reading:</span>
              <span className="font-medium text-text-dark">{tempDetails.reading}</span>
            </p>
            <p className="text-sm text-text-medium flex justify-between">
              <span>Method:</span>
              <span className="font-medium text-text-dark">{tempDetails.method}</span>
            </p>
          </>
        );
      case "Exercise":
        const exerciseDetails = log.details as ExerciseDetails;
        return (
          <>
            <p className="text-sm text-text-medium flex justify-between">
              <span>Activity:</span>
              <span className="font-medium text-text-dark">{exerciseDetails.activity}</span>
            </p>
            <p className="text-sm text-text-medium flex justify-between">
              <span>Duration:</span>
              <span className="font-medium text-text-dark">{exerciseDetails.duration}</span>
            </p>
          </>
        );
      case "Symptoms":
        const symptomDetails = log.details as SymptomDetails;
        return (
          <>
            <p className="text-sm text-text-medium flex justify-between">
              <span>Symptom:</span>
              <span className="font-medium text-text-dark">{symptomDetails.symptom}</span>
            </p>
            <p className="text-sm text-text-medium flex justify-between">
              <span>Severity:</span>
              <span className="font-medium text-text-dark">{symptomDetails.severity}</span>
            </p>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="log-card-base">
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className={`log-icon-container ${log.iconBg}`}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={`${log.iconColor}`}>
                <path d={log.iconPath} fill="currentColor"/>
              </svg>
            </div>
            <div>
              <h3 className="text-base font-semibold text-text-dark">{log.type}</h3>
              <p className="text-sm text-text-medium">{log.category}</p>
            </div>
          </div>
          <span className="text-xs text-text-medium">{log.timeAgo}</span>
        </div>
        <div className="space-y-2 mb-4">
          {renderDetails()}
        </div>
      </div>
      <div className="flex justify-between items-center pt-4 border-t border-border-light">
        <span className={`log-status-tag ${log.bgColor} ${log.statusColor}`}>
          {log.status}
        </span>
        <div className="flex space-x-2">
          <button className="text-gray-icon hover:text-text-medium transition-colors">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-4 h-4">
              <path d="M17 3C17.2652 2.73478 17.5826 2.52651 17.9381 2.38664C18.2935 2.24676 18.6787 2.17725 19.0679 2.18025C19.4571 2.18325 19.8413 2.25877 20.1955 2.40394C20.5497 2.54911 20.8703 2.76173 21.1464 3.03787C21.4225 3.31401 21.6351 3.63462 21.7803 3.98881C21.9255 4.343 22.001 4.72721 22.004 5.1164C22.007 5.50559 21.9375 5.89074 21.7976 6.2462C21.6578 6.60166 21.4495 6.91905 21.1843 7.18431L12.0001 16.3684L7.63608 16.3684L7.63608 12.0043L16.8169 2.82353C17.0822 2.55827 17.2652 2.37527 17.5 2.18431ZM17 3L7 13V17H11L21 7L17 3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <button className="text-gray-icon hover:text-text-medium transition-colors">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-4 h-4">
              <path d="M3 6H5H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M19 6V20C19 20.5304 18.7893 21.0391 18.4142 21.4142C18.0391 21.7893 17.5304 22 17 22H7C6.46957 22 5.96086 21.7893 5.58579 21.4142C5.21071 21.0391 5 20.5304 5 20V6M8 6V4C8 3.46957 8.21071 2.96086 8.58579 2.58579C8.96086 2.21071 9.46957 2 10 2H14C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M10 11V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M14 11V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default HealthLogCard; 