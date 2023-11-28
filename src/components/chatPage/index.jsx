import React, { useEffect, useRef, useState } from 'react';
import { Input, Button, List, Avatar } from 'antd';

const { TextArea } = Input;

const ChatPage = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const messageListRef = useRef(null)

  useEffect(() => {
    if (messageListRef.current) {
      messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
    }
  }, [messages])


  const handleSendMessage = () => {
    if (newMessage.trim() === '') {
      return;
    }

    const updatedMessages = [...messages, { text: newMessage, sender: 'You' }];
    setMessages(updatedMessages);
    setNewMessage('');
  };

  return (
    <div className="chat-container">
      <div className="message-list" ref={messageListRef}>
        <List
          itemLayout="horizontal"
          dataSource={messages}
          renderItem={(message, index) => (
            <List.Item>
              <List.Item.Meta
                avatar={<Avatar>{message.sender[0]}</Avatar>}
                title={message.sender}
                description={message.text}
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
