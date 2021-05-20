// import axios from "axios";

// const API_URL = "http://localhost:8000/api/";

// class AuthService {
//   login(email, password) {
//     return axios
//       .post(API_URL + "auth/login", {
//         email,
//         password
//       })
//       .then(response => {
//         console.log(response.data.authToken)
//         if (response.data.authToken) {
//           localStorage.setItem("user", JSON.stringify(response.data));
//         }

//         return response.data;
//       });
//   }

//   logout() {
//     localStorage.removeItem("user");
//   }

//   register(firstName, lastName, email, password) {
//     return axios.post(API_URL + "users/register", {
//       firstName,
//       lastName,
//       email,
//       password
//     });
//   }

//   getCurrentUser() {
//     return JSON.parse(localStorage.getItem('user'));;
//   }
// }

// export default new AuthService();
