import React, { useEffect, useState } from 'react';
import "./AllPosts.css";

interface Post {
  id: number;
  title: string;
  body: string;
  created_at: string;
  // Include additional fields as needed
}

const AllPosts: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch('/api/blog');
        if (res.status === 404) {
          setError('No posts found.');
          setLoading(false);
          return;
        }
        if (!res.ok) {
          throw new Error('Error fetching posts.');
        }
        const data: Post[] = await res.json();
        setPosts(data);
      } catch (err: any) {
        setError(err.message || 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) return <p>Loading posts...</p>;
  if (error) return <p className="error">Error: {error}</p>;

  return (
    <div className="all-posts">
      <h2>All Posts</h2>
      {posts.slice().reverse().map(post => (
        <div key={post.id} className="post">
          <h3>{post.title}</h3>
          <h4>{post.created_at}</h4>
          <p>{post.body}</p>
          {/* Render additional fields as needed */}
        </div>
      ))}
    </div>
  );
};

export default AllPosts;
