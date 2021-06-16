import axios from "axios";

const API_URL = "http://localhost:8000/api/";

class ImageService {
  // type is for "org" or "project"
<<<<<<< HEAD
  uploadImage(image, token, type) {
=======
  uploadImage(image, token, endpoint) {
>>>>>>> cb5a2c57d99cdcff4f6070f9efe696af0f096de4
    // make form data object so file type is multipart/form-data
    let formData = new FormData();

    //Adding files to the formdata
    formData.append("image", image);
    console.log(formData);

<<<<<<< HEAD
    return axios.post(API_URL + "images/" + type + "/logo", formData, {
=======
    return axios.post(API_URL + "images/" + endpoint, formData, {
>>>>>>> cb5a2c57d99cdcff4f6070f9efe696af0f096de4
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
}

export default new ImageService();
