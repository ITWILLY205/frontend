// API connection test utility
export const testAPIConnection = async () => {
  try {
    const response = await fetch('http://localhost:5000/api/contact', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (response.ok) {
      console.log('API connection successful');
      return true;
    } else {
      console.log('API connection failed:', response.status);
      return false;
    }
  } catch (error) {
    console.error('API connection error:', error);
    return false;
  }
};

export const createFallbackContact = (formData) => {
  // Fallback: Save to localStorage if API fails
  const existingContacts = JSON.parse(localStorage.getItem('fallbackContacts') || '[]');
  const newContact = {
    id: Date.now(),
    ...formData,
    createdAt: new Date().toISOString()
  };
  existingContacts.push(newContact);
  localStorage.setItem('fallbackContacts', JSON.stringify(existingContacts));
  return newContact;
};
