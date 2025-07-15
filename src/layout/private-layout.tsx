
import { useEffect,useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import Header from './Header'
import jwtDecode from "jwt-decode";
import axios from 'axios'
import useUserStore from '../store/UserStore.ts';
import { message , Spin} from 'antd'


const PrivateLayout = ({ children }: { children: React.ReactNode }) => {

    const Navigate = useNavigate()
    const obj = useUserStore();    //this useUserStore() will store the setcurrentuser globally so now it is used anywhere in any component
    const pathname= window.location.pathname;
    const [loading, setLoading] = useState(false);



    //step 1 this will set the current user  and store it in the global store
     const getdata = async () => {
        try {
          setLoading(true)
          const response = await axios.get('/user/current-user');
          // console.log("response is :",response.data.user)
         obj.setCurrentUser(response.data.user)
        } catch (error: any) {
          message.error(error.response.data.message || error.message)   //error.response.data if fails it catch the error that comes from the backend like status 404 or User not exist like that
        } finally{
          setLoading(false)
        }
      }



    // step 2: this validate the current login user that he have the cookies or not and if he expire cookie also navigate it to the login page also.
     useEffect(() => {
      const token = Cookies.get("token");
  
      if (!token) {
        Navigate("/login"); // No token, go to login page
      } else {
        try {
          const decodedToken :any  = jwtDecode(token);
          const currentTime = Date.now() / 1000; // Convert to seconds
  
          if (decodedToken.exp < currentTime) {
            Cookies.remove("token"); // Remove expired token
            Navigate("/login"); // Redirect to login page
          }
        } catch (error) {
          console.error("Invalid token:", error);
          Cookies.remove("token");
          Navigate("/login");
        }
      
      if (!obj.currentUser){
        getdata()
      }  
      }
    }, [])

    
    
      

    if(loading){
      return <div className='flex justify-center items-center h-96'>
               <Spin/>
             </div>
    }

    // step 3 this step will make the admin route restricted by checking the current user is admin or not
      if(obj.currentUser && !obj.currentUser.isAdmin && pathname.includes('/admin')) {
          return (
            <div>
            <Header/>
            <div className="p-5 text-sm font-bold"> You are not authorized to view this page </div>
            </div>
          )
      }


    return (
        <div>
            <Header/>
            <div className="p-5">
              {children}
            </div>
        </div>

    )
}

export default PrivateLayout