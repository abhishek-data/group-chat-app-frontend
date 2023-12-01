import React, { useEffect, useRef, useState } from 'react';
import { Input, Button, List, Avatar, message, Tabs } from 'antd';
import axios from 'axios';
import { API_URL, decodeToken } from '../../utils/config';
import { RollbackOutlined } from '@ant-design/icons';

const { TextArea } = Input;

const ChatPage = ({ setIsShowChat, activeGroupData }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [isChatAdded, setIsChatAdded] = useState(false);
  const messageListRef = useRef(null)
  const chatListRef = useRef(null)

  useEffect(() => {
    const token = localStorage.getItem('token')
    const getChats = async () => {
      try {
        const response = await axios.get(`${API_URL}/chat/${activeGroupData.id}`, { headers: { 'Authorization': token } })
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
      const { name } = decodeToken(token)
      const response = await axios.post(`${API_URL}/chat`, { text: newMessage, name: name, groupId: activeGroupData.id }, { headers: { 'Authorization': token } })
      setIsChatAdded(prev => !prev)
    } catch (error) {
      message.error(error.message, 2)
    }
    setNewMessage('');
  };

  return (
    <div className="chat-container">
      <div style={{ display: 'flex', justifyContent: 'space-around', textAlign: 'center', backgroundColor: '#fc0341', padding: '5px', color: 'white', borderRadius: '8px' }}>
        <RollbackOutlined onClick={() => setIsShowChat(false)} />
        <p>{<Avatar>{activeGroupData?.name[0]}</Avatar>}{activeGroupData?.name}</p>
      </div>
      <div className="message-list" ref={messageListRef}>
        <List
          itemLayout="horizontal"
          dataSource={messages}
          renderItem={(message, index) => (
            <List.Item>
              <List.Item.Meta
                avatar={<Avatar>{message?.name[0]}</Avatar>}
                title={message?.name}
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

  );
};

export default ChatPage;
