import React from "react";
import { Link } from "react-router-dom";
import CategoryList from "./categories/CategoryList";

const Categories = () => {
  return (
    <div>
      <h1>Categories</h1>ur categories <CategoryList />
      <Link
        to="/categories/new"
        className="btn-floating btn-large waves-effect waves-light red right top"
      >
        <i className="material-icons">add</i>
      </Link>
    </div>
  );
};

export default Categories;
