import { User, Post } from "../interfaces";
import { useLocation } from "react-router-dom";
import PostBox from "../Components/PostBox";

function SearchBarContent() {
  const location = useLocation();
  const searchResults = location.state?.searchResults;

  if (!searchResults) {
    return <div>No search results found.</div>;
  }
  return (
    <div className="">
      <div >
        <h2 className="m-3"> Users</h2>
        {searchResults.users.map((user: User) => (
          <div className="flex gap-3 items-center m-4" key={user.id}>
            {<img className="h-12 w-12 rounded-full" src={user.imageUrl} />}
            <p>{user.userName}</p>
          </div>
        ))}
        </div>
        <div>
        <h2 className="m-3">Posts</h2>
        {searchResults.posts.map((post: Post) => (
          <PostBox key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}

export default SearchBarContent;
