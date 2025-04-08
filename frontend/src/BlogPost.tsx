import React, { useState } from 'react';
import "./BlogPost.css";

interface BlogPost {
  title: string;
  body: string;
}

const BlogPostForm: React.FC = () => {
  const [form, setForm] = useState<BlogPost>({ title: '', body: '' });
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isCollapsed, setIsCollapsed] = useState<boolean>(true);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setMessage(null);

    try {
      const res = await fetch('/api/blog', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(form)
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Unknown error');
      }

      const data = await res.json();
      setMessage(`Post created with ID: ${data.id}`);
      setForm({ title: '', body: '' });
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="blog-post-form-container">
        <form onSubmit={handleSubmit} onClick={() => setIsCollapsed(!isCollapsed)} className="blog-form">
          <h2>Create a Blog Post</h2>
          {true && (
            <>
            <label>
                Title:
                <input
                type="text"
                name="title"
                value={form.title}
                onChange={handleChange}
                required
                />
            </label>

            <label>
                Body:
                <textarea
                name="body"
                value={form.body}
                onChange={handleChange}
                required
                />
            </label>

            <button type="submit">Submit</button>
            {message && <p className="success">{message}</p>}
            {error && <p className="error">Error: {error}</p>}
            </>
        )}
        </form>
    </div>
  );
};

export default BlogPostForm;
