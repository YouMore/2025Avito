import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Layout } from 'antd';

import AppRoutes from './AppRoutes';
import HeaderComponent from './components/HeaderComponent';
import { AuthProvider } from './AuthContext';

const { Content, Footer } = Layout;

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <Layout style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
          <HeaderComponent />
          <Content style={{ padding: '20px', width: '80%', margin: 'auto', flex: 1 }}>
            <AppRoutes />
          </Content>
          <Footer style={{ textAlign: 'center', flexShrink: 0 }}>
            ©2025 Created by YouMore
          </Footer>
        </Layout>
      </Router>
    </AuthProvider>
  );
};

export default App;