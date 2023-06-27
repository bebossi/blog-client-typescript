import { useEffect, useState } from "react";
import { api } from "../api";
import { User } from "../interfaces";
import { Link } from "react-router-dom";

function FollowersCurrentUser() {
  const [followers, setFollowers] = useState<User[]>([]);
  const [followedUserIds, setFollowedUserIds] = useState<number[]>([]);

  useEffect(() => {
    async function fetchFollowers() {
      const response = await api.get("/followers");
      console.log(response.data)
      const { followers, isFollowFollower } = response.data;
      console.log(followers)

      setFollowers(followers);
      setFollowedUserIds(
        isFollowFollower.map((follower: { id: any }) => follower.id)
      );
    }

    fetchFollowers();
  }, []);

  async function followUser(userId: number) {
    await api.post(`/followUser/${userId}`);
    setFollowedUserIds([...followedUserIds, userId]);
  }

  async function unfollowUser(userId: number) {
    await api.delete(`/unfollowUser/${userId}`);
    setFollowedUserIds(followedUserIds.filter((id) => id !== userId));
  }

  return (
    <div className="p-4 h-screen">
    <p className="text-lg font-bold mb-4">Followers</p>
    {followers.map((follower) => (
      <Link to={`/userProfile/${follower.id}`}>
      <div
        key={follower.id}
        className="bg-gray-200 rounded shadow p-4 mb-4 flex items-center justify-between text-slate-950 w-9/12"
      >
        <p className="text-lg font-bold">Username: {follower.userName}</p>
        {followedUserIds.includes(follower.id) ? (
          <button
            onClick={() => unfollowUser(follower.id)}
            className="bg-red-950 hover:bg-red-900 text-white font-bold py-2 px-6 rounded"
          >
            Unfollow
          </button>
        ) : (
          <button
            onClick={() => followUser(follower.id)}
            className="bg-sky-950 hover:bg-blue-900 text-white font-bold py-2 px-8 rounded"
          >
            Follow
          </button>
        )}
      </div>
      </Link>
    ))}
  </div>
  );
}

export default FollowersCurrentUser;
