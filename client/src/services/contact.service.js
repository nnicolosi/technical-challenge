import axios from 'axios';

export const getAllContacts = () => {
  return axios.get('http://localhost:3001/contact');
};

export const createContact = (contact) => {
  return axios.post('http://localhost:3001/contact', contact);
};
