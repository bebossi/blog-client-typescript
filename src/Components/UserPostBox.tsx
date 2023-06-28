import React, { useState, useEffect } from "react";
import { User, Post } from "../interfaces";
import { Link } from "react-router-dom";
import CreateComment from "../Pages/CreateComment";
import { useUserContext } from "../Components/loggedUserContext";
import { api } from "../api";

interface UserProps {
  user: User;
}

const UserPostBox: React.FC<UserProps> = ({ user }) => {
  const currentUser = useUserContext();
  const [comment, setComment] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [selectedCommentId, setSelectedCommentId] = useState<number | null>(
    null
  );
  const [expandedCommentId, setExpandedCommentId] = useState<number | null>(
    null
  );
  const [showDeleteButton, setShowDeleteButton] = useState(false);
  const [showUpdateButton, setShowUpdateButton] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [likedPosts, setLikedPosts] = useState<number[]>([]);
  const [showComments, setShowComments] = useState(false); // Track visibility of comments


  async function checkIfIsLiked(postId: number) {
    try {
      const response = await api.get(`/isLiked/${postId}`);
      setIsLiked(response.data.isLiked);
      if (response.data.isLiked) {
        setLikedPosts((prevLikedPosts) => [...prevLikedPosts, postId]);
      } else {
        setLikedPosts((prevLikedPosts) =>
          prevLikedPosts.filter((id) => id !== postId)
        );
      }
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    user.posts.map((post) => checkIfIsLiked(post.id));
  }, []);

  async function likePost(postId: number) {
    try {
      await api.post(`/like/${postId}`);
      setIsLiked(true);
      setLikedPosts((prevLikedPosts) => [...prevLikedPosts, postId]);
    } catch (err) {
      console.log(err);
    }
  }

  async function dislikePost(postId: number) {
    try {
      await api.delete(`/dislike/${postId}`);
      setIsLiked(false);
      setLikedPosts((prevLikedPosts) =>
        prevLikedPosts.filter((id) => id !== postId)
      );
    } catch (err) {
      console.log(err);
    }
  }

  async function handleDeleteComment(commentId: number, postId: number) {
    try {
      await api.delete(`/comment/${postId}/${commentId}`);
      console.log("deleted");
    } catch (err) {
      console.log(err);
    }
  }

  async function handleUpdateComment(commentId: number, postId: number) {
    try {
      await api.put(`/comment/${postId}/${commentId}`, { comment });
      setShowForm(false);
      setSelectedCommentId(null);
      console.log("comment updated");
    } catch (err) {
      console.log(err);
    }
  }

  async function handleDeletePost(postId: number) {
    try {
      await api.delete(`/post/${postId}`);
    } catch (err) {
      console.log(err);
    }
  }

  async function handleUpdatePost(postId: number) {
    try {
      await api.put(`/post/${postId}`);
    } catch (err) {
      console.log(err);
    }
  }

  const toggleExpandComment = (commentId: number) => {
    setExpandedCommentId((prevId) => (prevId === commentId ? null : commentId));
    setShowForm(false);
  };

  const toggleDeleteButton = () => {
    setShowDeleteButton((prevShowDeleteButton) => !prevShowDeleteButton);
    setShowUpdateButton((prevShowUpdateButton) => !prevShowUpdateButton);
  };

  const toggleComments = () => {
    setShowComments((prevShowComments) => !prevShowComments);
  };

  return (
    <div className=" text-slate-950 p-4 rounded-lg m-6">
      <div className="mb-2 w-9/12">
        <div></div>
        {user.posts.map((post: Post) => (
          <div key={post.id} className="mb-4 rounded-xl bg-slate-200">
            <div className="py-5 px-10 mx-5 p">
              <div className="flex justify-between">
                <Link
                  className="flex items-center gap-x-3"
                  to={`/userProfile/${user.id}`}
                >
                  {user.imageUrl && (
                    <img
                      className="h10 w-10 rounded-full"
                      src={user.imageUrl}
                    />
                  )}
                  <p className="font-semibold text-lg">{user.userName}</p>
                </Link>
                <div className="space-x-2">
                {user.id === currentUser?.id && (
                  <button
                    className="text-gray-950  text-l font-extrabold hover:shadow-black"
                    onClick={toggleDeleteButton}
                  >
                    ...
                  </button>
                )}
                {showDeleteButton && showUpdateButton && (
                  <>
                    <button
                      className="bg-red-950 hover:bg-red-900 text-white font-bold py-0.25 px-2 rounded-xl h-6"
                      onClick={() => handleDeletePost(post.id)}
                    >
                      Delete
                    </button>
                    <button
                      className="bg-sky-950 hover:bg-sky-900 text-white font-bold py-0.25 px-2 rounded-xl h-6"
                      onClick={() => handleUpdatePost(post.id)}
                    >
                      Update
                    </button>
                  </>
                )}
                </div>
              </div>
              <h3 className="text-2xl font-normal mb-2">{post.content}</h3>
              {post.imageUrl && (
                <img src={post.imageUrl} className="w-56 h-56" />
              )}
              {likedPosts.includes(post.id) ? (
                <button onClick={() => dislikePost(post.id)}>❤️</button>
              ) : (
                <button onClick={() => likePost(post.id)}> ♡</button>
              )}
              <div className="mb-2">
                <h4 className="font-semibold mb-1">Comments</h4>
                
                {post.comments.map((comment, index) => (
                  <div
                    key={index}
                    className="text-gray-600 flex items-center space-x-2"
                  >
                    <Link to={`/userProfile/${comment.userId.id}`}>
                      {comment.userId.userName}
                    </Link>
                    <span>{comment.comment}</span>
                    {comment.userId.id === currentUser?.id && (
                      <>
                        <button
                          className="text-gray-950  text-l font-extrabold hover:shadow-black"
                          onClick={() => toggleExpandComment(comment.id)}
                        >
                          ...
                        </button>
                        {expandedCommentId === comment.id && (
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
                              onClick={() =>
                                handleDeleteComment(comment.id, post.id)
                              }
                            >
                              Delete
                            </button>
                          </>
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
                      onClick={() =>
                        handleUpdateComment(selectedCommentId, post.id)
                      }
                    >
                      Save
                    </button>
                  </form>
                )}
              </div>
              <CreateComment postId={post.id} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserPostBox;
