import React from "react";
import { connect } from "react-redux";
import { login, getCurrentUser } from "../../actions/authActions";
import {
    Button,
    InputGroup,
    Tooltip,
    Intent,
    Icon,
    Callout,
    Label,
    Alert
} from "@blueprintjs/core";
import { AuthActions } from "./interfaces";
import { Redirect } from "react-router";

class LoginComponent extends React.Component<AuthActions, {}> {
    public state = {
        disabled: false,
        password: "",
        showPassword: false,
        username: "",
        message: null,
        isOpen: false,
    };
    componentWillMount() {
        this.props.getCurrentUser()
    }

    componentWillUpdate(props: any) {
        const { message } = props;
        if (props.user) {
            return;
        }
        if (message !== "" && message !== this.state.message) {
            this.setState({ message, isOpen: true });
        }
    }

    render() {
        const { showPassword, disabled, isOpen } = this.state;
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
        return (
            <Callout className="container mt-5" title="Sign-up" icon="new-person" intent={Intent.PRIMARY}>
            <Label>
            Usernname
                <InputGroup
                    large={true}
                    min={5}
                    max={20}
                    placeholder="Enter your username..."
                    rightElement={(<Icon icon="user" iconSize={20} />)}
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
                    disabled={disabled}
                    large={true}
                    min={8}
                    placeholder="Enter your password..."
                    rightElement={lockButton}
                    onChange={(e: any) => this.setState({ password: e.target.value })}
                    intent={Intent.PRIMARY}
                    fill={true}
                    round={true}
                    type={showPassword ? "text" : "password"}
                />
                </Label>
                <Alert 
                    isOpen={isOpen} 
                    canOutsideClickCancel={true}
                    confirmButtonText="Ok"
                    onConfirm={() => this.setState({ isOpen: false })}
                    intent={Intent.DANGER}
                >
                {this.state.message}
                </Alert>
                <Button
                    icon={"log-in"}
                    intent={Intent.PRIMARY}
                    minimal={false}
                    large={true}
                    onClick={this.onLogin}
                />

            </Callout>
        );
    }
    private onLockClick = () => this.setState({ showPassword: !this.state.showPassword });
    private onLogin = () => {
        this.props.login(this.state);
        this.setState({ message: "", isOpen: false,});
    }
}

const mapStateToProps = (state: any) => {
    const { user, message } = state.auth;
    return { user, message };
};

export default connect(mapStateToProps, { login, getCurrentUser })(LoginComponent);
