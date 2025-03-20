import axios from 'axios';

const API_BASE_URL = `${process.env.NODE_ENV==='development' ? process.env.REACT_APP_API_BASE_LOCAL_URL : process.env.REACT_APP_API_BASE_URL}/api`;

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    // Add any auth headers here
  }
});

// Request interceptor for API calls
// apiClient.interceptors.request.use(
//     config => {
//       const token = localStorage.getItem('authToken');
//       if (token) {
//         config.headers.Authorization = `Bearer ${token}`;
//       }
//       return config;
//     },
//     error => {
//       return Promise.reject(error);
//     }
// );

// Response interceptor for API calls
// apiClient.interceptors.response.use(
//     response => response,
//     error => {
//       const { response } = error;
//       if (response && response.status === 401) {
//         // Handle unauthorized access
//         localStorage.removeItem('authToken');
//         window.location.href = '/login';
//       }
//       return Promise.reject(error);
//     }
// );

export const ComponentService = {
    // Get all components
    getAllComponents: async () => {
      const response = await apiClient.get('/components');
      return response.data;
    },
  
    // Get components by status
    getComponentsByStatus: async (status) => {
      const response = await apiClient.get(`/components?status=${status}`);
      return response.data;
    },
  
    // Get single component
    getComponent: async (id) => {
      const response = await apiClient.get(`/components/${id}`);
      return response.data;
    },
  
    // Create component
    createComponent: async (componentData) => {
      // Handle file uploads first if any
    //   const formData = new FormData();
      
    //   if (componentData.featuredImage) {
    //     formData.append('featuredImage', componentData.featuredImage);
    //   }
      
    //   if (componentData.attachments && componentData.attachments.length > 0) {
    //     componentData.attachments.forEach(file => {
    //       formData.append('attachments', file);
    //     });
    //   }
  
    //   // Append other data
    //   formData.append('data', JSON.stringify({
    //     title: componentData.title,
    //     type: componentData.type,
    //     content: componentData.content,
    //     status: componentData.status || 'draft',
    //     metadata: {
    //       excerpt: componentData.excerpt
    //     }
    //   }));
    //   console.log("call to backedn for create component with data ");
    //   console.log(formData['data']);

      
    //   const response = await apiClient.post('/components', formData, {
    //     headers: {
    //       'Content-Type': 'multipart/form-data'
    //     }
    //   });
    //   return response.data;

        try {
            console.log('Sending component data:', componentData);

            // const payload = {
            //     title: componentData.title,
            //     type: componentData.type,
            //     content: componentData.content,
            //     status: componentData.status || 'draft',
            // };

            const response = await apiClient.post('/components', componentData);
            console.log("response.data = " + response.data);
            return response.data;
        } catch (error) {
            console.error('Error creating component:', error);
            throw error;
        }
    },
  
    // Update component
    updateComponent: async (id, componentData) => {
      const response = await apiClient.put(`/components/${id}`, componentData);
      return response.data;
    },
  
    // Update component status
    updateComponentStatus: async (id, status) => {
      const response = await apiClient.put(`/components/${id}/status`, { status });
      return response.data;
    },
  
    // Delete component
    deleteComponent: async (id) => {
      const response = await apiClient.delete(`/components/${id}`);
      return response.data;
    },

    // Save file reference to backend
    saveFileReference: async ({ type, fileData }) => {
      console.log("In saveFileReference  " +  type);
      console.log("fileData " + fileData);
      
      try {
        const response = await apiClient.post('/components/files', {
          type,
          fileData
        });
        return response.data;
      } catch (error) {
        console.error('Error saving file reference:', error);
        throw error;
      }
    },
  };