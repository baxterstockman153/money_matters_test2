import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchCategory } from "../../actions";

class CategoryDetail extends Component {
  componentDidMount() {
    this.props.fetchCategory(this.props.match.params.id);
  }

  renderCategoryTitle() {
    return <h1>{this.props.category.name}</h1>;
  }

  render() {
    console.log(this.props.category);
    return (
      <div>
        CategoryDetail {this.props.match.params.id} {this.props.category.title}
        {this.renderCategoryTitle()}
      </div>
    );
  }
}

function mapStatetoProps({ category }) {
  return { category };
}

export default connect(
  mapStatetoProps,
  { fetchCategory }
)(CategoryDetail);
