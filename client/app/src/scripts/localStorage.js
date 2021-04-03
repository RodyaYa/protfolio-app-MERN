import { USER_DATA_LOCALSTORAGE_NAME } from "../config/config";

const newLocalStorage = {
  getUser: () => {
    return (
      (localStorage.getItem(USER_DATA_LOCALSTORAGE_NAME) &&
        JSON.parse(localStorage.getItem(USER_DATA_LOCALSTORAGE_NAME))) ||
      "unregistered user"
    );
  },
};

export default newLocalStorage;
