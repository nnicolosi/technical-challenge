import axios from 'axios';

export const getAllContacts = () => {
  return axios.get('http://localhost:3001/contact');
};

export const createContact = (contact) => {
  return axios.post('http://localhost:3001/contact', contact);
};

// Delete contact
export const deleteContact = (id) => {
  return axios.delete(`http://localhost:3001/contact/${id}`)
};

// Edit contact
export const editContact = (contact) => {
  return axios.put('http://localhost:3001/contact', contact)
}