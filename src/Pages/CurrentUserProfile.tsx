import { useEffect, useState } from "react";
import { api } from "../api";
import { User } from "../interfaces";
import { Link } from "react-router-dom";

function CurrentUserProfile() {
  const [user, setUser] = useState<User>();
  const [followingsCount, setFollowingsCount] = useState(0);
  const [followers, setFollowers] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchPosts() {
      const response = await api.get("/profilePost");

      setUser(response.data);
      setFollowingsCount(response.data.followings.length);
      setFollowers(response.data.followers.length);
      setIsLoading(false);
    }
    fetchPosts();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold ">User: {user?.userName}</h1>
        <Link to={`/followings`}>
          <h2 className="text-xl mb-2">{followers} Following </h2>
        </Link>
        <Link to={`/followers`}>
          <h2 className="text-xl mb-2">{followingsCount} Followers </h2>
        </Link>

        <div>
          <Link to="/createPost" className="btn btn-blue mr-10">
            Create Post
          </Link>
          <Link to="/updateUser" className="btn btn-blue">
            Update User
          </Link>
        </div>
      </div>
      <h2 className="text-xl mb-4">Email: {user?.email}</h2>

      <h3 className="text-2xl font-bold mb-2">Posts:</h3>
      {user?.posts.map((post) => (
        <div key={post.id} className=" text-slate-950 bg-gray-200 p-4 rounded-lg mb-4">
          <p>{post.content}</p>
          {post.imageUrl && <img src={post.imageUrl} alt="Post Image" className="max-w-full mb-4" />}

          <h5 className="text-lg font-semibold mt-4 mb-2">Comments:</h5>
          {post.comments.map((comment) => (
            <p key={comment.id}>
              {comment.userId.userName}: {comment.comment}
            </p>
          ))}
        </div>
      ))}
    </div>
  );
}

export default CurrentUserProfile;