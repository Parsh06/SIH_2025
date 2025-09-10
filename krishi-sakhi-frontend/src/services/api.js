// Base API configuration
const API_BASE_URL = 'http://localhost:5000/api';

// Get auth token from Firebase
const getAuthToken = async () => {
  const { getAuth } = await import('firebase/auth');
  const auth = getAuth();
  const user = auth.currentUser;
  if (user) {
    return await user.getIdToken();
  }
  return null;
};

// Generic API request function
const apiRequest = async (endpoint, options = {}) => {
  const token = await getAuthToken();
  
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
};

// Generic HTTP methods
export const api = {
  // GET request
  get: (endpoint, options = {}) => 
    apiRequest(endpoint, { method: 'GET', ...options }),

  // POST request
  post: (endpoint, data, options = {}) =>
    apiRequest(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
      ...options,
    }),

  // PUT request
  put: (endpoint, data, options = {}) =>
    apiRequest(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
      ...options,
    }),

  // DELETE request
  delete: (endpoint, options = {}) =>
    apiRequest(endpoint, { method: 'DELETE', ...options }),
};

// Farmer API endpoints
export const farmerAPI = {
  // Get all farmers (admin only)
  getAll: () => api.get('/farmers'),
  
  // Get current farmer profile
  getMe: () => api.get('/farmers/me'),
  
  // Get farmer by ID
  getById: (id) => api.get(`/farmers/${id}`),
  
  // Create farmer profile
  create: (data) => api.post('/farmers', data),
  
  // Update farmer profile
  update: (id, data) => api.put(`/farmers/${id}`, data),
  
  // Delete farmer profile
  delete: (id) => api.delete(`/farmers/${id}`),
  
  // Get farmer full details with farms and reminders
  getFullDetails: (id) => api.get(`/farmers/${id}/full`),
};

// Farm API endpoints
export const farmAPI = {
  // Get all farms
  getAll: () => api.get('/farms'),
  
  // Get farm by ID
  getById: (id) => api.get(`/farms/${id}`),
  
  // Create farm
  create: (data) => api.post('/farms', data),
  
  // Update farm
  update: (id, data) => api.put(`/farms/${id}`, data),
  
  // Delete farm
  delete: (id) => api.delete(`/farms/${id}`),
  
  // Get farms by farmer ID
  getByFarmer: (farmerId) => api.get(`/farms?farmer=${farmerId}`),
};

// Activity API endpoints
export const activityAPI = {
  // Get all activities
  getAll: () => api.get('/activities'),
  
  // Get activity by ID
  getById: (id) => api.get(`/activities/${id}`),
  
  // Create activity
  create: (data) => api.post('/activities', data),
  
  // Update activity
  update: (id, data) => api.put(`/activities/${id}`, data),
  
  // Delete activity
  delete: (id) => api.delete(`/activities/${id}`),
  
  // Get activities by farm ID
  getByFarm: (farmId) => api.get(`/activities?farm=${farmId}`),
};

// Advisory API endpoints
export const advisoryAPI = {
  // Get all advisories
  getAll: () => api.get('/advisories'),
  
  // Get advisory by ID
  getById: (id) => api.get(`/advisories/${id}`),
  
  // Create advisory
  create: (data) => api.post('/advisories', data),
  
  // Update advisory
  update: (id, data) => api.put(`/advisories/${id}`, data),
  
  // Delete advisory
  delete: (id) => api.delete(`/advisories/${id}`),
  
  // Get advisories by farmer ID
  getByFarmer: (farmerId) => api.get(`/advisories?farmer=${farmerId}`),
};

// Reminder API endpoints
export const reminderAPI = {
  // Get all reminders
  getAll: () => api.get('/reminders'),
  
  // Get reminder by ID
  getById: (id) => api.get(`/reminders/${id}`),
  
  // Create reminder
  create: (data) => api.post('/reminders', data),
  
  // Update reminder
  update: (id, data) => api.put(`/reminders/${id}`, data),
  
  // Delete reminder
  delete: (id) => api.delete(`/reminders/${id}`),
  
  // Get reminders by farmer ID
  getByFarmer: (farmerId) => api.get(`/reminders?farmer=${farmerId}`),
};

// Error handling utility
export const handleApiError = (error, defaultMessage = 'An error occurred') => {
  console.error('API Error:', error);
  
  if (error.message) {
    return error.message;
  }
  
  if (error.response?.data?.message) {
    return error.response.data.message;
  }
  
  return defaultMessage;
};

// Health check
export const healthCheck = () => api.get('/');
