import React, { useEffect, useState } from "react";
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
        const res = await fetch("/api/blog");
        if (res.status === 404) {
          setError("No posts found.");
          setLoading(false);
          return;
        }
        if (!res.ok) {
          throw new Error("Error fetching posts.");
        }
        const data: Post[] = await res.json();
        setPosts(data);
      } catch (err: any) {
        setError(err.message || "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) return <p>Loading posts...</p>;
  if (error)
    return (
      <p className="error postError">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="stop"
          viewBox="0 0 16 16"
        >
          <path d="M11.46.146A.5.5 0 0 0 11.107 0H4.893a.5.5 0 0 0-.353.146L.146 4.54A.5.5 0 0 0 0 4.893v6.214a.5.5 0 0 0 .146.353l4.394 4.394a.5.5 0 0 0 .353.146h6.214a.5.5 0 0 0 .353-.146l4.394-4.394a.5.5 0 0 0 .146-.353V4.893a.5.5 0 0 0-.146-.353zM8 4c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995A.905.905 0 0 1 8 4m.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
        </svg>{" "}
        Error: {error}
      </p>
    );

  return (
    <div className="all-posts">
      {posts
        .slice()
        .reverse()
        .map((post) => (
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
