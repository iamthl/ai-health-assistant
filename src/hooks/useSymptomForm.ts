import { useState, useCallback } from 'react';
import { SymptomAssessmentData } from '../types'; 

const useSymptomForm = (initialState: SymptomAssessmentData, updateParentData: (data: SymptomAssessmentData) => void) => {
  const [symptomForm, setSymptomForm] = useState<SymptomAssessmentData>(initialState);

  const handleSymptomChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setSymptomForm(prevForm => {
      const newForm = { ...prevForm, [name]: value };
      updateParentData(newForm); 
      return newForm;
    });
  }, [updateParentData]);

  return [symptomForm, handleSymptomChange] as const; 
};

export default useSymptomForm; 