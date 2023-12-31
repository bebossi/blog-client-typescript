import { useEffect, useState } from "react";
import { User } from "../interfaces";
import { api } from "../api";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import UserPostBox from "../Components/UserPostBox";
import PostBox from "../Components/PostBox";

function UserProfile() {
  const params = useParams();
  const [user, setUser] = useState<User>();
  const [followingsCount, setFollowingsCount] = useState(0);
  const [followersCount, setFollowersCount] = useState(0);
  const [isFollowing, setIsFollowing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showUserPosts, setShowUserPosts] = useState(true);


  useEffect(() => {
    async function fetchUser() {
      const userInfo = await api.get(`/userProfile/${params.userId}`);
      setUser(userInfo.data.userProfile);
      setFollowingsCount(userInfo.data.userProfile.followings.length);
      setFollowersCount(userInfo.data.userProfile.followers.length);
      setIsFollowing(userInfo.data.isFollowing);
      setIsLoading(false);
    }

    fetchUser();
  }, []);

  async function createChat(){
    await api.post(`/chat/${params.userId}`)
  }

  async function followingUser() {
    await api.post(`/followUser/${params.userId}`);
    setIsFollowing(true);
  }

  async function unfollowUser() {
    await api.delete(`/unfollowUser/${params.userId}`);
    setIsFollowing(false);
  }
  const followButtonLabel = isFollowing ? "Unfollow" : "Follow";

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const handleShowPosts = () => {
    setShowUserPosts(true);
  };

  const handleShowLikes = () => {
    setShowUserPosts(false);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="ml-5 mt-3">
        <div className="flex justify-between">
          <img src={user?.imageUrl} className="w-24 h-24 rounded-full" />
          <Link to="/updateUser" className="border rounded-3xl p-1 h-10">
            Update User
          </Link>
        </div>
        <h1 className="text-3xl font-bold "> {user?.userName}</h1>
        <div className="flex gap-6 ">
          <Link to={`/followings/${user?.id}`}>
            <h2 className="text-xl mb-2">{followersCount} Following </h2>
          </Link>
          <Link to={`/followers/${user?.id}`}>
            <h2 className="text-xl mb-2">{followingsCount} Followers </h2>
          </Link>
        </div>
        <h2 className="text-xl mb-4"> {user?.email}</h2>
      </div>
      <div className="flex gap-4">

      <button
        onClick={isFollowing ? unfollowUser : followingUser}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 ml-5 rounded"
      >
        {followButtonLabel}
      </button>
     <Link to={"/chats"}> <button onClick={() => createChat()}>✉</button></Link>
      </div>
      <div className="flex gap-4 mb-4 ml-10">
          <button
            className={`${
              showUserPosts
                ? "underline decoration-sky-500  text-white"
                : "text-white"
            } py-1 px-3 rounded`}
            onClick={handleShowPosts}
          >
            Posts
          </button>
          <button
            className={`${
              !showUserPosts
                ? " text-white underline decoration-blue-500"
                : "text-white "
            } py-1 px-3 rounded`}
            onClick={handleShowLikes}
          >
            Likes
          </button>
        </div>
        {showUserPosts ? (
          <>
            <h3 className="text-2xl font-bold mb-2 ml-10">Posts</h3>
            <UserPostBox key={user?.id} user={user as User} />
          </>
        ) : (
          <>
            <h3 className="text-2xl font-bold mb-2 ml-10">Likes</h3>
            {user?.likes.map((like) => (
              <PostBox post={like.postId} />
            ))}
          </>
        )}
      </div>
    
  );
}

export default UserProfile;
