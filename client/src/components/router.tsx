import React from "react";
import {
  BrowserRouter as
  Router,
  Route,
} from "react-router-dom";
import LoginComponent from "./auth/login";
import SignupComponent from "./auth/signup";
import Header from "./common/header";
import Messages from "./user/messages";
import MessageView from "./user/messageView";

const Home = () => <h2>Home</h2>;

class RootRouter extends React.Component {
  public render() {
    return (
      <Router>
        <div>
        <Header />
          <Route path="/" exact={true} component={Home} />
          <Route path="/message/:id" component={MessageView}/>
          <Route path="/messages" component={Messages}/>
          <Route path="/login" component={LoginComponent} />
          <Route path="/signup" component={SignupComponent} />
        </div>
      </Router>
    );
  }
}

export default RootRouter;
