import NavBar from "./Components/NavBar"
import Footer from "./Components/Footer"
import {  Route, Routes } from "react-router-dom"
import HomeScreen from "./Pages/HomeScreen"
import LoginScreen from "./Pages/LoginScreen"
import SignUpScreen from "./Pages/SignUpScreen"
import CurrentUserProfile from "./Pages/CurrentUserProfile"
import { AuthContextComponent } from "./Components/authContextComponents"
import UserProfile from "./Pages/UserProfile"
import CreatePost from "./Pages/CreatePost"
import UpdateUser from "./Pages/UpdateUser"
import FollowersCurrentUser from "./Pages/FollowersCurrentUser"
import FollowingsCurrentUser from "./Pages/FollowingsCurrentUser"
import { UserContextProvider } from "./Components/loggedUserContext"
import FollowingsUser from "./Pages/FollowingsUser"
import FollowersUser from "./Pages/FollowersUser"


function App() {

  return (
    <>
    <AuthContextComponent>
      <UserContextProvider>
    <div className="flex flex-col min-h-screen">
    <NavBar />
    <div className="flex-grow">
      <Routes> 
    <Route path="/" element={<HomeScreen />} />
    <Route path="/signup" element={<SignUpScreen />} />
    <Route path="/login" element={<LoginScreen />} />
    <Route path="/profile" element={<CurrentUserProfile/>} />
    <Route path="/userProfile/:userId" element={<UserProfile/>} />
    <Route path="/createPost" element={<CreatePost/>} />
    <Route path="/updateUser" element={<UpdateUser/>} />
    <Route path="/followers" element={<FollowersCurrentUser/>} />
    <Route path="/followings" element={<FollowingsCurrentUser/>}/>
    <Route path="/followings/:userId" element={<FollowingsUser/>} />
    <Route path="/followers/:userId" element={<FollowersUser/>} />
    </Routes>
    </div>
    <Footer />
  </div>
  </UserContextProvider>
  </AuthContextComponent>
  </>
  )
}

export default App
