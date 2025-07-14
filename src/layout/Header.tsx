
import "../App.css";
import {App,MenuProps , Dropdown , Button, message} from "antd";
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import useUserStore from '../store/UserStore.ts';
import { CircleUserRound } from 'lucide-react';



const Header = () => {
 
  
    const obj = useUserStore();    //now using the store currentUser value in the header from the store
    const Navigate= useNavigate();
    const { message } = App.useApp();  //I already wrap the app by antdApp but here i used the component message of Antdapp outside the wrap so declared it first here
    const onlogout=()=>{
    Cookies.remove("token")
    message.success("Logged Out Successfully")
    obj.setCurrentUser (null);
    Navigate("/Login")

    }

    const userMenuItems: MenuProps['items'] = [
        {
          key: '1',
          label: (
            <Link to={"/profile"}>Profile</Link>
          ),
        },
        {
          key: '2',
          label: (
            <Link to={"/donations"}>Donations</Link>
          ),
        },
        {
          key: '3',
          label: (
            <Link to={"/reports"}>Reports</Link>
          ),
        },
        {
            key: '4',
            label: (
              <span onClick={onlogout}>Logout</span>
            ),
          },
      ];

    const adminMenuItems : MenuProps['items'] = [
        {
          key: '1',
          label: (
            <Link to={"/admin/donations"}>Donations</Link>
          ),
        },
        {
            key: '2',
            label: (
              <Link to={"/admin/campaigns"}>Campaigns</Link>
            ),
        },
        {
          key: '3',
          label: (
            <Link to={"/admin/users"}>Users</Link>
          ),
        },
        {
          key: '4',
          label: (
            <Link to={"/admin/reports"}>Reports</Link>
          ),
        },
        {
            key: '5',
            label: (
              <span onClick={onlogout}>Logout</span>
            ),
          },
      ];


     const menuItemtouse = obj.currentUser &&  obj.currentUser.isAdmin ? adminMenuItems : userMenuItems; //this is not safer
  // const menuItemtouse = obj.currentUser?.isAdmin ? adminMenuItems : userMenuItems;  //the upper is also same as this but this is more safer if obj.currentUser?. not available it will return undefined

  return (
    <div className='primarycolor flex justify-between items-center p-5'>

        <h1 className='text-2xl font-bold text-white cursor-pointer '
        onClick={()=> Navigate('/')}>
            HOPE-BY-AZIZ
        </h1>

        <Dropdown menu={{ items : menuItemtouse }} placement="bottom">
        
        <Button size='middle' className='flex items-center '>  {< CircleUserRound size={16} /> } { obj.currentUser?.name}</Button>
       </Dropdown>

    </div>
  )
}

export default Header