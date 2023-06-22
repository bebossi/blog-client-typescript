import {useEffect, useState} from "react"
import { User } from "../interfaces"
import { api } from "../api"
import { useParams } from "react-router-dom"
import { Link } from "react-router-dom";


function UserProfile() {
    const params = useParams();
    const [user, setUser] = useState<User>()
    const [followingsCount, setFollowingsCount] = useState(0);
    const [followersCount, setFollowersCount] = useState(0)
    const [isFollowing, setIsFollowing] = useState(false);
    const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {
        async function fetchUser(){
            const userInfo = await api.get(`/userProfile/${params.userId}`)
            setUser(userInfo.data.userProfile)
            setFollowingsCount(userInfo.data.userProfile.followings.length)
            setFollowersCount(userInfo.data.userProfile.followers.length) 
            setIsFollowing(userInfo.data.isFollowing)
            setIsLoading(false);
          }

        fetchUser()
    }, [])

   async function followingUser(){
       await api.post(`/followUser/${params.userId}`)
      setIsFollowing(true)
    }

    async function unfollowUser(){
      await api.delete(`/unfollowUser/${params.userId}`)
        setIsFollowing(false)
    }
    const followButtonLabel = isFollowing ? 'Unfollow' : 'Follow';

    if (isLoading) {
      return <div>Loading...</div>;
    }


  return (
    <div className="container mx-auto p-4 ">
    <div className="flex justify-between items-center mb-4">
      <h1 className="text-3xl font-bold">User: {user?.userName}</h1>
    <Link to={`/followings/${user?.id}`} > <h2 className="text-xl mb-2">Following: {followersCount}</h2></Link> 
    <Link to={`/followers/${user?.id}`} > <h2 className="text-xl mb-2">Followers: {followingsCount}</h2></Link>
 
    </div>
   
    <h2 className="text-xl mb-4">Email: {user?.email}</h2>
    <button
    onClick={isFollowing ? unfollowUser : followingUser}
    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
  >
    {followButtonLabel}
  </button>
    <h3 className="text-2xl font-bold mb-2 ">Posts:</h3>
    {user?.posts.map((post) => (
      <div key={post.id} className="bg-gray-200 p-4 rounded-lg mb-4 text-slate-950">
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
