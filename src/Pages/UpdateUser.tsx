import { useState, SyntheticEvent, useEffect, ChangeEvent } from 'react';
import { api } from "../api"
import { useNavigate } from "react-router-dom"



const UpdateUser = () => {
  const navigate = useNavigate()
  const [user, setUser] = useState({userName: "", email: ""})
  const [imageUrl, setImageUrl] = useState<File | string | undefined>()

  useEffect(() => {
    async function fetchUser(){
      const response = await api.get("/profilePost")

      setUser(response.data)
    }
    fetchUser()
  }, [])

  function handleImage(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files && e.target.files[0]; 

    if (file) {
      setImageUrl(file);
    }
  }
  async function handleUpload() {
    try {
      if (imageUrl) {
        const uploadData = new FormData();
        uploadData.append("image", imageUrl);

        const response = await api.post("/uploadImage", uploadData);

        return response.data;
      }
    } catch (error) {
      console.log(error);
    }
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>){
    setUser({...user, [e.target.name]: e.target.value})
  }


  async function handleSubmit(e: SyntheticEvent){
    try{
      e.preventDefault()  
      const uploadResponse = await handleUpload();
      const uploadedImageUrl = uploadResponse?.path; 

      await api.put("/updateUser", {
        ...user, imageUrl: uploadedImageUrl
      })
      navigate("/")
      console.log("enviado")

    } catch(err){
      console.log(err)
    }
  }

  return (
    <div className="container mx-auto p-4 h-screen">
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
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 text-slate-950"
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
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 text-slate-950"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="imageUrl" className="block font-bold mb-2">
            Image:
          </label>
          <input
            type="file"
            id="imageUrl"
            name="imageUrl"
            onChange={handleImage}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 text-slate-950"
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
