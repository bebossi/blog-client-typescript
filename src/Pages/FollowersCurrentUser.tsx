// import {useEffect, useState} from "react"
// import { api } from "../api"
// import { User } from "../interfaces"

// function FollowersCurrentUser() {

//     const [followers, setFollowers] = useState<User[]>([])
//     const [ isFollowing, setIsFollowing] = useState(null)
//     const [followedUserIds, setFollowedUserIds] = useState<number[]>([]);

//     useEffect(() => {
//         async function fetchFollowers(){
//             const followers = await api.get("/followers")
//             setFollowers(followers.data.followers)
//             setFollowedUserIds(followers.data.isFollowFollower.map((follower: { id: any; }) => follower.id))
//         }
//         fetchFollowers()
//     }, [])

//     async function followUser(userId: number){
//       await api.post(`/followUser/${userId}`)

//     }

//     async function unfollowUser(userId: number){
//       await api.delete(`/unfollowUser/${userId}`)
// }

//   return (
//     <div className="p-4 ">
//     <p className="text-lg font-bold mb-4">Followers</p>
//     {followers.map((follower) => (
//     <div key={follower.id} className="p-4 bg-gray-200 rounded shadow">
//         <p className="text-lg font-bold mb-2">Username: {follower.userName}</p>
//         {followedUserIds.includes(follower.id) ? (
//             <button>Unfollow</button>
//         ) : (
//             <button>Follow</button>
//         )}
//     </div>
// ))}
//     </div>
//   )
// }

// export default FollowersCurrentUser

import { useEffect, useState } from "react";
import { api } from "../api";
import { User } from "../interfaces";

function FollowersCurrentUser() {
  const [followers, setFollowers] = useState<User[]>([]);
  const [followedUserIds, setFollowedUserIds] = useState<number[]>([]);

  useEffect(() => {
    async function fetchFollowers() {
      const response = await api.get("/followers");
      const { followers, isFollowFollower } = response.data;

      setFollowers(followers);
      setFollowedUserIds(
        isFollowFollower.map((follower: { id: any }) => follower.id)
      );
    }

    fetchFollowers();
  }, []);

  async function followUser(userId: number) {
    await api.post(`/followUser/${userId}`);
    // Update followedUserIds state to include the newly followed user ID
    setFollowedUserIds([...followedUserIds, userId]);
  }

  async function unfollowUser(userId: number) {
    await api.delete(`/unfollowUser/${userId}`);
    // Remove the unfollowed user ID from followedUserIds state
    setFollowedUserIds(followedUserIds.filter((id) => id !== userId));
  }

  return (
    <div className="p-4">
      <p className="text-lg font-bold mb-4">Followers</p>
      <div className="grid gap-4">
        {followers.map((follower) => (
          <div
            key={follower.id}
            className="flex space-x-96 bg-gray-200 rounded shadow p-4"
          >
            <p className="text-lg font-bold mr-2">
              Username: {follower.userName}
            </p>
            {followedUserIds.includes(follower.id) ? (
              <button
                onClick={() => unfollowUser(follower.id)}
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
              >
                Unfollow
              </button>
            ) : (
              <button
                onClick={() => followUser(follower.id)}
                className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
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

export default FollowersCurrentUser;
