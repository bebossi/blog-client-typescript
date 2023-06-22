import { api } from "../api"
import {  useEffect, useState } from "react";
import PostBox from "../Components/PostBox";
import { Post} from "../interfaces"

function HomeScreen() {
    const [posts, setPosts] = useState<Post[]>([])
    const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {
        async function fetchPosts(){
            const response = await api.get("/feed")
            

            setPosts([...response.data])
            setIsLoading(false);

        }
        fetchPosts()    
    }, [])  

    if (isLoading) {
        return <div>Loading...</div>;
      }
  
  return (
 <div> 
    <h1 className="text-4xl text-center text-slate-50" >Feed</h1>
    {posts.map((post) => (
        <PostBox key={post.id} post={post} />
    ))}
 </div>
  )
}

export default HomeScreen
