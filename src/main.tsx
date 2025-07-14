import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import '@ant-design/v5-patch-for-react-19';
import { ConfigProvider, App as AntdApp } from 'antd'; //  Import Ant Design's App

createRoot(document.getElementById('root')!).render(
 
    <ConfigProvider>
      <AntdApp> {/*  Wrap your app inside Ant Design's App */}
        <App />
      </AntdApp>
    </ConfigProvider>

)
