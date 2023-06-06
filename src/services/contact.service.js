import { _axios, handleError } from "./axios.service";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getCommonHeaderOptions } from "./utils.service";

const getContacts = async (starred = false) => {
  try {
    const axiosOptions = getCommonHeaderOptions({}, true);
    const response = await _axios.get(
      `contacts?starred=${starred}`,
      axiosOptions
    );
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

const addContact = async (body = {}) => {
  try {
    const axiosOptions = getCommonHeaderOptions({}, true);
    const response = await _axios.post("contacts", body, axiosOptions);
    toast.success("Contact Created Successfully!");
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

const getContact = async (contactId) => {
  try {
    const axiosOptions = getCommonHeaderOptions({}, true);
    const response = await _axios.get(`contacts/${contactId}`, axiosOptions);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

const updateContact = async (contactId, body = {}) => {
  try {
    const axiosOptions = getCommonHeaderOptions({}, true);
    const response = await _axios.patch(
      `contacts/${contactId}`,
      body,
      axiosOptions
    );
    toast.success("Contact Updated Successfully!");
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

const updateContactStarred = async (contactId, body = {}) => {
  try {
    const axiosOptions = getCommonHeaderOptions({}, true);
    const response = await _axios.patch(
      `contacts/${contactId}/star`,
      body,
      axiosOptions
    );
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

const deleteContact = async (contactId) => {
  try {
    const axiosOptions = getCommonHeaderOptions({}, true);
    const response = await _axios.delete(`contacts/${contactId}`, axiosOptions);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export {
  getContacts,
  addContact,
  getContact,
  updateContact,
  deleteContact,
  updateContactStarred,
};
