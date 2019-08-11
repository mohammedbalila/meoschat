import * as React from "react";
import { connect } from "react-redux";
import { signup, getCurrentUser } from "../../actions/authActions";
import {
    Button,
    Callout,
    InputGroup,
    Tooltip,
    Intent,
    Label
} from "@blueprintjs/core";
import { AuthActions } from "./interfaces";
import { Redirect } from "react-router";

class SignupComponent extends React.Component<AuthActions, {}> {
    state = {
        dateOfBirth: new Date(),
        disabled: false,
        password: "",
        showPassword: false,
        username: "",
        message: null
    };

    componentWillMount() {
        this.props.getCurrentUser()
    }

    render() {
        const { showPassword, disabled } = this.state;
        if (this.props.user) {
            return <Redirect to="/" />
        }
        const lockButton = (
            <Tooltip content={`${showPassword ? "Hide" : "Show"} Password`}>
                <Button
                    icon={showPassword ? "unlock" : "lock"}
                    intent={Intent.WARNING}
                    minimal={true}
                    onClick={this.onLockClick}
                />
            </Tooltip>
        );
        const userIcon = (
        <Tooltip content="Username">
            <Button
                icon={"user"}
                intent={Intent.WARNING}
                minimal={true}
            />
        </Tooltip>
        );
        return (
            <Callout className="container mt-5" title="Sign-up" icon="new-person" intent={Intent.PRIMARY}>
                <Label>
                    Username
                <InputGroup
                    large={true}
                    placeholder="Enter your username..."
                    rightElement={userIcon}
                    onChange={(e: any) => this.setState({ username: e.target.value })}
                    intent={Intent.PRIMARY}
                    fill={true}
                    round={true}
                    type={"text"}
                />
                </Label>
                <Label>
                    Password
                <InputGroup
                    large={true}
                    placeholder="Enter your password..."
                    rightElement={lockButton}
                    onChange={(e: any) => this.setState({ password: e.target.value })}
                    intent={Intent.PRIMARY}
                    fill={true}
                    round={true}
                    type={showPassword ? "text" : "password"}
                />
                </Label>
                <Label>
                    Date of birth
                <InputGroup
                    onChange={(e: any) => this.setState({ dateOfBirth: e.target.value })}
                    placeholder={"Date of birth"}
                    intent={Intent.PRIMARY}
                    fill={true}
                    round={true}
                    large={true}
                    type={"date"}
                />
                </Label>
                <Button
                    icon={"new-person"}
                    intent={Intent.PRIMARY}
                    minimal={false}
                    large={true}
                    onClick={this.onSignup}
                />
            </Callout>
        );
    }
    private onLockClick = () => this.setState({ showPassword: !this.state.showPassword });
    private onSignup = () => {
        console.log(this.state);
        this.props.signup(this.state);
        this.setState({ message: "", username: "", password: "", dateOfBirth: "" });
    }
}

const mapStateToProps = (state: any) => {
    const { message, errors, user } = state.auth;
    console.log(state);
    return { message, errors, user };
};

export default connect(mapStateToProps, { signup, getCurrentUser })(SignupComponent);
