import {useEffect, useState} from "react"
import { api } from "../api"
import { User } from "../interfaces"


function FollowersCurrentUser() {

    const [followers, setFollowers] = useState<User[]>([])
    const [followedUserIds, setFollowedUserIds] = useState<number[]>([]);


    useEffect(() => {
        async function fetchFollowers(){
            const followers = await api.get("/followers")
            setFollowers(followers.data.followers)
            setFollowedUserIds(followers.data.isFollowFollower.map((follower: { id: any; }) => follower.id))
        }
        fetchFollowers()
    }, [])
    


  return (
    <div className="p-4 ">
    <p className="text-lg font-bold mb-4">Followers</p>
    {followers.map((follower) => (
    <div key={follower.id} className="p-4 bg-gray-200 rounded shadow">
        <p className="text-lg font-bold mb-2">Username: {follower.userName}</p>
        {followedUserIds.includes(follower.id) ? (
            <button>Unfollow</button>
        ) : (
            <button>Follow</button>
        )}
    </div>
))}
    </div>
  )
}

export default FollowersCurrentUser
