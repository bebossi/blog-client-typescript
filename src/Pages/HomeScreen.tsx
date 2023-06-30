import { api } from "../api";
import { useEffect, useState } from "react";
import PostBox from "../Components/PostBox";
import { Post } from "../interfaces";

function HomeScreen() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchPosts() {
      const response = await api.get("/feed");

      setPosts([...response.data]);
      setIsLoading(false);
    }
    fetchPosts();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col min-h-screen ">
      <div className="bg-gray-950 opacity-95 fixed w-full">
        <div className="ml-96">
          <h1 className="text-3xl mb-8 mt-4">Feed</h1>
        </div>
      </div>
      <div className="mt-24">
        {posts.map((post) => (
          <PostBox key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}

export default HomeScreen;
