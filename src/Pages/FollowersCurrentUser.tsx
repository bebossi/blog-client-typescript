import {useEffect, useState} from "react"
import { api } from "../api"
import { User } from "../interfaces"


function FollowersCurrentUser() {

    const [followers, setFollowers] = useState<User[]>([])

    useEffect(() => {
        async function fetchFollowers(){
            const followers = await api.get("/followers")
            setFollowers(followers.data)
            console.log(followers.data)
        }
        fetchFollowers()
    }, [])


  return (
    <div>
    {followers.map((follower) => (
      <div key={follower.id}>
        <p>Username: {follower.userName}</p>
        {/* <button>{follower ? "Unfollow" : "Follow"}</button> */}
      </div>
    ))}
  </div>
  )
}

export default FollowersCurrentUser
