import React, { useState, useEffect } from 'react';
import "./BlogPost.css";

interface BlogPost {
  title: string;
  body: string;
}

const BlogPostForm: React.FC = () => {
  // Initialize state from localStorage or use default empty values.
  const [form, setForm] = useState<BlogPost>(() => {
    const saved = localStorage.getItem("blogPostForm");
    return saved ? JSON.parse(saved) : { title: '', body: '' };
  });
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isCollapsed, setIsCollapsed] = useState<boolean>(() => {
    const saved = localStorage.getItem("isCollapsed") || "true";
    return saved === "true";
  });
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Update localStorage whenever the form state changes.
  useEffect(() => {
    localStorage.setItem("blogPostForm", JSON.stringify(form));
  }, [form]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setMessage(null);
    setIsSubmitting(true);

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

      setMessage(`Successfully created post. Refreshing...`);
      // Only clear the form on successful submit.
      setForm({ title: '', body: '' });
      localStorage.setItem("isCollapsed", `true`);
      location.reload();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleCollapse = () => {
    localStorage.setItem("isCollapsed", `${!isCollapsed}`);
    setIsCollapsed(prev => !prev);
  };

  return (
    <div className="blog-post-form-container" onClick={toggleCollapse}>
      <div className="blog-post-form-header">
        <h2>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className={`writebox ${!isCollapsed ? 'expanded' : ''}`} viewBox="0 0 16 16">
            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
            <path d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
          </svg>
          Create a Post
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className={`caret-right-fill ${!isCollapsed ? 'expanded' : ''}`} viewBox="0 0 16 16">
            <path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z"/>
          </svg>
        </h2>
      </div>
      {!isCollapsed && (
        <form onSubmit={handleSubmit} onClick={(e) => e.stopPropagation()} className="blog-form">
          <label>
  Title:
  <input
    type="text"
    name="title"
    value={form.title}
    onChange={handleChange}
    required
    maxLength={50}
  />
  <span className={`char-count ${form.title.length > 50 ? 'over-limit' : ''}`}>
    {form.title.length}/50
  </span>
</label>

<label>
  Body:
  <textarea
    name="body"
    value={form.body}
    onChange={handleChange}
    required
    maxLength={300}
  />
  <span className={`char-count ${form.body.length > 300 ? 'over-limit' : ''}`}>
    {form.body.length}/300
  </span>
</label>

          <button type="submit" disabled={isSubmitting}>
            Submit
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
              <path d="M6 3.5a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-2a.5.5 0 0 0-1 0v2A1.5 1.5 0 0 0 6.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-8A1.5 1.5 0 0 0 5 3.5v2a.5.5 0 0 0 1 0z"/>
              <path d="M11.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H1.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z"/>
            </svg>
          </button>
          {message && (
            <p className="success">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="successButton" viewBox="0 0 16 16">
                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
              </svg>
              {message}
            </p>
          )}
          {error && (
            <p className="error">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="stop" viewBox="0 0 16 16">
                <path d="M11.46.146A.5.5 0 0 0 11.107 0H4.893a.5.5 0 0 0-.353.146L.146 4.54A.5.5 0 0 0 0 4.893v6.214a.5.5 0 0 0 .146.353l4.394 4.394a.5.5 0 0 0 .353.146h6.214a.5.5 0 0 0 .353-.146l4.394-4.394a.5.5 0 0 0 .146-.353V4.893a.5.5 0 0 0-.146-.353zM8 4c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995A.905.905 0 0 1 8 4m.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2"/>
              </svg>
              Error: {error}
            </p>
          )}
        </form>
      )}
    </div>
  );
};

export default BlogPostForm;
