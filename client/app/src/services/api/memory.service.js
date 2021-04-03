import { default as axios } from "axios";

import { buildSearchQuery } from "../../utils/api.helper";
import { API_URL } from "../../config/config";

export const memoryService = {
  getPosts: async (filterObject) => {
    try {
      const filterQuery = buildSearchQuery(filterObject);
      const URL = `${API_URL}/post${filterQuery}`;

      const promise = await axios.get(URL);

      if (promise.status === 200) {
        return promise.data;
      }
    } catch (error) {
      console.log(error);
    }
  },
  getPostById: async (id) => {
    try {
      const URL = `${API_URL}/post/${id}`;

      const promise = await axios.get(URL);

      if (promise.status === 200) {
        return promise.data;
      }
    } catch (error) {
      console.log(error);
    }
  },
  saveDraft: async (draftBody) => {
    try {
      const promise = await axios.post(`${API_URL}/post/draft`, draftBody, {});

      if (promise.status === 200) {
        return promise.data;
      }
    } catch (error) {
      console.log(error);
    }
  },
  createPost: async (postBody) => {
    try {
      const promise = await axios.post(`${API_URL}/post`, { postBody }, {});

      if (promise.status === 200) {
        return promise.data;
      }
    } catch (error) {
      console.log(error);
    }
  },
  search: async (filter) => {
    const promise = axios.get(`${API_URL}/post/search?startWith=${filter}`);
    return promise;
  },
};
