import {useEffect, useState} from "react"
import { api } from "../api"
import { User } from "../interfaces"
import { useParams } from "react-router-dom"

function FollowingsUser() {
    const params = useParams()
    const [followings, setFollowings] = useState<User[]>([])


    useEffect(() => {
        async function fetchFollowings(){
            const followings = await api.get(`/followings/${params.userId}`)
            setFollowings(followings.data)
            console.log(followings.data)
        }
        fetchFollowings()
    }, [])
  return (
    <div className="p-4 ">
      <p className="text-lg font-bold mb-4">Followings</p>
        <div className="grid gap-4 ">
    {followings.map((following) => (
      <div key={following.id} className="p-4 bg-gray-200 rounded shadow">
        <p className="text-lg font-bold mb-2">Username: {following.userName}</p>
        {/* <button>{following ? "Unfollow" : "Follow"}</button> */}
      </div>
    ))}
  </div>
    </div>
  )
}

export default FollowingsUser