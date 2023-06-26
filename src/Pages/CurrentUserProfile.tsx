import { useEffect, useState } from "react";
import { api } from "../api";
import { User } from "../interfaces";
import { Link } from "react-router-dom";
import UserPostBox from "../Components/UserPostBox";

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
      <div className="ml-5 mt-3">
        <div className="flex justify-between">         
            <img src={user?.imageUrl} className="w-24 h-24 rounded-full" />         
          <Link to="/updateUser" className="border rounded-3xl p-1 h-10">
            Update User
          </Link>
        </div>
        <h1 className="text-3xl font-bold "> {user?.userName}</h1>
        <div className="flex gap-6 ">
          <Link to={`/followings`}>
            <h2 className="text-xl mb-2">{followers} Following </h2>
          </Link>
          <Link to={`/followers`}>
            <h2 className="text-xl mb-2">{followingsCount} Followers </h2>
          </Link>
        </div>

        <h2 className="text-xl mb-4"> {user?.email}</h2>
      </div>
      <h3 className="text-2xl font-bold mb-2 ml-10">Posts</h3>
      <UserPostBox key={user?.id} user={user as User} />
    </div>
  );
}

export default CurrentUserProfile;
