import { BaseUrl } from "./Network.js";
// import Swal from 'sweetalert2/dist/sweetalert2.js'
import Swal from 'sweetalert2'

const token = localStorage.getItem("token")
const axios = require("axios");

// For Post Api Calls And Put
export const HttpCallPost = async (method, type, body) => {
  return new Promise(async function (resolve, reject) {
    const url = BaseUrl + method;

    axios({
      method: type,
      url: url,
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
        Authorization: "Bearer " + token,
      },

      data: body,
    })
      .then((response) => {
        if (response.status === 200) {
          Swal.fire({
            position: "center",
            type: "error",
            title: response.data.message,
          });
          return resolve(response);
        }
        return resolve(response);
      })
      .catch((err) => {
        return reject(err);
      });
  });
};

//For Get Api Calls
export const HttpCallGet = async (method,token) => {
  
  return new Promise(async function (resolve, reject) {
    

    const url = BaseUrl + method;
    console.log(url);
    axios
      .get(url, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        if (response.status === 304) {
          return resolve(response);
        }
        return resolve(response);
      })
      .catch((err) => {
        return reject(err);
      });
  });
};

//for delete

//For Api Error Handling Globaly
export const handleError = (errResponse) => {
  if (errResponse.status === 403) {
    localStorage.clear();
    return Swal.fire({
      position: "center",
      type: "error",
      title: "Invalid User",
    }).then((ok) => {
      window.location.assign("/");
    });
  } else if (errResponse.status === 404) {
    Swal.fire({
      position: "center",
      type: "error",
      title: errResponse.data.message,
    });
  } else if (errResponse.status === 500) {
    Swal.fire({
      position: "center",
      type: "error",
      title: errResponse.data.message,
    });
  } else if (errResponse.status === 400) {
    Swal.fire({
      position: "center",
      type: "error",
      title: errResponse.data.message,
    });
  } else if (errResponse.status === 401) {
    Swal.fire({
      position: "center",
      type: "error",
      title:errResponse.data.message,
    });
  }
};
//for delete

export const HttpCallImgPost = async (method, type, body) => {
  return new Promise(async function (resolve, reject) {
   
    const url = BaseUrl + method;
    axios({
      method: type,
      url: url,
      headers: {
        "content-type": "multipart/form-data",
        Authorization: "Bearer " + token,
      },
      data: body,
    })
      .then((response) => {
        
        return resolve(response);
      })
      .catch((err) => {
        return reject(err);
      });
  });
};
