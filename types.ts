export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  tags: string[];
  date: string;
  readTime: number;
  author: string;
  coverImage?: string;
}

export interface User {
  username: string;
  isAuthenticated: boolean;
}

export interface AuthState {
  user: User | null;
  login: (username: string) => void;
  logout: () => void;
}

export const MOCK_USER_CREDENTIALS = {
  username: 'admin',
  password: 'password123' // Simple mock for demo
};