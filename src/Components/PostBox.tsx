import React from "react";
import {User, Post, Comment} from "../interfaces"

interface PostProps {
  post: Post;
}

const PostBox: React.FC<PostProps> = ({ post }) => {
  return (
    
    <div className="bg-gray-200 p-4 rounded-lg mb-4"> 
      <p className="text-gray-600 mb-2">User: {post.userId.userName}</p>
      <h3 className="text-xl font-semibold mb-2">{post.content}</h3>
      <div className="mb-2">
        <h4 className="font-semibold mb-1">Comments:</h4>
        {post.comments.map((comment, index) => (
          <p key={index} className="text-gray-600">
            {comment.userId.userName}: {comment.comment}
          </p>
        ))}
      </div>
    </div>
  );
};

export default PostBox;