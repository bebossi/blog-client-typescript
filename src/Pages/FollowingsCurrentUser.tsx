import {useEffect, useState} from "react"
import { api } from "../api"
import { User } from "../interfaces"
import { useParams } from "react-router-dom"


function FollowingsCurrentUser() {
  const params = useParams();


    const [followings, setFollowings] = useState<User[]>([])
    const [isFollowing, setIsFollowing] = useState(false)


    useEffect(() => {
        async function fetchFollowers(){
            const followers = await api.get("/followings")
            setFollowings(followers.data)
        }
        fetchFollowers()
    }, [])

    async function followUser(){
      await api.post(`/followUser/${params.userId}`)
      setIsFollowing(true)
    }

    async function unfollowUser(){
      await api.delete(`/unfollowUser/${params.userId}`)
      setIsFollowing(false)
    }


  return (
    <div className="p-4">
      <p className="text-lg font-bold mb-4" >Followings</p>
        <div className="grid gap-4" >
    {followings.map((following) => (
      <div key={following.id} className="p-4 bg-gray-200 rounded shadow" >
        <p className="text-lg font-bold mb-2">Username: {following.userName}</p>
        {/* <button>{following ? "Unfollow" : "Follow"}</button> */}
      </div>
    ))}
  </div>
    </div>
  )
}

export default FollowingsCurrentUser
