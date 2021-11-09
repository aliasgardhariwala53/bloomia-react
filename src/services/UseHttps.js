import { BaseUrl } from "./Network.js";
// import Swal from 'sweetalert2/dist/sweetalert2.js'
import Swal from "sweetalert2";
const axios = require("axios");
// For Post Api Calls And Put
export const HttpCall = async (method, type, body) => {
  return new Promise(async function (resolve, reject) {
    const url = BaseUrl + method;
      axios({
        method: type,
        url: url,
        data: body,
      })
      .then((response) => {
        if (response.status === 200 ) {
          if (!(response.config.method==="get")) {
           
            Swal.fire({
              position: "center",
              type: "error",
              title: response.data.message,
            });
          }
         
          return resolve(response);
        }
        return resolve(response);
      })
      .catch((err) => {
        
        return reject(err);
      });
  });
};
axios.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem("token");
    Object.assign(config.headers, {
      "Content-type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + token,
    });
    console.log(config);
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// Add a response interceptor
axios.interceptors.response.use(
  function (response) {
    console.log("INTERCEPTORS response", response.data.token);

    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);

// For Get Api Calls
// export const HttpCallGet = async (method,token) => {

//   return new Promise(async function (resolve, reject) {

//     const url = BaseUrl + method;
//     console.log(url);
//     axios
//       .get(url, {
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: "Bearer " + token,
//         },
//       })
//       .then((response) => {
//         if (response.status === 304) {
//           return resolve(response);
//         }
//         return resolve(response);
//       })
//       .catch((err) => {
//         return reject(err);
//       });
//   });
// };

// export const HttpCallPost = async (method, body) => {
//   return new Promise(async function (resolve, reject) {
//     // const url = BaseUrl + method;
//    api.post(method,body)
//       .then((response) => {
//         if (response.status === 200) {
//           Swal.fire({
//             position: "center",
//             type: "error",
//             title: response.data.message,
//           });
//           return resolve(response);
//         }
//         return resolve(response);
//       })
//       .catch((err) => {
//         return reject(err);
//       });
//   });
// };

// export const HttpCallGet = async (method) => {

//   return new Promise(async function (resolve, reject) {

//     api
//     .get(method)
//       .then((response) => {
//           // console.log("helllo this is new responseeeeeeeeeeeeee",response);
//           if (response.status === 304) {
//           return resolve(response);
//         }
//         return resolve(response);
//       })
//       .catch((err) => {
//         return reject(err);
//       });
//   });
// };

//for delete

//For Api Error Handling Globaly
export const handleError = (error) => {
  if (error.response.status === 403) {
    localStorage.clear();
    return Swal.fire({
      position: "center",
      type: "error",
      title: "Invalid User",
    }).then((ok) => {
      window.location.assign("/");
    });
  } else if (error.response.status === 404) {
    Swal.fire({
      position: "center",
      type: "error",
      title: error.data.message,
    });
  } else if (error.response.status === 500) {
    Swal.fire({
      position: "center",
      type: "error",
      title: error.data.message,
    });
  } else if (error.response.status === 400) {
    Swal.fire({
      position: "center",
      type: "error",
      title: error.data.message,
    });
  } else if (error.response.status === 401) {
    Swal.fire({
      position: "center",
      type: "error",
      title: error.data.message,
    });
  }
};
//for delete
