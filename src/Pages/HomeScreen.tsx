import { api } from "../api"
import {  useEffect, useState } from "react";
import PostBox from "../Components/PostBox";
import {User, Post, Comment} from "../interfaces"


  interface PostProps {
    post: Post;
  }

function HomeScreen() {
    const [posts, setPosts] = useState<Post[]>([])

    useEffect(() => {
        async function fetchPosts(){
            const response = await api.get("/feed")

            setPosts([...response.data])
            console.log(posts.map((post) => post.comments.map((comment) => comment.userId.userName)) ) 
        }
        fetchPosts()  
    }, [])  
    // useEffect(() => {
    //     async function fetchPosts() {
    //       try {
    //         const response = await api.get("/feed");
    //         const postsData = response.data.map((post: Post) => ({
    //           ...post,
    //           userId: post.userId, // Extract the userId from the nested object
    //         }));
    //         setPosts(postsData);
    //         console.log(posts)
    //       } catch (error) {
    //        console.log(error) 
    //       }
    //     }
    
    //     fetchPosts();  
    //   }, []);
 

  return (
 <div>
    {posts.map((post) => (
        <PostBox key={post.id} post={post} />
    ))}
 </div>
  )
}

export default HomeScreen
