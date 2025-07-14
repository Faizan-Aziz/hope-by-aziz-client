import React, { ReactNode } from 'react';
import { ConfigProvider } from 'antd';


interface ThemeProviderProps {
  children: ReactNode;
}

const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  return (

    <ConfigProvider
    theme={{
        token: {
                colorPrimary: '#1A3636',   //global level
                borderRadius : 2,
                controlOutline: 'none'     //this will remove the rounded box shadow around the input
        }, 
        
        components :{                      //changing on the specific button
            Button:{
                controlHeight :42,
                
            },
            Input : {
                controlHeight :45,   
            },
            InputNumber : {
              controlHeight :45,   
            },
            Select : {
              controlHeight :45, 
            },
            
        }
    }}>{children}</ConfigProvider>
  )
};

export default ThemeProvider;

