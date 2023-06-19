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


function App() {

  return (
    <>
    <AuthContextComponent>
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
    </Routes>
    </div>
    <Footer />
  </div>
  </AuthContextComponent>
  </>
  )
}

export default App
