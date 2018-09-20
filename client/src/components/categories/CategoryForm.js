import _ from "lodash";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { reduxForm, Field } from "redux-form";
import CategoryField from "./CategoryField";
import { createCategory } from "../../actions/index";
import { withRouter } from "react-router-dom";
import formFields from "./formFields";

class CategoryForm extends Component {
  renderFields() {
    return _.map(formFields, ({ label, name }) => {
      return (
        <Field
          component={CategoryField}
          type="text"
          label={label}
          name={name}
          key={name}
        />
      );
    });
  }
  render() {
    const { history } = this.props;
    return (
      <div>
        <form
          onSubmit={this.props.handleSubmit(values =>
            this.props.createCategory(values, history)
          )}
        >
          {this.renderFields()}
          <Link to="/categories" className="red btn-flat white-text">
            cancel
          </Link>
          <button type="submit" className="teal btn-flat right white-text">
            Create Category
            <i className="material-icons right">done</i>
          </button>
        </form>
      </div>
    );
  }
}

function validate(values) {
  const errors = {};
  _.each(formFields, ({ name, noValueError }) => {
    if (!values[name]) {
      errors[name] = noValueError;
    }
  });

  return errors;
}

function mapStatetoProps(state) {
  return {
    state
  };
}

const mapActiontoProps = {
  createCategory
};

CategoryForm = connect(
  mapStatetoProps,
  mapActiontoProps
)(CategoryForm);

export default reduxForm({
  validate,
  form: "categoryForm"
})(withRouter(CategoryForm));
