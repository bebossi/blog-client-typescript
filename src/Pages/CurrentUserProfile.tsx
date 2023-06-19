import {useEffect, useState} from "react"
import { api } from "../api"
import {  User } from "../interfaces"

function CurrentUserProfile() {

    const [user, setUser] = useState<User>()

    useEffect(() => {
        async function fetchPosts() {
            const response = await api.get("/profilePost")

            setUser(response.data)
        }
        fetchPosts()
    }, [])

  return (
    <div>
       
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-2">User: {user?.userName}</h1>
      <h2 className="text-xl mb-4">Email: {user?.email}</h2>

      <h3 className="text-2xl font-bold mb-2">Posts:</h3>
      {user?.posts.map((post) => (
        <div key={post.id} className="bg-gray-200 p-4 rounded-lg mb-4">
          <p>{post.content}</p>

          <h5 className="text-lg font-semibold mt-4 mb-2">Comments:</h5>
          {post.comments.map((comment) => (
            <p key={comment.id}> {comment.userId.userName}:{comment.comment}</p>
          ))}
        </div>
      ))}
    </div>
  
    </div>
  )
}

export default CurrentUserProfile
