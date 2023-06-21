import {useEffect, useState} from "react"
import { api } from "../api"
import { User } from "../interfaces"
import { useParams } from "react-router-dom"

function FollowersUser() {
    const params = useParams()
    const [followers, setFollowers] = useState<User[]>([])


    useEffect(() => {
        async function fetchFollowers(){
            const followers = await api.get(`/followers/${params.userId}`)
            setFollowers(followers.data)
            console.log(followers.data)
        }
        fetchFollowers()
    }, [])
  return (
    <div className="p-4 ">
    <p className="text-lg font-bold mb-4">Followers</p>
    <div className="grid gap-4 ">
      {followers.map((follower) => (
        <div key={follower.id} className="p-4 bg-gray-200 rounded shadow">
          <p className="text-lg font-bold mb-2">Username: {follower.userName}</p>
          {/* <button>{following ? "Unfollow" : "Follow"}</button> */}
        </div>
      ))}
    </div>
  </div>
  )
}

export default FollowersUser