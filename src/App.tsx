import NavBar from "./Components/NavBar"
import Footer from "./Components/Footer"
import {  Route, Routes } from "react-router-dom"
import HomeScreen from "./Pages/HomeScreen"
import LoginScreen from "./Pages/LoginScreen"
import SignUpScreen from "./Pages/SignUpScreen"
import CurrentUserProfile from "./Pages/CurrentUserProfile"

function App() {

  return (
    <div className="flex flex-col min-h-screen">
    <NavBar />
    <div className="flex-grow">
      <Routes>
    <Route path="/" element={<HomeScreen />} />
    <Route path="/signup" element={<SignUpScreen />} />
    <Route path="/login" element={<LoginScreen />} />
    <Route path="/profile" element={<CurrentUserProfile/>} />
    </Routes>
    </div>
    <Footer />
  </div>
  )
}

export default App
