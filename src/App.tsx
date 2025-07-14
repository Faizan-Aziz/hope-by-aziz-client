
import './App.css'
import ThemeProvider from './Providers/ThemeProvider';
import Login from './pages/auth/Login';
import RegisterPage from './pages/auth/RegisterPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PublicLayout from './layout/public-layout';
import PrivateLayout from './layout/private-layout';
import Home from './pages/Privatepages/home/Home';
import CampaignsPage from './pages/Privatepages/campaigns/CampaignsPage';
import CampaignForm from './pages/Privatepages/campaigns/campaign-form';
import CampaignForm2 from './pages/Privatepages/campaigns/campaign-form/updateform';
import Infopage from './pages/Privatepages/campaign-infoHome';
import Reportpage from './pages/Privatepages/user/Reportpage';
import Donationpage from './pages/Privatepages/user/Donationpage';
import Profilepage from './pages/Privatepages/user/Profilepage';
import Admindonation from './pages/Privatepages/admin/Admindonation';
import Adminreport from './pages/Privatepages/admin/Adminreport';
import UserList from './pages/Privatepages/admin/UserList';
import IndexChatbot from './pages/Chatbot/IndexChatbot'




function App() {
  return (
    <ThemeProvider>

     <BrowserRouter>
     <Routes>

     <Route path='/' element={ <PrivateLayout> <Home/> </PrivateLayout> } />

     <Route path='/campaign/:id' element={ <PrivateLayout> <Infopage/> </PrivateLayout> } />

     <Route path='/Login' element={<PublicLayout>   <Login/>  </PublicLayout>} />

     <Route path='/RegisterPage' element={ <PublicLayout>  <RegisterPage/>  </PublicLayout>} />

     <Route path='/admin/campaigns' element={ <PrivateLayout>  <CampaignsPage/>  </PrivateLayout>} />

     <Route path='/admin/campaigns/create' element={ <PrivateLayout>  <CampaignForm/>  </PrivateLayout>} />

     <Route path='/admin/campaigns/edit/:id' element={ <PrivateLayout>  <CampaignForm/>  </PrivateLayout>} />

     <Route path='/reports' element={ <PrivateLayout>  <Reportpage/>  </PrivateLayout>} />

     <Route path='/donations' element={ <PrivateLayout>  <Donationpage/>  </PrivateLayout>} />

     <Route path='/profile' element={ <PrivateLayout>  <Profilepage/>  </PrivateLayout>} />

     <Route path='/admin/donations' element={ <PrivateLayout>  <Admindonation/>  </PrivateLayout>} />

     <Route path='/admin/reports' element={ <PrivateLayout>  <Adminreport/>  </PrivateLayout>} />

     <Route path='/admin/users' element={ <PrivateLayout>  <UserList/>  </PrivateLayout>} />

     <Route path='/chatbot'  element={   <IndexChatbot/>    } />



     
     </Routes>
     </BrowserRouter>
   

    </ThemeProvider>
  )
} 
export default App
