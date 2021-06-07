import axios from "axios";

const API_URL = "http://localhost:8000/api/";

class ImageService {
  uploadImage(image, token) {
    let formData = new FormData();

    //Adding files to the formdata
    formData.append("image", image);
    console.log(formData);

    return axios.post(API_URL + "images/org", formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
}

export default new ImageService();
