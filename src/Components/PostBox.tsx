import React, { useState } from "react";
import { Post} from "../interfaces"
import {  Link } from "react-router-dom";
import CreateComment from "../Pages/CreateComment";
import { useUserContext } from "../Components/loggedUserContext";
import { api } from "../api"



interface PostProps {
  post: Post;
}

const PostBox: React.FC<PostProps> = ({ post }) => {
  const user = useUserContext() ;
  const [comment, setComment] = useState("")
  const [showForm, setShowForm] = useState(false);
  const [selectedCommentId, setSelectedCommentId] = useState<number | null>(null);
  const [expandedCommentId, setExpandedCommentId] = useState<number | null>(
    null
  );



async function handleDeleteComment(commentId: number){
  try{
  await api.delete(`/comment/${post.id}/${commentId}`)
  console.log("deleted")
  }catch(err){
    console.log(err)
  } 
}
 async function handleUpdateComment(commentId: number){
  try{
    await api.put(`/comment/${post.id}/${commentId}`, {comment})
    setShowForm(false)
    setSelectedCommentId(null);
    console.log("comment updated")

  }catch(err){
    console.log(err)
  }
 }

 const toggleExpandComment = (commentId: number) => {
  setExpandedCommentId((prevId) => (prevId === commentId ? null : commentId));
};

  return (
    <div className="bg-gray-200 text-slate-950 p-4 rounded-lg m-6 ">
    <Link to={`/userProfile/${post.userId.id}`} className="text-gray-600 mb-2">
      User: {post.userId.userName}
    </Link>
    <h3 className="text-xl font-semibold mb-2">{post.content}</h3>
    <div className="mb-2">
      <h4 className="font-semibold mb-1">Comments:</h4>
      {post.comments.map((comment, index) => (
        <div key={index} className="text-gray-600 flex items-center space-x-2">
          <Link to={`/userProfile/${comment.userId.id}`}>
            {comment.userId.userName}
          </Link>
          <span>{comment.comment}</span>
          {comment.userId.id === user?.id && (
            
            <>
               <button
                  className="text-gray-950  text-l font-extrabold hover:shadow-black"
                  onClick={() => toggleExpandComment(comment.id)}
                >
                  ...
                </button>
              {expandedCommentId === comment.id ? (
                <>
                  <button
                    className="bg-sky-950 hover:bg-sky-900 text-white font-bold py-0.25 px-2 rounded-xl"
                    onClick={() => {
                      setShowForm(true);
                      setSelectedCommentId(comment.id);
                    }}
                  >
                    Update
                  </button>
                  <button
                    className="bg-red-950 hover:bg-red-900 text-white font-bold py-0.25 px-2 rounded-xl"
                    onClick={() => handleDeleteComment(comment.id)}
                  >
                    Delete
                  </button>
                </>
              ) : (
                null
              )}
           
            </>
            
          )}
        </div>
        
      ))}
      
      {showForm && selectedCommentId !== null && (
        <form className="flex items-center space-x-2">
          <input
            type="text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="border-gray-300 border-solid border-2 rounded-md p-2"
          />
          <button
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => handleUpdateComment(selectedCommentId)}
          >
            Save
          </button>
        </form>
      )}
    </div>
    <CreateComment postId={post.id} />
  </div>
  );
};

export default PostBox;