import axios from 'axios';

export const getAllContacts = () => {
  return axios.get('http://localhost:3001/contact');
};

export const createContact = (contact) => {
  return axios.post('http://localhost:3001/contact', contact);
};

// Here we add delete contact to the services.
export const deleteContact = (id) => {
  return axios.delete(`http://localhost:3001/contact/${id}`)
}

export const editContact = (contact) => {
  console.log('what')
  return axios.put('http://localhost:3001/contact', contact)
}