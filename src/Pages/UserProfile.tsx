import {useEffect, useState} from "react"
import { User } from "../interfaces"
import { api } from "../api"
import { useParams } from "react-router-dom"


function UserProfile() {
    const params = useParams();
    const [user, setUser] = useState<User>()
    const [followingsCount, setFollowingsCount] = useState(0);
    const [followersCount, setFollowersCount] = useState(0)
    const [isFollowing, setIsFollowing] = useState(false);

    useEffect(() => {
        async function fetchUser(){
            const userInfo = await api.get(`/userProfile/${params.userId}`)
            setUser(userInfo.data.userProfile)
            setFollowingsCount(userInfo.data.userProfile.followings.length)
            setFollowersCount(userInfo.data.userProfile.followers.length) 
            setIsFollowing(userInfo.data.isFollowing)
            console.log(userInfo.data.isFollowing)
          }

        fetchUser()
    }, [])

   async function followingUser(){
     const follow =  await api.post(`/followUser/${params.userId}`)
     console.log(follow.data.existingFollow)
      setIsFollowing(true)
    }

    async function unfollowUser(){
     const unfollow = await api.delete(`/unfollowUser/${params.userId}`)
     console.log(unfollow.data)
        setIsFollowing(false)
    }
    const followButtonLabel = isFollowing ? 'Unfollow' : 'Follow';


  return (
    <div className="container mx-auto p-4">
    <div className="flex justify-between items-center mb-4">
      <h1 className="text-3xl font-bold">User: {user?.userName}</h1>
      <h2 className="text-xl mb-2">Following: {followersCount}</h2>
      <h2 className="text-xl mb-2">Followers: {followingsCount}</h2>
 
    </div>
   
    <h2 className="text-xl mb-4">Email: {user?.email}</h2>
    <button
    onClick={isFollowing ? unfollowUser : followingUser}
    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
  >
    {followButtonLabel}
  </button>
    <h3 className="text-2xl font-bold mb-2">Posts:</h3>
    {user?.posts.map((post) => (
      <div key={post.id} className="bg-gray-200 p-4 rounded-lg mb-4">
        <p>{post.content}</p>

        <h5 className="text-lg font-semibold mt-4 mb-2">Comments:</h5>
        {post.comments.map((comment) => (
          <p key={comment.id}>
            {comment.userId.userName}: {comment.comment}
          </p>
        ))}
      </div>
    ))}
  </div>
  )
}

export default UserProfile
