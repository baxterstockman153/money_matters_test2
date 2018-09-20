import React from "react";
import CategoryForm from "./CategoryForm";
import { reduxForm } from "redux-form";

const CategoryNew = () => {
  return (
    <div>
      <CategoryForm />
    </div>
  );
};

export default reduxForm({
  form: "categoryForm"
})(CategoryNew);
