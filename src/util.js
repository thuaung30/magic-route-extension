import { isEmpty } from "lodash";
import CryptoJS from "crypto-js";

export const encrypt = (secret) => {
  return CryptoJS.AES.encrypt(secret, process.env.REACT_APP_SECRET).toString();
};

export const decrypt = (secret) => {
  return CryptoJS.AES.decrypt(secret, process.env.REACT_APP_SECRET).toString(
    CryptoJS.enc.Utf8
  );
};

export const setLocalStorage = (key, value, encrypted = false) => {
  localStorage.setItem(key, encrypted ? encrypt(value) : value);
};

export const getLocalStorage = (key, decrypted = false) => {
  if (decrypted) {
    const value = localStorage.getItem(key);
    return value ? decrypt(value) : null;
  }
  return localStorage.getItem(key);
};

/**
 *@description check if the obj contains in list or not
 *@param brandName, list
 *@return boolean
 */
export const containsCartItem = (brandName, list) => {
  if (isEmpty(list)) {
    return false;
  } else {
    for (let i = 0; i < list.length; i++) {
      if (list[i].brandName === brandName) return true;
    }
  }
  return false;
};

/**
 * @description convert the UTC date & time to local date & time if convert
 * @param dateObj, convert
 * @returns string
 */
export const convertDate = (dateObj, convert) => {
  let date = new Date(dateObj);
  if (convert) {
    date.setHours(date.getHours() + 6);
    date.setMinutes(date.getMinutes() + 30);
  }
  let minutes = date.getMinutes();
  return `${date.getDate()}/${
    date.getMonth() + 1
  }/${date.getFullYear()}, ${date.getHours()}:${
    minutes < 10 ? "0" + minutes.toString() : minutes
  }`;
};
