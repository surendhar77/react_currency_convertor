import axios from "axios";

// https://v6.exchangerate-api.com/v6/a63eb67899faa3965fa6bd2d/latest/USD

const api = axios.create({
    baseURL:"https://v6.exchangerate-api.com/v6/a63eb67899faa3965fa6bd2d"
});

// we need to crate a  get request
export const currencyConverter = (fromCurrency, toCurrency, amount) => {
  return api.get(`/pair/${fromCurrency}/${toCurrency}/${amount}`);
};