export interface User {
    id: number
    userName: string
    email: string
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