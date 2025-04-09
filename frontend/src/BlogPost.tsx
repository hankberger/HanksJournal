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
          <h2><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
  <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
  <path d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
</svg> Create a Post </h2>
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

            <button type="submit">Submit <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
  <path d="M6 3.5a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-2a.5.5 0 0 0-1 0v2A1.5 1.5 0 0 0 6.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-8A1.5 1.5 0 0 0 5 3.5v2a.5.5 0 0 0 1 0z"/>
  <path d="M11.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H1.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z"/>
</svg></button>
            {message && <p className="success">{message}</p>}
            {error && <p className="error">Error: {error}</p>}
            </>
        )}
        </form>
    </div>
  );
};

export default BlogPostForm;
