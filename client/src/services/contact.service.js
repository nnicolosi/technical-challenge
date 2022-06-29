import axios from 'axios';

// converts `contact.emailAddress` to null if it's an empty string. This prevents
// an error from being thrown in the backend when the optional email field is empty.
const setEmailToNullIfEmpty = (contact) => {
  if (!contact.emailAddress) {
    contact.emailAddress = null
  };
  return contact;
};

export const getAllContacts = () => {
  return axios.get('http://localhost:3001/contact');
};

export const createContact = (contact) => {
  const safeContact = setEmailToNullIfEmpty(contact)
  return axios.post('http://localhost:3001/contact', safeContact);
};

export const updateContact = (contact) => {
  const safeContact = setEmailToNullIfEmpty(contact)
  return axios.put('http://localhost:3001/contact', safeContact);
};

export const deleteContact = (contact) => {
  return axios.post('http://localhost:3001/contact/delete', contact);
}

export const getContactsForCallList = () => {
  return axios.get('http://localhost:3001/call-list')
}
