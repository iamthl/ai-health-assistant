import { useState, useCallback } from 'react';
import { SymptomAssessmentData, HealthRecommendation } from '../types'; 

const useAIAnalysis = (symptomData: SymptomAssessmentData, updateRecommendations: (recommendations: HealthRecommendation) => void) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const getAIAnalysis = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    const prompt = `Analyze the following symptoms: ${symptomData.symptoms}. Pain level: ${symptomData.painLevel}. Duration: ${symptomData.duration}. Provide immediate recommendations and when to seek care. Format your response with "Immediate Recommendations:" followed by bullet points, then "When to Seek Care:" followed by a sentence.`;

    let chatHistory = [];
    chatHistory.push({ role: "user", parts: [{ text: prompt }] });
    const payload = { contents: chatHistory };
    const apiKey = "AIzaSyCc6kbJGgr4roxTti0WKCcEihb8nmI7pdM"; // Using Vite's environment variable import
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const result = await response.json();

      if (result.candidates && result.candidates.length > 0 &&
          result.candidates[0].content && result.candidates[0].content.parts &&
          result.candidates[0].content.parts.length > 0) {
        const aiResponseText: string = result.candidates[0].content.parts[0].text;

        // Simple parsing of the AI response based on the prompt format
        const immediateMatch = aiResponseText.match(/Immediate Recommendations:\s*([\s\S]*?)(?=When to Seek Care:|$)/);
        const seekCareMatch = aiResponseText.match(/When to Seek Care:\s*([\s\S]*)/);

        const immediateRecs: string[] = immediateMatch ? immediateMatch[1].split('\n').filter(line => line.trim().startsWith('•')).map(line => line.trim().substring(1).trim()) : ["AI analysis complete. Consider general wellness practices."];
        const seekCareMsg: string = seekCareMatch ? seekCareMatch[1].trim() : "Consult a healthcare provider if symptoms persist or worsen.";

        updateRecommendations({
          immediate: immediateRecs,
          seekCareWarning: seekCareMsg
        });

      } else {
        console.error("AI response structure unexpected:", result);
        setError("Could not get AI analysis. Please try again.");
        updateRecommendations({
          immediate: ["Could not get AI analysis. Please try again."],
          seekCareWarning: "If symptoms persist, please consult a medical professional."
        });
      }
    } catch (err) {
      console.error("Error fetching AI analysis:", err);
      setError("Failed to get AI analysis due to network error.");
      updateRecommendations({
        immediate: ["Failed to get AI analysis due to network error."],
        seekCareWarning: "If symptoms persist, please consult a medical professional."
      });
    } finally {
      setIsLoading(false);
    }
  }, [symptomData, updateRecommendations]);

  return [getAIAnalysis, isLoading, error] as const;
};

export default useAIAnalysis; 