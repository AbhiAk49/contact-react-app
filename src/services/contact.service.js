import _axios from "./axios.service";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const handleError = (error) => {
  console.error('axios service error',error);
  if (error.response && error.response.data && error.response.data.message) {
    toast(error.response.data.message, { autoClose: 3000, type: "error" });
  } else {
    toast.error("Something went wrong");
  }
};
const getContacts = async (starred = false) => {
  try {
    const response = await _axios.get(`contacts?starred=${starred}`);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

const addContact = async (body = false) => {
  try {
    const response = await _axios.post("contacts", body);
    //console.log(response);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

const getContact = async (contactId) => {
  try {
    const response = await _axios.get(`contacts/${contactId}`);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

const updateContact = async (contactId, body = {}) => {
  try {
    const response = await _axios.patch(`contacts/${contactId}`, body);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

const deleteContact = async (contactId) => {
  try {
    const response = await _axios.delete(`contacts/${contactId}`);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export { getContacts, addContact, getContact, updateContact, deleteContact };
