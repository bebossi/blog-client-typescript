import { useEffect, useState } from "react";
import { api } from "../api";
import { User } from "../interfaces";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

function FollowersUser() {
  const params = useParams();
  const [followers, setFollowers] = useState<User[]>([]);
  const [isFollowingHisFollowers, setIsFollowingHisFollowers] = useState<
    number[]
  >([]);

  useEffect(() => {
    async function fetchFollowers() {
      const response = await api.get(`/followers/${params.userId}`);
      const { followers, followHisFollowers } = response.data;
      setFollowers(followers);
      setIsFollowingHisFollowers(
        followHisFollowers.map(
          (followHisFollower: { id: any }) => followHisFollower.id
        )
      );
    }
    fetchFollowers();
  }, []);

  async function followUser(userId: number) {
    await api.post(`/followUser/${userId}`);
    setIsFollowingHisFollowers([...isFollowingHisFollowers, userId]);
  }

  async function unfollowUser(userId: number) {
    await api.delete(`/unfollowUser/${userId}`);
    setIsFollowingHisFollowers(
      isFollowingHisFollowers.filter((id) => id !== userId)
    );
  }

  return (
    <div className="p-4 h-screen">
    <p className="text-lg font-bold mb-4">Followers</p>
    {followers.map((follower) => (
            <Link key={follower.id} to={`/userProfile/${follower.id}`}>

      <div
        key={follower.id}
        className="bg-gray-200 rounded w-4/6 shadow p-4 mb-4 flex items-center justify-between text-slate-950 ml-6"
      >
        <p className="text-lg font-bold">Username: {follower.userName}</p>
        {isFollowingHisFollowers.includes(follower.id) ? (
          <button
           onClick={(event) => {
                  event.preventDefault();
                  unfollowUser(follower.id);
                }}
            className="bg-red-950 hover:bg-red-900 text-white font-bold py-2 px-6 rounded"
          >
            Unfollow
          </button>
        ) : (
          <button
             onClick={(event) => {
                  event.preventDefault();
                  followUser(follower.id);
                }}
            className="bg-sky-950 hover:bg-sky-900 text-white font-bold py-2 px-8 rounded"
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

export default FollowersUser;
