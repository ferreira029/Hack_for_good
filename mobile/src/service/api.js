import axios from 'axios';

const api = axios.create({
  /* baseURL: "https://validationdata.herokuapp.com:3333/", */
  baseURL: "http://192.168.0.26:3333",
});

export default api;
