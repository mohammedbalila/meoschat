import React from "react";
import { Link } from "react-router-dom";
import { getCurrentUser } from "../../actions/authActions";
import { AuthActions } from "../auth/interfaces";
import { connect } from "react-redux";
import {
    Navbar,
    NavbarDivider,
    NavbarGroup,
    NavbarHeading,
    Alignment,
} from "@blueprintjs/core";

class Header extends React.Component<AuthActions, {}> {
    state = {};
    componentWillMount() {
        this.props.getCurrentUser();
    }

    componentWillReceiveProps(nextProp: any) {
        if (!nextProp.user) {

        }
    }

    renderLinks() {
        if (!this.props.user) {
            return (
                <NavbarGroup align={Alignment.LEFT}>
                    <NavbarHeading>
                        Meows Chat
                    </NavbarHeading>
                    <NavbarDivider />
                    <Link to="/signup/" color="#fff">Signup</Link>
                    <NavbarDivider />
                    <Link to="/login/" color="#fff">Login</Link>
                </NavbarGroup>
            )
        } else {
            return (
                <NavbarGroup align={Alignment.LEFT}>
                    <NavbarHeading>
                        Meows Chat
                    </NavbarHeading>
                    <NavbarDivider />
                    <Link to="/" color="#fff">Home</Link>
                    <NavbarDivider />
                    <Link to="/messages" color="#fff">Messages</Link>
                </NavbarGroup>
            )
        }
    }
    render() {
        return (
            <Navbar style={{ backgroundColor: "#2B95D6", color: "#fff" }} className="bp3-text-large">
                    {this.renderLinks()}
            </Navbar>
        )
    }
}

const mapStateToProps = (state: any) => {
    const { user } = state.auth;
    return { user };
};

export default connect(mapStateToProps, { getCurrentUser })(Header);
