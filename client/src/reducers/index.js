import { combineReducers } from "redux";
import { reducer as reduxForm } from "redux-form";
import categoriesReducer from "./categoriesReducer";
import authReducer from "./authReducer";

export default combineReducers({
  auth: authReducer,
  form: reduxForm,
  categories: categoriesReducer
});
