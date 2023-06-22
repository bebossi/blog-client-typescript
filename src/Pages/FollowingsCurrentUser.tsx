import { useEffect, useState } from "react";
import { api } from "../api";
import { User } from "../interfaces";

function FollowingsCurrentUser() {

  const [isFollowing, setIsFollowing] = useState(true);
  const [followings, setFollowings] = useState<User[]>([]);

  useEffect(() => {
    async function fetchFollowers() {
      const followers = await api.get("/followings");
      setFollowings(followers.data);
    }
    fetchFollowers();
  }, []);

  async function followUser(userId: number) {
    await api.post(`/followUser/${userId}`);
    setIsFollowing(true);
  }

  async function unfollowUser(userId: number) {
    await api.delete(`/unfollowUser/${userId}`);
    setIsFollowing(false);
  }

  return (
    <div className="p-4">
      <p className="text-lg font-bold mb-4">Followings</p>
      <div className="grid gap-4">
        {followings.map((following) => (
          <div key={following.id} className="p-4 bg-gray-200 rounded shadow">
            <p className="text-lg font-bold mb-2">
              Username: {following.userName}
            </p>
            {isFollowing === true ? (
              <button
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
                onClick={() => unfollowUser(following.id)}
              >
                Unfollow
              </button>
            ) : (
              <button
                className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
                onClick={() => followUser(following.id)}
              >
                Follow
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default FollowingsCurrentUser;
