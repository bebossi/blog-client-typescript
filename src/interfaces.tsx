export interface User {
    id: number
    userName: string
    imageUrl: string 
    email: string
    posts: Post[]
    comments: Comment[]
    isFollowing: boolean;
    likes: Like[]
}
export interface Comment {
    id: number
    comment: string
    userId: User
    postId: Post
}

export interface Post {
    id: number;
  content: string;
  imageUrl: string;
  userId: User; 
  comments: Comment[]
  }
  export interface Like {
    id: number;
    postId: Post;
    userId: User;
  }
  export interface Search {
    id: number;
    userId: User;
    search: string;
  }