import axios from 'axios';
const BASE_URL = 'http://localhost:8080';

export const getSweets = () => axios.get(`${BASE_URL}/sweets`);
export const addSweet = (data) => axios.post(`${BASE_URL}/sweets`, data);
export const deleteSweet = (id) => axios.delete(`${BASE_URL}/sweets/${id}`);
export const purchaseSweet = (data) => axios.post(`${BASE_URL}/sweets/purchase`, data);
export const restockSweet = (data) => axios.post(`${BASE_URL}/sweets/restock`, data);
export const searchSweets = (name) => axios.get(`${BASE_URL}/sweets/search?name=${name}`);
export const sortSweets = (by, order) => axios.get(`${BASE_URL}/sweets/sort?by=${by}&order=${order}`);
