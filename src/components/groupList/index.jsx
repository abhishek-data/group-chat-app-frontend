import { Avatar, Button, Form, Input, List, Modal, message } from 'antd';
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { API_URL } from '../../utils/config';
import { DeleteOutlined, PlusCircleOutlined } from '@ant-design/icons';
import UserList from '../userList';

const GroupList = ({showChatPage}) => {

    const [groupList, setGroupList] = useState([]);
    const [userList, setUserList] = useState([])
    const [groupId, setGroupId] = useState(null)
    const [newGroup, setNewGroup] = useState('');
    const [isGroupAdded, setIsGroupAdded] = useState(false);
    const [isShowUser, setIsShowUser] = useState(false)
    const groupListRef = useRef(null)

    useEffect(() => {
        const getGroupList = async () => {
            try {
                const token = localStorage.getItem('token')
                const response = await axios.get(`${API_URL}/get-groups`, { headers: { Authorization: token } })
                const data = await response.data
                setGroupList(data?.groups)
            } catch (error) {
                message.error("something went wrong", 2)
            }
        }
        getGroupList()
    }, [isGroupAdded])

    const addGroupHandler = async () => {
        const token = localStorage.getItem('token')
        if (newGroup.trim === '') return
        try {
            const response = await axios.post(`${API_URL}/create-group`, { name: newGroup, isAdmin: true }, { headers: { Authorization: token } })
            const data = await response.data
            if (data) {
                setIsGroupAdded(prev => !prev)
                message.success(data.message, 2)
            }
        } catch (error) {
            message.error(error, 2)
        }
        setNewGroup('')
    }

    const deleteGroupHandler = async (id) => {
        const token = localStorage.getItem('token')
        try {
            const response = await axios.delete(`${API_URL}/delete-group/${id}`, { headers: { Authorization: token } })
            const data = await response.data
            if (data) {
                setIsGroupAdded(prev => !prev)
                message.success(data.message, 2)
            }
        } catch (error) {
            message.error(error, 2)
        }
        setNewGroup('')
    }

    const addUserHandler = async (id) => {
        const token = localStorage.getItem('token')
        if (newGroup.trim === '') return
        try {
            const response = await axios.get(`${API_URL}/get-users`, { headers: { Authorization: token } })
            const data = await response.data
            if (data) {
                setUserList(data.users)
                setGroupId(id)
                setIsShowUser(true)
            }
        } catch (error) {
            message.error(error, 2)
        }
        setNewGroup('')
    }




    return (
        <div className="group-container">
            <div style={{ textAlign: 'center', backgroundColor: '#fc0341', padding: '8px', color: 'white', borderRadius: '8px', marginBottom: '10px' }}>Groups</div>
            <div className="message-list" ref={groupListRef}>
                <List
                    itemLayout="horizontal"
                    dataSource={groupList}
                    renderItem={(group, index) => (
                        <List.Item>
                            <List.Item.Meta
                                style={{cursor:'pointer'}}
                                avatar={<Avatar>{group?.name[0]}</Avatar>}
                                title={group?.name}
                                onClick={()=>showChatPage(group)}
                            />
                            <Button title='Add User' onClick={() => addUserHandler(group.id)}><PlusCircleOutlined /></Button>
                            <Button title='Delete Group' style={{ marginLeft: '10px' }} onClick={() => deleteGroupHandler(group.id)}><DeleteOutlined /></Button>
                        </List.Item>
                    )}
                />
            </div>
            <div className="create-group-container">
                <Form.Item>
                    <Input placeholder='Enter New Group Name' value={newGroup} onChange={e => setNewGroup(e.target.value)} />
                </Form.Item>
                <Button type="primary" className="button" onClick={addGroupHandler}>
                    Create Group
                </Button>
            </div>
            <Modal
                width={300}
                open={isShowUser}
                footer={null}
                onCancel={() => {
                    setIsShowUser(false)
                    setGroupId(null)
                }}
            >
                <UserList userList={userList} groupId={groupId}/>
            </Modal>
        </div>
    )
}

export default GroupList