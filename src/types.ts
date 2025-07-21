export interface UserInfo {
    name: string;
  }
  
  export interface SymptomAssessmentData {
    symptoms: string;
    painLevel: string;
    duration: string;
  }
  
  export interface HealthRecommendation {
    immediate: string[];
    seekCareWarning: string;
  }
  
  export interface BloodPressureDetails {
    systolic: string;
    diastolic: string;
  }
  
  export interface WeightDetails {
    current: string;
    change: string;
  }
  
  export interface MedicationDetails {
    medication: string;
    dosage: string;
  }
  
  export interface TemperatureDetails {
    reading: string;
    method: string;
  }
  
  export interface ExerciseDetails {
    activity: string;
    duration: string;
  }
  
  export interface SymptomDetails {
    symptom: string;
    severity: string;
  }
  
  // Union type for log details
  export type HealthLogDetails =
    | BloodPressureDetails
    | WeightDetails
    | MedicationDetails
    | TemperatureDetails
    | ExerciseDetails
    | SymptomDetails;
  
  export interface HealthLog {
    id: number;
    type: 'Blood Pressure' | 'Weight' | 'Medication' | 'Temperature' | 'Exercise' | 'Symptoms';
    category: 'Vitals' | 'Treatment' | 'Activity' | 'Health Alert';
    timeAgo: string;
    details: HealthLogDetails;
    status: string;
    statusColor: string;
    bgColor: string;
    iconBg: string;
    iconColor: string;
    iconPath: string; // SVG path string
  }
  
  export interface HealthOverview {
    score: string;
    sleepQuality: number;
    hydration: number;
    activityLevel: number;
  }
  
  export interface DailyHealthTip {
    id: number;
    title: string;
    description: string;
  }
  
  export interface AppData {
    userInfo: UserInfo;
    symptomAssessment: SymptomAssessmentData;
    healthRecommendations: HealthRecommendation;
    healthLogs: HealthLog[];
    healthOverview: HealthOverview;
    dailyHealthTips: DailyHealthTip[];
  } 