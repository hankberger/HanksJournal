import React, { useEffect, useState } from "react";
import { useParams } from "react-router";

interface Post {
  id: number;
  title: string;
  body: string;
  // Add any other fields your post might have
}

const PostDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch(`/api/blog/${id}`);
        if (res.status === 404) {
          setError("Post not found.");
          setLoading(false);
          return;
        }
        if (!res.ok) {
          throw new Error("Error fetching post.");
        }
        const data: Post = await res.json();
        setPost(data);
      } catch (err: any) {
        setError(err.message || "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="error">Error: {error}</p>;
  if (!post) return null;

  return (
    <div className="post-detail">
      <h2>{post.title}</h2>
      <div>{post.body}</div>
      {/* Render any other fields as needed */}
    </div>
  );
};

export default PostDetail;
