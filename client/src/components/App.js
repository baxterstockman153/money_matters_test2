import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../actions";

import Header from "./Header";
import Landing from "./Landing";
import Categories from "./Categories";
import CategoryNew from "./categories/CategoryNew";
import CategoryDetail from "./categories/CategoryDetail"


class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    return (
      <BrowserRouter>
        <div className="container">
          <Header />
          <Route exact path="/" component={Landing} />
          <Route exact path="/categories" component={Categories} />
          <Route exact path="/categories/new" component={CategoryNew} />
          <Route exact path="/categories/:id" component={CategoryDetail} />
        </div>
      </BrowserRouter>
    );
  }
}
export default connect(
  null,
  actions
)(App);
