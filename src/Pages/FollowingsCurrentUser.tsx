import {useEffect, useState} from "react"
import { api } from "../api"
import { User } from "../interfaces"

function FollowingsCurrentUser() {

    const [followings, setFollowings] = useState<User[]>([])


    useEffect(() => {
        async function fetchFollowers(){
            const followers = await api.get("/followings")
            setFollowings(followers.data)
            console.log(followers.data)
        }
        fetchFollowers()
    }, [])
  return (
    <div>
        <div>
    {followings.map((following) => (
      <div key={following.id}>
        <p>Username: {following.userName}</p>
        {/* <button>{following ? "Unfollow" : "Follow"}</button> */}
      </div>
    ))}
  </div>
    </div>
  )
}

export default FollowingsCurrentUser
