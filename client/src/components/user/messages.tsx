import React from 'react'
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import Autocomplete from "react-autocomplete";
import { socket } from "../../socket";
import { getCurrentUser } from '../../actions/authActions';
import { getUserMessages } from '../../actions/messagesActions';
import { getUsers } from '../../actions/usersAction';
import './messages.css';

class Messages extends React.Component<any, any> {
    state = {
        username: "",
        messages: [],
        users: []
    }
    private token: string | null;
    constructor(props: any) {
        super(props);
        this.token = localStorage.getItem("auth-token");
        socket.emit("getMessages", { token: this.token });
        socket.on("getMessages", (data: any) => {
            this.setState({ messages: data.messages });
        });
    }
    componentWillMount() {
        this.props.getCurrentUser();
        this.props.getUserMessages();
        this.props.getUsers();
    }

    componentWillReceiveProps(props: any) {
        this.setState({ users: props.users });
    }

    link = (text: string, id: string) => {
        return (<Link to={`/messages/${id}`}>{text}</Link>)
    }

    message = (message: any) => {
        const msgUser = (typeof message.sender === "string") ? message.receiver : message.sender;

        return (
            <li
                className="list-group-item d-flex justify-content-between align-items-center"
            >
                <div className="d-flex bd-highlight" style={{ cursor: "pointer" }} onClick={this.openMessage.bind(this, msgUser._id)}>
                    <div className="img_cont">
                        <img
                            src={msgUser.profileImage}
                            className="rounded rounded-circle user_img"
                        />
                    </div>
                    <div className="user_info">
                        <span style={{ color: "black" }}>{msgUser.username}</span>
                    </div>
                </div>
            </li>
        );
    }
    render() {
        const { users, username, messages } = this.state;
        if (!this.token) {
            return <Redirect to="/login" />
        }
        return (
            <div className="container h-150">
                <div className="col-md-8 col-xl-8 ml-3 mr-3 chat">
                    <div className="card mb-sm-3 mb-md-0 contacts_card">
                        <div className="card-header">
                            <div className="input-group">
                                <Autocomplete
                                    inputProps={{ className: "form-control search", placeholder: "Search..." }}
                                    value={username}
                                    items={users.filter((u: any) => u.username.includes(username))}
                                    getItemValue={(item) => item.username}
                                    onSelect={this.onSelect}
                                    onChange={this.onChange}
                                    renderMenu={(users) => <ul className="menu list-group">{users}</ul>}
                                    renderItem={this.renderItem}
                                />
                                <div className="input-group-prepend">
                                    <span className="input-group-text search_btn">
                                        <i className="fas fa-search" />
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="card-body contacts_body">
                            <ul className="contacts">
                                {messages.map((message: any) => this.message(message))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    private openMessage: any = (id: string) => {
        return this.props.history.push("/message/" + id);
    }
    private onSelect = (value: string, user: any) => {
        // set the menu to only the selected item
        this.openMessage(user._id);
    }

    private onChange = (e: any, username: string) => {
        this.setState({ username });
        if (username.length >= 1) {
            const filteredUser = this.props.users.filter((user: any) => user.username.includes(username));
            this.setState({ users: filteredUser });
        }
    }

    private renderItem = (item: any, isHighlighted: any) => (
        <li
            className={`${isHighlighted ? 'active' : ''} list-group-item`}
            key={item._id}
        >{item.username}
        </li>
    )
}

const mapStateToProps = (state: any) => {
    const { user } = state.auth;
    const { messages } = state.messages;
    const { users } = state.users;
    return { user, messages, users };
}
export default connect(mapStateToProps, { getCurrentUser, getUserMessages, getUsers })(Messages);
