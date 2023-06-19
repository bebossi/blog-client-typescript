import { useState, SyntheticEvent } from "react";
import { api } from "../api";
import { useNavigate } from "react-router-dom"


function CreatePost() {
    const navigate = useNavigate()
    const [content, setContent] = useState("");
    const [imageUrl, setImageUrl] = useState("")

    const handleSubmit = async (e: SyntheticEvent) => {
        e.preventDefault();
    
        try {
           await api.post("/post", { content, imageUrl });
         
           navigate("/")
        } catch (error) {
          console.error("Error creating post:", error);
        }
      };
  return (
    <div>
       <form onSubmit={handleSubmit} className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-2">Create Post</h2>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Enter post content"
        className="block w-full p-2 border border-gray-300 mb-4"
        rows={4}
      />
        <input
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
        placeholder="Enter image url"
        className="block w-full p-2 border border-gray-300 mb-4"
      />
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
      >
        Create
      </button>
    </form>
    </div>
  )
}

export default CreatePost
