import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import LoanRequests from "./LoanRequests";
import LoanOffers from "./LoanOffers";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/loan-requests" component={LoanRequests} />
        <Route path="/loan-offers" component={LoanOffers} />
      </Switch>
    </Router>
  );
};

export default App;
