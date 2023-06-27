import { useEffect, useState } from "react";
import { api } from "../api";
import { useParams } from "react-router-dom";
import PostBox from "../Components/PostBox";
import { Post } from "../interfaces";

function PostDetails() {
  const params = useParams();
  const [post, setPost] = useState<Post | undefined>();
  useEffect(() => {
    async function fetchPost() {
      try {
        const response = await api.get(`/post/${params.postId}`);
        console.log(response.data)
        setPost(response.data);
      } catch (err) {
        console.log(err);
      }
    }
    fetchPost();
  }, []);

  return <div className="h-screen mt-5">
    {post && <PostBox key={post.id} post={post} />}
     </div>;
}

export default PostDetails;
