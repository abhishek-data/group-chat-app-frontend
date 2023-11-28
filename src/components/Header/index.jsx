import React, { useEffect, useState } from 'react';
import { Layout, Button } from 'antd';


const { Header, Content } = Layout;

const AppHeader = ({ setIsLoggin, isloggedIn }) => {

  const handleLogout = () => {
    setIsLoggin(false)
    localStorage.removeItem('token')
  }

  return (
    <>
      <Layout>
        <Header className="header">
          <div className="logo">Group Chat App</div>
          {isloggedIn && <Button className="logout-button" type="primary" onClick={handleLogout}>
            Logout
          </Button>}
        </Header>
      </Layout>

    </>
  );
};

export default AppHeader;
