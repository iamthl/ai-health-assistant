import { useState, useEffect } from 'react';
import { AppData } from '../types'; // Import the AppData interface

const useHealthData = () => {
  const [data, setData] = useState<AppData>({ // Explicitly type the state
    userInfo: { name: "Sarah" },
    symptomAssessment: { symptoms: "", painLevel: "", duration: "" },
    healthRecommendations: {
      immediate: [],
      seekCareWarning: ""
    },
    healthLogs: [],
    healthOverview: {
      score: "0/10",
      sleepQuality: 0,
      hydration: 0,
      activityLevel: 0
    },
    dailyHealthTips: []
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch data from individual json-server endpoints
        const [
          userInfoRes,
          symptomAssessmentRes,
          healthRecommendationsRes,
          healthLogsRes,
          healthOverviewRes,
          dailyHealthTipsRes
        ] = await Promise.all([
          fetch('http://localhost:3001/userInfo'),
          fetch('http://localhost:3001/symptomAssessment'),
          fetch('http://localhost:3001/healthRecommendations'),
          fetch('http://localhost:3001/healthLogs'),
          fetch('http://localhost:3001/healthOverview'),
          fetch('http://localhost:3001/dailyHealthTips')
        ]);

        // Check if all responses are OK
        if (!userInfoRes.ok || !symptomAssessmentRes.ok || !healthRecommendationsRes.ok ||
            !healthLogsRes.ok || !healthOverviewRes.ok || !dailyHealthTipsRes.ok) {
          throw new Error('One or more API fetches failed with status: ' +
            `${userInfoRes.status} ${symptomAssessmentRes.status} ${healthRecommendationsRes.status} ` +
            `${healthLogsRes.status} ${healthOverviewRes.status} ${dailyHealthTipsRes.status}`);
        }

        // Parse JSON responses
        const userInfo = await userInfoRes.json();
        const symptomAssessment = await symptomAssessmentRes.json();
        const healthRecommendations = await healthRecommendationsRes.json();
        const healthLogs = await healthLogsRes.json();
        const healthOverview = await healthOverviewRes.json();
        const dailyHealthTips = await dailyHealthTipsRes.json();

        // Assemble the AppData object
        const assembledData: AppData = {
          userInfo,
          symptomAssessment,
          healthRecommendations,
          healthLogs,
          healthOverview,
          dailyHealthTips
        };

        setData(assembledData);

      } catch (error) {
        console.error("Failed to fetch health data:", error);
        // Optionally, set some default or error state here to inform the user
        // For example:
        // setData(prevData => ({ ...prevData, userInfo: { name: "Guest" } }));
      }
    };

    fetchData();
  }, []); // Empty dependency array means this effect runs once on mount

  return [data, setData];
};

export default useHealthData; 