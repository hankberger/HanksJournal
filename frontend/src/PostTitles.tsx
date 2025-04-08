import React, { useEffect, useState } from 'react';
import { Link } from 'react-router';

interface PostTitle {
  id: number;
  title: string;
}

const PostTitlesList: React.FC = () => {
  const [titles, setTitles] = useState<PostTitle[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTitles = async () => {
      try {
        const res = await fetch('/api/blog/titles');
        if (!res.ok) {
          throw new Error('Failed to fetch post titles.');
        }
        const data: PostTitle[] = await res.json();
        setTitles(data);
      } catch (err: any) {
        setError(err.message || 'An error occurred');
      }
    };

    fetchTitles();
  }, []);

  return (
    <div className="post-titles-list">
      <h2>Blog Post Titles</h2>
      {error && <p className="error">Error: {error}</p>}
      {titles.length === 0 && !error && <p>No posts found.</p>}
      <ul>
        {titles.map(post => (
          <li key={post.id}>
            <Link to={`/posts/${post.id}`}>{post.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PostTitlesList;
