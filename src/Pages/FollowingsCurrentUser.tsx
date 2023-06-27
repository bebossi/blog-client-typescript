import { useEffect, useState } from "react";
import { api } from "../api";
import { User } from "../interfaces";
import { Link } from "react-router-dom";

function FollowingsCurrentUser() {

  // const [isFollowing, setIsFollowing] = useState(true);
  const [followings, setFollowings] = useState<User[]>([]);

  useEffect(() => {
    async function fetchFollowings() {
      const response = await api.get("/followings");
      const users = response.data.map((user: User) => ({
        ...user,
        isFollowing: true, 
      }));
      setFollowings(users);
    }
    fetchFollowings();
  }, []);

  async function followUser(userId: number) {
    await api.post(`/followUser/${userId}`);
    setFollowings((prevFollowings) =>
      prevFollowings.map((user) =>
        user.id === userId ? { ...user, isFollowing: true } : user
      )
    );
  }

  async function unfollowUser(userId: number) {
    await api.delete(`/unfollowUser/${userId}`);
    setFollowings((prevFollowings) =>
      prevFollowings.map((user) =>
        user.id === userId ? { ...user, isFollowing: false } : user
      )
    );
  }

  // async function followUser(userId: number) {
  //   await api.post(`/followUser/${userId}`);
  //   setIsFollowing(true);
  // }

  
  // async function unfollowUser(userId: number) {
  //   await api.delete(`/unfollowUser/${userId}`);
  //   setIsFollowing(false);
  // }

  return (
    <div className="p-4 h-screen">
      <p className="text-lg font-bold mb-4">Followings</p>
      <div className="grid gap-4 ">
        {followings.map((following) => (
          <Link to={`/userProfile/${following.id}`}>
          <div key={following.id} className="p-4 bg-gray-200 rounded shadow text-slate-950 flex items-center justify-between w-9/12">
           <p className="text-lg font-bold mb-2">
              Username: {following.userName}
            </p>
            {following.isFollowing ? (
              <button
                className="bg-red-950 hover:bg-red-900 text-white font-bold py-2 px-4 rounded"
                onClick={() => unfollowUser(following.id)}
              >
                Unfollow
              </button>
            ) : (
              <button
                className="bg-sky-950 hover:bg-sky-900 text-white font-bold py-2 px-4 rounded"
                onClick={() => followUser(following.id)}
              >
                Follow
              </button>
            )}
          </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default FollowingsCurrentUser;
