import { useState, SyntheticEvent, useEffect } from 'react';
import { api } from "../api"
import { useNavigate } from "react-router-dom"



const UpdateUser = () => {
  const navigate = useNavigate()
  const [user, setUser] = useState({userName: "", email: "", password: ""})

  useEffect(() => {
    async function fetchUser(){
      const response = await api.get("/profilePost")

      setUser(response.data)
    }
    fetchUser()
  }, [])
  
  function handleChange(e: React.ChangeEvent<HTMLInputElement>){
    setUser({...user, [e.target.name]: e.target.value})
  }

  async function handleSubmit(e: SyntheticEvent){
    try{
      e.preventDefault()  

      await api.put("/updateUser", {
        ...user
      })
      navigate("/")

    } catch(err){
      console.log(err)
    }
  }


  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Update User Information</h1>

      <form onSubmit={handleSubmit} className="max-w-sm">
        <div className="mb-4">
          <label htmlFor="userName" className="block font-bold mb-2">
            Username:
          </label>
          <input
            type="text"
            id="userName"
            name="userName"
            value={user.userName}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block font-bold mb-2">
            Email:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={user.email}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="block font-bold mb-2">
            Password:
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={user.password}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Update
        </button>
      </form>
    </div>
  );
};

export default UpdateUser;
