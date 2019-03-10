import axios from "axios";
import * as actions from "./types";

export const fetchUser = () => async dispatch => {
  const res = await axios.get("/api/current_user");
  dispatch({ type: actions.FETCH_USER, payload: res.data });
};

export const createCategory = (values, history) => async dispatch => {
  history.push("/categories");
  const res = await axios.post("/api/categories", values);
  dispatch({ type: actions.CREATE_CATEGORY, payload: res.data });
};

export const fetchCategories = () => async dispatch => {
  const res = await axios.get("/api/categories");
  dispatch({ type: actions.FETCH_CATEGORIES, payload: res.data });
};

export const fetchCategory = (categoryId) => async dispatch => {
  const res = await axios.get(`/api/categories/${categoryId}`);
  dispatch({ type: actions.FETCH_CATEGORY, payload: res.data });
};
