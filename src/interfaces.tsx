export interface User {
    id: number
    userName: string
    imageUrl: string 
    email: string
    posts: Post[]
    comments: Comment[]
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