import axios from 'axios';

export const getAllContacts = () => {
  return axios.get('http://localhost:3001/contact');
};

export const createContact = (contact) => {
  return axios.post('http://localhost:3001/contact', contact);
};

export const updateContact = (contact) => {
  return axios.put('http://localhost:3001/contact', contact);
};

export const deleteContact = (contact) => {
  return axios.delete('http://localhost:3001/contact', contact);
};
