import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import { getCurrentUser } from "../actions/authActions";
import { socket } from "../socket";

class Home extends React.Component<any, any> {
    componentWillMount() {
    }
    render() {
        if (!this.props.user) {
            return <Redirect to="/login" />
        }
        return <div>Home</div>
    }
}

const mapStateToProps = (state: any) => {
    const { user } = state.auth;
    return { user };
}
export default connect(mapStateToProps, { getCurrentUser })(Home);