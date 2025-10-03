'use client';

import { useState, useEffect } from 'react';
import { addComment, getApprovedComments } from '@/lib/commentState';
import { Comment } from '@/lib/types';
import './Comments.css';

export default function CommentsComponent() {
  const [name, setName] = useState('');
  const [text, setText] = useState('');
  const [message, setMessage] = useState('');
  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
    const fetchComments = () => setComments(getApprovedComments());
    fetchComments();
    const intervalId = setInterval(fetchComments, 5000);
    return () => clearInterval(intervalId);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() === '' || text.trim() === '') {
      setMessage("Iltimos, ism va izohni to'ldiring.");
      return;
    }
    addComment(name, text);
    setMessage("✅ Izohingiz qabul qilindi! Admin tomonidan tasdiqlangandan so'ng saytda ko'rinadi.");
    setName('');
    setText('');
    setTimeout(() => setMessage(''), 5000);
  };

  return (
    <div className="comments-section">
      <div className="md-grid-2">
        {/* Comments List */}
        <div className="comments-list">
          <h3>Mijozlarning Fikrlari</h3>
          {comments.length === 0 ? (
            <p className="no-comments">Hozircha tasdiqlangan izohlar mavjud emas.</p>
          ) : (
            comments.map(c => (
              <div key={c.id} className="comment-item">
                <p className="comment-name">{c.name}</p>
                <p className="comment-text">"{c.text}"</p>
              </div>
            ))
          )}
        </div>

        {/* Comment Form */}
        <form onSubmit={handleSubmit} className="card comment-form">
          <h3>Fikr Qoldirish</h3>
          <div className="form-group">
            <label htmlFor="name">Ismingiz</label>
            <input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} className="input-field" required />
          </div>
          <div className="form-group">
            <label htmlFor="comment">Izohingiz</label>
            <textarea id="comment" value={text} onChange={(e) => setText(e.target.value)} rows={4} className="input-field" required />
          </div>
          <button type="submit" className="btn-primary">Yuborish</button>
          {message && <p className="form-message">{message}</p>}
        </form>
      </div>
    </div>
  );
}
