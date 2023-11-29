import React, { useEffect, useRef, useState } from 'react';
import { Input, Button, List, Avatar, message, Tabs } from 'antd';
import axios from 'axios';
import { API_URL } from '../../utils/config';
import UserList from '../userList';
import GroupList from '../groupList';

const { TextArea } = Input;
const { TabPane } = Tabs;

const ChatPage = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [isChatAdded, setIsChatAdded] = useState(false);
  const messageListRef = useRef(null)
  const chatListRef = useRef(null)

  useEffect(() => {
    const token = localStorage.getItem('token')
    const getChats = async () => {
      try {
        const response = await axios.get(`${API_URL}/chat`, { headers: { 'Authorization': token } })
        const data = await response.data
        setMessages(data.chats)
      } catch (error) {
        message.error(error.message, 2)
      }
    }
    getChats()
  }, [isChatAdded])

  useEffect(() => {
    if (messageListRef.current) {
      messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
    }
    if (chatListRef.current) {
      chatListRef.current.scrollTop = chatListRef.current.scrollHeight;
    }
  }, [messages])


  const handleSendMessage = async () => {
    if (newMessage.trim() === '') {
      return;
    }

    try {
      const token = localStorage.getItem('token')
      const response = await axios.post(`${API_URL}/chat`, { text: newMessage }, { headers: { 'Authorization': token } })
      setIsChatAdded(prev => !prev)
    } catch (error) {
      message.error(error.message, 2)
    }
    setNewMessage('');
  };

  return (
    <div className="chat-page-container">
      <Tabs defaultActiveKey="1" tabBarStyle={{ justifyContent: 'space-around', width: '100%' }}>
        <TabPane tab={<div className='custom-tab'>User</div>} key="1">
          <UserList />
        </TabPane>
        <TabPane tab={<div className='custom-tab'>Group</div>} key="2">
          <GroupList />
        </TabPane>
      </Tabs>
      <div className="chat-container">
        <div className="message-list" ref={messageListRef}>
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
          <TextArea
            rows={2}
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onPressEnter={handleSendMessage}
            className="textarea"
          />
          <Button type="primary" onClick={handleSendMessage} className="button">
            Send
          </Button>
        </div>
      </div>
    </div>

  );
};

export default ChatPage;
