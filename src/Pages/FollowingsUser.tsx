import { useEffect, useState } from "react";
import { api } from "../api";
import { User } from "../interfaces";
import { useParams } from "react-router-dom";

function FollowingsUser() {
  const params = useParams();
  const [followings, setFollowings] = useState<User[]>([]);
  const [isSameFollowings, setIsSameFollowings] = useState<number[]>([]);

  useEffect(() => {
    async function fetchFollowings() {
      const response = await api.get(`/followings/${params.userId}`);
      const { followingsUser, sameFollowings } = response.data;
      setFollowings(followingsUser);
      setIsSameFollowings(
        sameFollowings.map((sameFollowing: { id: any }) => sameFollowing.id)
      );
      console.log(response.data);
    }
    fetchFollowings();
  }, []);

  async function followUser(userId: number) {
    await api.post(`/followUser/${userId}`);
    setIsSameFollowings([...isSameFollowings, userId]);
  }

  async function unfollowUser(userId: number) {
    await api.delete(`/unfollowUser/${userId}`);
    setIsSameFollowings(isSameFollowings.filter((id) => id !== userId));
  }

  return (
    <div className="p-4">
      <p className="text-lg font-bold mb-4">Followings</p>
      {followings.map((following) => (
        <div
          key={following.id}
          className="bg-gray-200 rounded shadow w-4/6 ml-6 p-4 mb-4 flex items-center justify-between text-slate-950"
        >
          <p className="text-lg font-bold">Username: {following.userName}</p>
          {isSameFollowings.includes(following.id) ? (
            <button
              onClick={() => unfollowUser(following.id)}
              className="bg-red-950 hover:bg-red-900 text-white font-bold py-2 px-6 rounded"
            >
              Unfollow
            </button>
          ) : (
            <button
              onClick={() => followUser(following.id)}
              className="bg-sky-950 hover:bg-sky-900 text-white font-bold py-2 px-8 rounded"
            >
              Follow
            </button>
          )}
        </div>
      ))}
    </div>
  );
}

export default FollowingsUser;
