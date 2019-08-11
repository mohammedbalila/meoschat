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
        users: []
    }
    componentWillMount() {
        this.props.getCurrentUser();
        this.props.getUserMessages();
        this.props.getUsers();
        socket.emit("getMessages", { token: localStorage.getItem("auth-token") });
        socket.on("getMessages", (data: any) => {
        });
    }

    componentWillReceiveProps(props: any) {
        this.setState({ users: props.users });
    }

    link = (text: string, id: string) => {
        return (<Link to={`/messages/${id}`}>{text}</Link>)
    }
    render() {
        const { users, username } = this.state;
        if (!this.props.user) {
            return <Redirect to="/login" />
        }
        return (
            <div className="container h-150">
                <div className="col-md-8 col-xl-8 ml-3 mr-3 chat">
                    <div className="card mb-sm-3 mb-md-0 contacts_card">
                        <div className="card-header">
                            <div className="input-group">
                                <Autocomplete
                                    inputProps={{ className: "form-control search", placeholder: "Search..."}}
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
                                <li
                                    className="list-group-item d-flex justify-content-between align-items-center"
                                >
                                    <div className="d-flex bd-highlight" style={{ cursor: "pointer" }} onClick={this.openMessage.bind(this, "y")}>
                                        <div className="img_cont">
                                            <img
                                                src={"https://raddevon.com/wp-content/uploads/2018/10/react.jpg"}
                                                className="rounded rounded-circle user_img"
                                            />
                                        </div>
                                        <div className="user_info">
                                            <span style={{ color: "black" }}>Username</span>
                                        </div>
                                    </div>
                                </li>
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
