// src/services/api.js
import axios from 'axios';

const API_URL = 'https://form-web-application.onrender.com/api/forms'; 

export const getForms = () => axios.get(API_URL);
export const getForm = (id) => axios.get(`${API_URL}/${id}`);
export const createForm = (formData) => axios.post(API_URL, formData);
export const updateForm = (id, formData) => axios.put(`${API_URL}/${id}`, formData);
export const deleteForm = (id) => axios.delete(`${API_URL}/${id}`);
