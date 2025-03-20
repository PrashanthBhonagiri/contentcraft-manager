import axios from 'axios';

const API_BASEURL = process.env.NODE_ENV==='development' ? process.env.REACT_APP_API_BASE_LOCAL_URL : process.env.REACT_APP_API_BASE_URL;
const API_URL = `${API_BASEURL}/api/content-collections`;

export const ContentCollectionService = {
  getAllCollections: async () => {    
    const response = await axios.get(API_URL);
    return response.data;
  },

  getCollectionById: async (id) => {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  },

  createCollection: async (data) => {
    const response = await axios.post(API_URL, data);
    return response.data;
  },

  updateCollection: async (id, data) => {
    const response = await axios.put(`${API_URL}/${id}`, data);
    return response.data;
  },

  deleteCollection: async (id) => {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  },

  updateComponentOrder: async (id, groups) => {
    const response = await axios.put(`${API_URL}/${id}/components`, { groups });
    return response.data;
  },

  addGroup: async (id, groupData) => {
    const response = await axios.post(`${API_URL}/${id}/groups`, groupData);
    return response.data;
  },

  updateGroup: async (id, groupId, groupData) => {
    const response = await axios.put(`${API_URL}/${id}/groups/${groupId}`, groupData);
    return response.data;
  },

  deleteGroup: async (id, groupId) => {
    const response = await axios.delete(`${API_URL}/${id}/groups/${groupId}`);
    return response.data;
  }
};
