import axios from "axios";

const API_URL = "http://localhost:8000/api/";

class ImageService {
  // type is for "org" or "project"
  uploadImage(image, token, endpoint) {
    // make form data object so file type is multipart/form-data
    let formData = new FormData();

    //Adding files to the formdata
    formData.append("image", image);
    console.log(formData);

    return axios.post(API_URL + "images/" + endpoint, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
}

export default new ImageService();
