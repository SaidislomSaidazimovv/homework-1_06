import { MessageOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons'
import { Avatar, Flex, Typography } from 'antd'
import Search from 'antd/es/input/Search'
import React from 'react'
import { useAuth } from './AuthProvider'
import { Link } from 'react-router-dom'

const CustomHeader = () => {
  const { user } = useAuth();
  if (user && Object.keys(user).length !== 0){

    return (
    <Flex align='center' justify='space-between'>
  <Typography.Title level={3} type='secondary'>
  XMR
  </Typography.Title>
  <Flex align='center' gap="3rem">
  <Search placeholder='Search Dashboard' allowClear/>
  
  
  <Flex align='center' gap='10px'>
  <MessageOutlined className='header-icon'/>
  <NotificationOutlined className='header-icon'/>
 <Link to="/profile"><Avatar icon={<UserOutlined/>}/></Link> 
  </Flex>
 
  
  </Flex> 
    </Flex>
    )
  }
}

export default CustomHeader