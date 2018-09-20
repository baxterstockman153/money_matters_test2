import axios from "axios";
import { FETCH_USER, CREATE_CATEGORY, FETCH_CATEGORIES } from "./types";

export const fetchUser = () => async dispatch => {
  const res = await axios.get("/api/current_user");
  dispatch({ type: FETCH_USER, payload: res.data });
};

export const createCategory = (values, history) => async dispatch => {
  history.push("/categories");
  const res = await axios.post("/api/categories", values);
  dispatch({ type: CREATE_CATEGORY, payload: res.data });
};

export const fetchCategories = () => async dispatch => {
  const res = await axios.get("/api/categories");
  console.log(res.data);
  dispatch({ type: FETCH_CATEGORIES, payload: res.data });
};
