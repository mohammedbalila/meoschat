import React, { Component } from 'react';
import { connect } from 'react-redux';
import { socket } from "../../socket";
import { getCurrentUser } from '../../actions/authActions';
import { getUserMessages } from '../../actions/messagesActions';
import { getUser } from '../../actions/usersAction';

class MessageView extends Component<any, any> {
    initUser = { username: "", profileImage: "" };
    state = {
        messages: [],
        body: "",
        user: this.initUser, currentUser: this.initUser
    };
    private token = localStorage.getItem("auth-token");
    componentWillMount() {
        const { id } = this.props.match.params;
        this.props.getCurrentUser();
        this.props.getUser(id);
        socket.emit("getMessagesWithUser", { token: this.token, receiverId: id });
        socket.on("getMessagesWithUser", (data: { messages: any[] }) => {
            this.setState({ messages: data.messages });
        });

    }

    componentWillReceiveProps(props: any) {
        this.setState({ user: props.user, currentUser: props.currentUser });
    }
    message = (message: any) => {
        const { sender, body, date } = message;
        const { user } = this.props;
        const msgDate = new Date(date).toUTCString().split(" ");
        const clsName = `d-flex justify-content-${sender == user.id ? "start" : "end"} mb-4`;
        return (
            <div className={clsName}>
                <div className="img_cont_msg">
                    <img src={message.receiver.profileImage} className="rounded-circle user_img_msg" />
                </div>
                <div className="msg_cotainer">
                    {body}
                    <span className="msg_time">{msgDate[4]},{msgDate[0]}</span>
                </div>
            </div>
        );
    }
    render() {
        const { messages, user } = this.state;
        return (
            <div className="col-md-10 col-xl-8 offset-2 mt-4 chat">
                <div className="card">
                    <div className="card-header msg_head">
                        <div className="d-flex bd-highlight">
                            <div className="img_cont">
                                <img src={user.profileImage} className="img responsive"/>
                                <span className="online_icon"></span>
                            </div>
                            <div className="user_info">
                                <span>{user.username}</span>
                                <p>{messages.length} Messages</p>
                            </div>
                            <div className="video_cam">
                                <span><i className="fas fa-video"></i></span>
                                <span><i className="fas fa-phone"></i></span>
                            </div>
                        </div>
                        <span id="action_menu_btn"><i className="fas fa-ellipsis-v"></i></span>
                        <div className="action_menu">
                            <ul>
                                <li><i className="fas fa-user-circle"></i> View profile</li>
                                <li><i className="fas fa-users"></i> Add to close friends</li>
                                <li><i className="fas fa-plus"></i> Add to group</li>
                                <li><i className="fas fa-ban"></i> Block</li>
                            </ul>
                        </div>
                    </div>
                    <div className="card-body msg_card_body">
                        {messages.map(message => this.message(message))}
                    </div>
                    <div className="card-footer">
                        <div className="input-group">
                            <div className="input-group-append">
                                <span className="input-group-text attach_btn"><i className="fas fa-paperclip"></i></span>
                            </div>
                            <textarea
                                className="form-control type_msg"
                                placeholder="Type your message..."
                                onChange={(e: any) => this.setState({ body: e.target.value })}
                            >
                            </textarea>
                            <div className="input-group-append">
                                <span className="input-group-text send_btn">
                                    <button className="glyphicon glyphicon-send" onClick={this.send}>
                                        Send
                                            </button>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    private send = () => {
        const { id } = this.props.match.params;
        const { currentUser } = this.props;
        socket.emit("newMessage", { token: this.token, body: this.state.body, receiverId: id, sender: currentUser.id });
        socket.on("getMessagesWithUser", (data: { messages: any[] }) => {
            this.setState({ messages: data.messages, body: "" });
        });
    }
}

const mapStateToProps = (state: any) => {
    const currentUser = state.auth.user;
    const { messages } = state.messages;
    const { user } = state.users;
    console.log(state.users);
    return { currentUser, messages, user };
}

export default connect(mapStateToProps, { getCurrentUser, getUserMessages, getUser })(MessageView);
