import { Button, Flex, Layout } from 'antd';
import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import './App.css';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import CustomHeader from './components/Header';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AuthProvider from './components/AuthProvider';
import { GlobalProvider } from './pages/stateManagmentStudents';
import RequireAuth from './components/RequireAuth';
import Students from './pages/Students';
import Profile from './components/Profile';
import Login from './components/Login';
import { Provider } from 'react-redux';
import store from './redux/store';

const { Sider, Header, Content } = Layout;

const App = () => {
  const [collapsed, setCollapsed] = useState(false);
  
  return (
<Provider store={store}>


    <BrowserRouter>
      <AuthProvider>
        
        <Layout>
          <Sider theme='light' trigger={null} collapsible collapsed={collapsed} className='sider'>
            <Sidebar />
            <Button type='text' icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              className='triger-btn'
              />
          </Sider>
          <Layout>
            <Header className='header'>
              <CustomHeader />
            </Header>
            <Content className='content'>
              <Flex gap='large'>
                <GlobalProvider>
                  <Routes>
                    <Route path="/" element={
                      <RequireAuth>
                        <Students />
                      </RequireAuth>
                    }/>
                    <Route path="/login" element={<Login />} /> {/* Login burada */}
                    <Route path='/profile' element={
                      <RequireAuth>
                        <Profile />
                      </RequireAuth>
                    } />
                  </Routes>
                </GlobalProvider>
            
              </Flex>
            </Content>
          </Layout>
        </Layout>
                   
      </AuthProvider>
    </BrowserRouter>
    </Provider>
  );
}

export default App;
