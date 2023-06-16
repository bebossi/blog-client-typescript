import {useState, SyntheticEvent} from "react"
import { useNavigate } from "react-router-dom"
import { api } from "../api"



function LoginScreen() {
    const navigate = useNavigate()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const submitHandler = async (e: SyntheticEvent) => {
        try{
        e.preventDefault();

        // const response = await fetch("http://localhost:5555/user/login", {
        //     method: "POST",
        //     headers: {"Content-Type": "application/json"},
           
        //     body: JSON.stringify({
        //         email,
        //         password
        //     })
            
        // })
        const response = await api.post("/user/login", {email, password})
        if(response){
            const data =  response.data;
            const token = data.token;
            document.cookie = `Bearer=${token}`;
        }
        navigate("/")
  } catch(err) {
        console.log(err)
    }

    }


  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
    <div className="max-w-md w-full mx-auto p-6 bg-white shadow-md">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <form onSubmit={submitHandler}>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
            placeholder="Enter your email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
            placeholder="Enter your password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Log In
          </button>
          <a
            href="#"
            className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
          >
            Forgot Password?
          </a>
        </div>
      </form>
    </div>
  </div>
  )
}

export default LoginScreen
