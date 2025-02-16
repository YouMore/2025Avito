import React, { useState } from 'react';
import { Layout, Button, Popover, Avatar, Flex, Row, Col, Input, message } from 'antd';
import { Link } from 'react-router-dom';
import { UserOutlined, SmileOutlined } from '@ant-design/icons';
import { useAuth } from '../AuthContext';

const { Header } = Layout;

const HeaderComponent: React.FC = () => {
  const { isAuthenticated, login, logout } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (!username) {
      message.warning('Введите логин');
      return;
    }
    if (!password) {
      message.warning('Введите пароль');
      return;
    }

    login(username, password);
    message.success('Вы вошли в аккаунт');
  };

  const handleLogout = () => {
    logout();
    message.success('Вы вышли из аккаунта');
  };

  const content = (
    <Col>
      <Flex vertical style={{ width: '100%', position: 'relative' }}>
        <Flex align="center" gap={8}>
          <Avatar icon={<SmileOutlined />} />
          <div>{username}</div>
        </Flex>

        <Button
          type="link"
          onClick={handleLogout}
          style={{
            position: 'relative',
            right: 0,
            bottom: 0,
          }}
        >
          Выход
        </Button>
      </Flex>
    </Col>
  );

  const loginForm = (
    <Flex vertical gap={8}>
      <Input
        placeholder="Логин"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <Input
        type="password"
        placeholder="Пароль"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button type="primary" onClick={handleLogin}>Войти</Button>
    </Flex>
  );

  return (
    <Header style={{ background: '#f5f5f5', padding: 0, width: '90%', margin: 'auto' }}>
      <Row align="middle" justify="space-between" style={{ padding: '0 20px' }}>
        <Col flex="auto" style={{ textAlign: 'center' }}>
          <Link to="/" style={{ display: 'inline-block' }}>
            <h1 style={{ margin: '0 0 0 32px' }}>AVITO CLONE</h1>
          </Link>
        </Col>
        <Col>
          {isAuthenticated ? (
            <Popover content={content} trigger="click" style={{ width: '32px' }}>
              <Button icon={<UserOutlined />} style={{ width: '32px' }} />
            </Popover>
          ) : (
            <Popover content={loginForm} trigger="click" style={{ width: '32px' }}>
              <Button>Войти</Button>
            </Popover>
          )}
        </Col>
      </Row>
    </Header>
  );
};

export default HeaderComponent;