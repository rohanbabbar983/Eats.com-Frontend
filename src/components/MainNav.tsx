import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "./ui/button.tsx";
import UserNameMenu from "./UserNameMenu.tsx";
import { Link } from "react-router-dom";

const MainNav = () => {
  const {loginWithRedirect , isAuthenticated} = useAuth0();
  
  return(
    <span className="flex space-x-2 items-center">
      {isAuthenticated ? (
        <>
          <Link to="/order-status" className="font-bold hover:text-orange-500">
           Order Status
          </Link>
          <UserNameMenu/>
        </>
      ):(
        <Button className="font-bold text-orange-500 bg-white hover:bg-orange-500 hover:text-white"
        onClick={async()=> await loginWithRedirect()}
        >Log In
        </Button>
      )}
    </span>
   
  )
}

export default MainNav;