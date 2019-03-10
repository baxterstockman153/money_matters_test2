import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import map from "lodash/map";

import { fetchCategories } from "../../actions";

class CategoryList extends Component {
  componentDidMount() {
    this.props.fetchCategories();
  }
  renderCategories() {
    const { categories } = this.props;
    return map(categories, category => {
      return (
        <Link to={`/categories/${category._id}`} key={category._id}>
          <div className="card blue-grey darken-1">
            <div className="card-content white-text">
              <span className="card-title">{category.name}</span>
              <p>Placeholder for a picture</p>
            </div>
            <div className="card-action">placeholder for value</div>
          </div>
        </Link>
      );
    });
  }
  render() {
    return <div>{this.renderCategories()}</div>;
  }
}

function mapStatetoProps({ categories }) {
  return { categories };
}

export default connect(
  mapStatetoProps,
  { fetchCategories }
)(CategoryList);
