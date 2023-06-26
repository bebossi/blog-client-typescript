import {User, Post } from '../interfaces';
import { useLocation } from 'react-router-dom';



function SearchBarContent() {

    const location = useLocation();
  const searchResults = location.state?.searchResults;

  if (!searchResults) {
    // Handle case when searchResults is undefined
    return <div>No search results found.</div>;
  }
  return (
    <div className='h-screen'>
           <div>
       <h2> Users</h2>
       {searchResults.users.map((user: User) => (
          <div key={user.id}>
            <p>Username: {user.userName}</p>
            <p>Email: {user.email}</p>
          </div>
        ))}
         <h2>Posts:</h2>
      {searchResults.posts.map((post: Post) => (
        <div key={post.id}>
          <p>{post.content}</p>
          <img src={post.imageUrl} alt="Post Image" />
        </div>
      ))}
       </div>
      
      
    </div>
  )
}

export default SearchBarContent
