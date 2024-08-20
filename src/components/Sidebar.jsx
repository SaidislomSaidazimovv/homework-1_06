import { CarryOutOutlined, LoginOutlined, OrderedListOutlined, ProfileOutlined, SettingOutlined, UserOutlined, XOutlined } from '@ant-design/icons'
import { Flex, Menu } from 'antd'
import React, { useContext } from 'react'
import '../scss/Sidebar.scss'

import { useNavigate } from 'react-router-dom'
import { useAuth } from './AuthProvider'

const Sidebar = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  
  const handleClick = (key) => {
    switch (key) {
      case '1':
        // Do something when Dashboard icon is clicked
        navigate('/')
        console.log('Dashboard icon clicked');
        break;
      case '2':
        // Do something when My orders icon is clicked
        navigate('/teachers')
        console.log('My orders icon clicked');
        break;
      case '3':
        // Do something when Todo icon is clicked
        console.log('Todo icon clicked');
        break;
      case '4':
        // Do something when Profile icon is clicked
        console.log('Profile icon clicked');
        break;
      case '5':
        // Do something when Setting icon is clicked
        console.log('Setting icon clicked');
        break;
      case '6':
        // Do something when LogOut icon is clicked
        console.log('LogOut icon clicked');
        navigate('/profile');
        break;
    
      default:
        break;
    }
  };

  if (user && Object.keys(user).length !== 0) {

    return (

      <>
        <Flex align='center' justify='center' className=''>

          <div className='logo'>
            <XOutlined />
          </div>

        </Flex>
        <Menu mode='inline' defaultSelectedKeys={['1']} className='menu-bar' onClick={({ key }) => handleClick(key)} items={[
          {
            key: '1',
            icon: <UserOutlined />,
            label: 'Students',

          },
          {
            key: '2',
            icon: <UserOutlined />,
            label: 'Teachers',

          },
          {
            key: '3',
            icon: <OrderedListOutlined />,
            label: 'Todo',

          },
          {
            key: '4',
            icon: <ProfileOutlined />,
            label: 'Profile',

          },
          {
            key: '5',
            icon: <SettingOutlined />,
            label: 'Setting',

          },
          {
            key: '6',
            icon: <LoginOutlined />,
            label: 'LogOut',

          },
        

        ]} />
      </>
    )
  }
}

export default Sidebar