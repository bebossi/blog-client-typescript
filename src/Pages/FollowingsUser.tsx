import { useEffect, useState } from "react";
import { api } from "../api";
import { User } from "../interfaces";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

function FollowingsUser() {
  const params = useParams();
  const [followings, setFollowings] = useState<User[]>([]);
  const [currentUserFollowings, setCurrentUserFollowings] = useState<number[]>(
    []
  );
  const [isSameFollowings, setIsSameFollowings] = useState<number[]>([]);

  useEffect(() => {
    async function fetchFollowings() {
      const response = await api.get(`/followings/${params.userId}`);
      const { followingsUser, sameFollowings, followingsCurrentUser } =
        response.data;
      setFollowings(followingsUser);
      setIsSameFollowings(
        sameFollowings.map((sameFollowing: { id: User }) => sameFollowing.id)
      );
      setCurrentUserFollowings(followingsCurrentUser);
    }
    fetchFollowings();
  }, []);

  async function followUser(userId: number) {
    await api.post(`/followUser/${userId}`);
    setIsSameFollowings([...isSameFollowings, userId]);
    setCurrentUserFollowings([...isSameFollowings, userId]);
  }

  async function unfollowUser(userId: number) {
    await api.delete(`/unfollowUser/${userId}`);
    setCurrentUserFollowings((prevFollowings) =>
    prevFollowings.filter((id) => id !== userId)
  );
  setIsSameFollowings((prevFollowings) => 
    prevFollowings.filter((id) => id !== userId)
  );
  }

  return (
    <div className="p-4 h-screen">
      <p className="text-lg font-bold mb-4">Followings</p>
      {followings.map((following) => (
        <Link key={following.id} to={`/userProfile/${following.id}`}>
          <div
            key={following.id}
            className="bg-gray-200 rounded shadow w-4/6 ml-6 p-4 mb-4 flex items-center justify-between text-slate-950"
          >
            <p className="text-lg font-bold">Username: {following.userName}</p>
            {isSameFollowings.includes(following.id) ||
            currentUserFollowings.includes(following.id) ? (
              <button
                onClick={(event) => {
                  event.preventDefault();
                  unfollowUser(following.id);
                }}
                className="bg-red-950 hover:bg-red-900 text-white font-bold py-2 px-6 rounded"
              >
                Unfollow
              </button>
            ) : (
              <button
                onClick={(event) => {
                  event.preventDefault();
                  followUser(following.id);
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

export default FollowingsUser;
