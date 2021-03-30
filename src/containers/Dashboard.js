import React, { Component } from "react";
import AuthService from "../services/auth";
import DashboardNav from "../components/DashboardNav";

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: AuthService.getCurrentUser(),
    };
  }

  render() {
    const { currentUser } = this.state;

    return (
      <>
        <DashboardNav />

        <div className="container">
          <p>
            <strong>Token:</strong> {currentUser.authToken.substring(0, 20)} ...{" "}
            {currentUser.authToken.substr(currentUser.authToken.length - 20)}
          </p>
        </div>
      </>
    );
  }
}

export default Dashboard;
