import { default as axios } from "axios";

import { API_URL } from "../../config/config";

export const imageService = {
  upload: async (files) => {
    var formData = new FormData();
    formData.append("image", files[0]);
    const response = await axios.post(`${API_URL}/image/uploads`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    if (response.status === 200) {
      return response.data;
    }
  },
  delete: async (path) => {
    const response = await axios.post(`${API_URL}/image/delete`, { path }, {});

    if (response.status === 200) {
      return response.data;
    }
  },
};
