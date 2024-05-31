import { Box, Image, Text, Input, Button } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
// import { LoginSignup } from '../pages/LoginSignup';
import {ChevronDownIcon} from "@chakra-ui/icons"
import { Link, useLocation } from 'react-router-dom'
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
} from '@chakra-ui/react'
import { getUserLoginDetails, updateUserAuthStatus } from '../Redux/authentication/action'
// import { mob } from '../pages/LoginSignup'
// import { useDispatch } from 'react-redux'



export function Navbar() {
  
  const [showLogin, setShowLogin] = useState(true);
  const [showMenu,setShowMenu] = useState(false);
  // const dispatch = useDispatch()
  let currentUser = JSON.parse(localStorage.getItem("currentUser"))
  // getLogin();


  console.log(currentUser,"current user")
  const location = useLocation();

  // console.log(location,"from navbar")
  // console.log(currentUser,"from navbar")

  //-------------------------if statements------------------------------------------------------------------
  
  
  if(currentUser && currentUser.isAuth === true){
     if(showLogin===true){
      setShowLogin(false)
     }
     if(showMenu===false){
        setShowMenu(true);
     }
  }
  //------------------------------FUNCTIONS---------------------------------------------------
  const logout=()=>{
    console.log(currentUser.id,"currentUser.id")
    updateUserAuthStatus(currentUser.id,{isAuth:false})
    currentUser.isAuth = false;
    localStorage.setItem("currentUser",JSON.stringify(currentUser))
    if(showLogin===false){
      setShowLogin(true)
     }
     if(showMenu===true){
        setShowMenu(false);
     }
    //  localStorage
  }


//  async function getLogin(){
//   console.log(mob)
//      console.log( await dispatch(getUserLoginDetails(mob)))
//      console.log(currentUser)
//   }

  
  return (
    <Box>
      <Box
        display="flex"
        gap="30px"
        // border="1px solid black"
        justifyContent="space-between"
      >
        
        <Box display="flex" alignItems="center">
          {showLogin && <Link to="/loginSignup">Login/Signup</Link>}
          {showMenu &&
            <Menu>
              <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                Hi, {currentUser.firstName}
              </MenuButton>
              <MenuList>
                <MenuItem onClick={logout} >Logout</MenuItem>
              </MenuList>
            </Menu>
          }
        </Box>
      </Box>
    </Box>
  )
}
