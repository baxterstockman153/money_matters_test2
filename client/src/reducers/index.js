import { combineReducers } from "redux";
import { reducer as reduxForm } from "redux-form";
import categoriesReducer from "./categoriesReducer";
import categoryReducer from "./categoryReducer";
import authReducer from "./authReducer";

export default combineReducers({
  auth: authReducer,
  form: reduxForm,
  categories: categoriesReducer,
  category:categoryReducer
});
