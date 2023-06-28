import { User } from "../interfaces"
import React from "react"

interface UserProps {
    user: User;
  }

const LikedPosts: React.FC<UserProps> = ({user} ) => {



  return (
    <div>
      {user.likes.map((like) => (
        <p>{like.postId.content}</p>
      ))}
    </div>
  )
}

export default LikedPosts
