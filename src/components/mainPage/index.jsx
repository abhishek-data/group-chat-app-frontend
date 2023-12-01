import { useState } from 'react';
import ChatPage from '../chatPage';
import GroupList from '../groupList';



const MainPage = () => {
  const [isShowChat, setIsShowChat] = useState(false)
  const [activeGroupData, setActiveGroupData] = useState(null)

 const showChatPage = (groupData) => {
  setActiveGroupData(groupData)
  setIsShowChat(true)
 }
  return (
    <div className="chat-page-container">
      {isShowChat?<ChatPage setIsShowChat={setIsShowChat} activeGroupData={activeGroupData} />:<GroupList showChatPage={showChatPage}/>}
    </div>

  );
};

export default MainPage;
