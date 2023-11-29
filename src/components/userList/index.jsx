import { Avatar, Button, List } from 'antd'
import React, { useRef, useState } from 'react'

const UserList = () => {

    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [isChatAdded, setIsChatAdded] = useState(false);
    const messageListRef = useRef(null)
    const chatListRef = useRef(null)

    return (
        <div className="group-container">
            <div className="message-list">
                <List
                    itemLayout="horizontal"
                    dataSource={messages}
                    renderItem={(message, index) => (
                        <List.Item>
                            <List.Item.Meta
                                avatar={<Avatar>{message?.User?.fullname[0]}</Avatar>}
                                title={message?.User?.fullname}
                                description={message.message_text}
                            />
                        </List.Item>
                    )}
                />
            </div>
            <div className="input-container">
                <Button type="primary" className="button">
                    Create Group
                </Button>
            </div>
        </div>
    )
}

export default UserList