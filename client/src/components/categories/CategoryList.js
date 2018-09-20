import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchCategories } from "../../actions";

class CategoryList extends Component {
  componentDidMount() {
    this.props.fetchCategories();
  }
  renderCategories() {
    return this.props.categories.map((category, idx) => {
      return (
        <div className="card blue-grey darken-1" key={idx}>
          <div className="card-content white-text">
            <span className="card-title">{category.name}</span>
            <p>Placeholder for a picture</p>
          </div>
          <div className="card-action">placeholder for value</div>
        </div>
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
