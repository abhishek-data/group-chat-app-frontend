import { PlusCircleOutlined } from '@ant-design/icons';
import { Avatar, Button, List, message } from 'antd'
import axios from 'axios';
import React, { useRef, useState } from 'react'
import { API_URL } from '../../utils/config';

const UserList = ({ userList, groupId }) => {



    const addUserHandler = async (userId) => {
        const token = localStorage.getItem('token')
        try {
            const response = await axios.post(`${API_URL}/add-user/${groupId}`, { userId }, { headers: { Authorization: token } })
            const data = await response.data
            if (data) {
                message.success("sucessfully added to group")
            }
        } catch (error) {
            message.error(error, 2)
        }
    }

    return (
        <div className="user-container">
            <div style={{ textAlign: 'center', backgroundColor: '#fc0341', padding: '8px', color: 'white', borderRadius: '8px', marginBottom: '10px' }}>Users</div>
            <div className="message-list">
                <List
                    itemLayout="horizontal"
                    dataSource={userList}
                    renderItem={(user, index) => (
                        <List.Item>
                            <List.Item.Meta
                                avatar={<Avatar>{user?.fullname[0]}</Avatar>}
                                title={user?.fullname}
                            />
                            <PlusCircleOutlined onClick={() => addUserHandler(user.id)} />
                        </List.Item>
                    )}
                />
            </div>
        </div>

    )
}

export default UserList