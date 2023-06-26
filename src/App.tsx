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
import SearchBarContent from "./Pages/SearchBarContent"


function App() {

  return (
    <>
      <AuthContextComponent>
        <UserContextProvider>
          <div className="flex bg-slate-700 text-slate-200 min-h-screen">
            <div>
              <NavBar />
            </div>
            <div className="flex-grow overflow-y-auto ml-48 mr-48">
              <Routes>
                <Route path="/" element={<HomeScreen />} />
                <Route path="/signup" element={<SignUpScreen />} />
                <Route path="/login" element={<LoginScreen />} />
                <Route path="/profile" element={<CurrentUserProfile />} />
                <Route path="/userProfile/:userId" element={<UserProfile />} />
                <Route path="/createPost" element={<CreatePost />} />
                <Route path="/updateUser" element={<UpdateUser />} />
                <Route path="/followers" element={<FollowersCurrentUser />} />
                <Route path="/followings" element={<FollowingsCurrentUser />} />
                <Route path="/followings/:userId" element={<FollowingsUser />} />
                <Route path="/followers/:userId" element={<FollowersUser />} />
                <Route path="/search-results" element={<SearchBarContent/>} />
              </Routes>
              <Footer />
            </div>
          </div>
        </UserContextProvider>
      </AuthContextComponent>
    </>
  )
}

export default App
