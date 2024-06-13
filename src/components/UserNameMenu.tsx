import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem } from "./ui/dropdown-menu";
import { ChevronDown, ChevronUp, CircleUserRound } from "lucide-react";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import { useState } from "react";

const UserNameMenu = () => {
    const {user,logout} = useAuth0()
    const [isSetup, setSetup] = useState(false);
    return(
        
        <DropdownMenu open={isSetup} onOpenChange={setSetup} >
            <DropdownMenuTrigger onClick={() => setSetup(!isSetup)}  className="flex items-center px-3 font-bold hover:text-orange-500 gap-2">
                <CircleUserRound className="text-orange-500"/>
                <div  className="text-black flex items-center hover:text-orange-500">
                {user?.email}
                {isSetup ? <ChevronUp /> : <ChevronDown />}
                </div>
                
            </DropdownMenuTrigger>
            <DropdownMenuContent>
            <DropdownMenuItem>
                <Link to="/manage-restaurant" className="font-bold hover:text-orange-500">
                        Manage Restaurant
                </Link>
                </DropdownMenuItem>
                
                <DropdownMenuItem>
                    <Link to="/user-profile" className="font-bold hover:text-orange-500">
                        User Profile
                    </Link>
                </DropdownMenuItem>
                <Separator/>
                <DropdownMenuItem>
                    <Button onClick={()=>logout()} className="flex flex-1 font-bold bg-orange-500">
                        Log Out
                    </Button>
                </DropdownMenuItem>


            </DropdownMenuContent>
            
        </DropdownMenu>
       
        
    )
  
}

export default UserNameMenu;