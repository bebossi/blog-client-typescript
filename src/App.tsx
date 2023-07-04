import NavBar from "./Components/NavBar"
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
import SearchBar from "./Components/searchBar"
import PostDetails from "./Pages/Post"
import Chats from "./Components/Chats"
import ChatsPage from "./Pages/ChatsPage"


function App() {

  return (
    <>
      <AuthContextComponent>
        <UserContextProvider>
          <div className="flex bg-gray-950 text-slate-200 min-h-screen max-h-full">
            <div>
              <NavBar />
            </div>
            <div className="flex-grow overflow-y-auto ml-60 mr-80">
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
                <Route path="/post/:postId" element={<PostDetails/>} />
                <Route path="/chats" element={<ChatsPage/>}/>
              </Routes>
            </div>
            <div className="bg-gray-950 fixed right-0 top-0 h-full pr-16 ">
              <div className="relative">
                <SearchBar/>

              </div>
              <div className="absolute bottom-0 w-full">

                <Chats/>
              </div>
              </div>
          </div>
        </UserContextProvider>
      </AuthContextComponent>
    </>
  )
}

export default App
