import { useEffect } from 'react'
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom'

 //simply privatelayout accept the children and its type is { children : React.ReactNode}
 //now simple wrap the pages which you want to make to private
const PublicLayout = ({children} : {children : React.ReactNode}) => {

    const Navigate= useNavigate();

    useEffect(() => {
    if(Cookies.get("token")){
        Navigate("/");
    }
    }, [])
    
  return (
    <div>
         {children}
    </div>
  )
}

export default PublicLayout