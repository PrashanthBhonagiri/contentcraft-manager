import { useState, useEffect } from 'react';

export const useFormData = (initialData = {}) => {
  const [formData, setFormData] = useState(initialData);
  const [isDirty, setIsDirty] = useState(false);

  useEffect(() => {
    const savedData = localStorage.getItem('componentFormData');
    if (savedData) {
      setFormData(JSON.parse(savedData));
    }
  }, []);

  const updateFormData = (data) => {
    setFormData(data);
    setIsDirty(true);
    localStorage.setItem('componentFormData', JSON.stringify(data));
  };

  const clearFormData = () => {
    setFormData(initialData);
    setIsDirty(false);
    localStorage.removeItem('componentFormData');
  };

  return {
    formData,
    updateFormData,
    clearFormData,
    isDirty
  };
};
