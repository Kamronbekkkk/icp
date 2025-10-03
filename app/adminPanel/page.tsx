// app/adminPanel/page.tsx
'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useAppContext } from '@/lib/context';
import {
  MultiLangContent,
  LanguageKey,
  Comment,
  ServiceItem,
  PortfolioItem,
  AboutItem,
  CommentStatus,
  TeamMember,
} from '@/lib/types';
import { loadFullContentMap } from '@/lib/context';
import { getComments, updateCommentStatus, deleteComment } from '@/lib/commentState';
import { getOrders, updateOrderStatus, deleteOrder, Order } from '@/lib/orderState';
import "./page.css"

const ADMIN_LOGIN = 'ICPAdmin';
const ADMIN_PASSWORD = 'adminQwErTy###panel';

export default function AdminPanelPage() {
  const { setContentFromAdmin, isDarkMode } = useAppContext();

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginInput, setLoginInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [loginError, setLoginError] = useState('');
  const [contentDraft, setContentDraft] = useState<MultiLangContent>(loadFullContentMap());
  const [pendingComments, setPendingComments] = useState<Comment[]>([]);
  const [activeTab, setActiveTab] = useState<'content' | 'comments' | 'orders'>('content');
  const [saving, setSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');
  const [mounted, setMounted] = useState(false);
  const [orders, setOrders] = useState<Order[]>([]);

  const langOptions: LanguageKey[] = ['uzb', 'rus', 'eng'];
  const [editingLang, setEditingLang] = useState<LanguageKey>('uzb');
  const [activeContentTab, setActiveContentTab] = useState<'About' | 'Services' | 'Portfolio' | 'Team'>('About');

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // ===== LOGIN =====
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginInput === ADMIN_LOGIN && passwordInput === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setLoginError('');
      loadComments();
      // load orders when login
      setOrders(getOrders());
    } else {
      setLoginError('Notoʻgʻri login yoki parol.');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setLoginInput('');
    setPasswordInput('');
    setLoginError('');
    setSaveMessage('');
    setOrders([]);
  };

  // ===== COMMENTS =====
  const loadComments = useCallback(() => {
    const all = getComments();
    const pendings = all.filter(c => c.status === CommentStatus.PENDING);
    setPendingComments(pendings);
  }, []);

  useEffect(() => {
    if (isAuthenticated) loadComments();
  }, [isAuthenticated, loadComments]);

  const handleCommentAction = (commentId: string, action: 'approve' | 'delete') => {
    try {
      if (action === 'approve') updateCommentStatus(commentId, CommentStatus.APPROVED);
      else if (action === 'delete') deleteComment(commentId);
      setSaveMessage(action === 'approve' ? 'Izoh tasdiqlandi.' : 'Izoh oʻchirildi.');
      loadComments();
    } catch (error) {
      console.error("Comment action failed:", error);
      setSaveMessage('Xato yuz berdi. Konsolni tekshiring.');
    } finally {
      setTimeout(() => setSaveMessage(''), 3000);
    }
  };

  // ===== ORDERS (yangi qo'shilgan) =====
  // orders yuklash (admin kirganda useEffect ichida chaqiriladi)
  useEffect(() => {
    if (isAuthenticated) {
      setOrders(getOrders());
    }
  }, [isAuthenticated]);

  const handleOrderAction = (id: string, action: 'done' | 'delete') => {
    try {
      if (action === 'done') {
        updateOrderStatus(id, 'done');
        setSaveMessage('Buyurtma bajarildi deb belgilandi.');
      } else if (action === 'delete') {
        deleteOrder(id);
        setSaveMessage('Buyurtma o‘chirildi.');
      }
      setOrders(getOrders());
    } catch (err) {
      console.error("Order action failed:", err);
      setSaveMessage('Buyurtma boshqarishda xato yuz berdi.');
    } finally {
      setTimeout(() => setSaveMessage(''), 3000);
    }
  };

  // ===== CONTENT LOGIC =====
  const handleTextChange = (section: 'about' | 'services' | 'portfolio' | 'team', key: string, value: string) => {
    setContentDraft(prev => ({
      ...prev,
      [editingLang]: {
        ...prev[editingLang],
        [section]: {
          ...prev[editingLang][section],
          [key]: value,
        },
      },
    }));
  };

  const handleItemChange = (
    section: 'about' | 'services' | 'portfolio' | 'team',
    itemIndex: number,
    key: string,
    value: string
  ) => {
    setContentDraft(prev => {
      const currentItems = prev[editingLang][section].items;
      const updatedItems = currentItems.map((item, index) =>
        index === itemIndex ? { ...item, [key]: value } : item
      );
      return {
        ...prev,
        [editingLang]: {
          ...prev[editingLang],
          [section]: {
            ...prev[editingLang][section],
            items: updatedItems,
          },
        },
      };
    });
  };

  const handleAddItem = (section: 'team') => {
    setContentDraft(prev => {
      const sectionData = prev[editingLang]?.[section] || { heading: '', text: '', items: [] };
      const currentItems = sectionData.items || [];

      const newItem: TeamMember = {
        name: "Yangi a'zo",
        role: "Lavozim",
        description: "Izoh",
        image: ""
      };

      return {
        ...prev,
        [editingLang]: {
          ...prev[editingLang],
          [section]: {
            ...sectionData,
            items: [...currentItems, newItem]
          }
        }
      };
    });
  };

  const handleDeleteItem = (section: 'team', index: number) => {
    setContentDraft(prev => {
      const currentItems = prev[editingLang][section].items as TeamMember[];
      const updatedItems = currentItems.filter((_, idx) => idx !== index);
      return {
        ...prev,
        [editingLang]: {
          ...prev[editingLang],
          [section]: {
            ...prev[editingLang][section],
            items: updatedItems,
          },
        },
      };
    });
  };

  const handleSave = () => {
    setSaving(true);
    try {
      setContentFromAdmin(contentDraft);
      setSaveMessage('Maʻlumotlar muvaffaqiyatli saqlandi!');
    } catch (error) {
      console.error("Save failed:", error);
      setSaveMessage('Saqlashda xato yuz berdi.');
    } finally {
      setSaving(false);
      setTimeout(() => setSaveMessage(''), 5000);
    }
  };

  // ===== RENDER HELPERS =====
  const renderAboutEditor = () => {
    const aboutContent = contentDraft[editingLang].about;
    return (
      <>
        <h3 className="admin-subtitle">Biz Haqimizda bo‘limi</h3>
        <div className="input-group">
          <label>Sarlavha</label>
          <input
            type="text"
            value={aboutContent.heading}
            onChange={(e) => handleTextChange('about', 'heading', e.target.value)}
            className="input-field"
          />
        </div>
        <div className="input-group">
          <label>Matn</label>
          <textarea
            value={aboutContent.text}
            onChange={(e) => handleTextChange('about', 'text', e.target.value)}
            className="input-field"
          />
        </div>
      </>
    );
  };

  const renderServicesEditor = () => {
    const servicesContent = contentDraft[editingLang].services;
    return (
      <>
        <h3 className="admin-subtitle">Xizmatlar bo‘limi</h3>
        <div className="input-group">
          <label>Sarlavha</label>
          <input
            type="text"
            value={servicesContent.heading}
            onChange={(e) => handleTextChange('services', 'heading', e.target.value)}
            className="input-field"
          />
        </div>
        <div className="input-group">
          <label>Matn</label>
          <textarea
            value={servicesContent.text}
            onChange={(e) => handleTextChange('services', 'text', e.target.value)}
            className="input-field"
          />
        </div>
        {servicesContent.items.map((service: ServiceItem, index: number) => (
          <div key={index} className="admin-card mb-4">
            <p className="font-bold mb-2 text-icp-accent">Xizmat #{index + 1}</p>
            <input
              type="text"
              placeholder="Nomi"
              value={service.title}
              onChange={(e) => handleItemChange('services', index, 'title', e.target.value)}
              className="input-field"
            />
            <textarea
              placeholder="Tavsif"
              value={service.description}
              onChange={(e) => handleItemChange('services', index, 'description', e.target.value)}
              className="input-field"
            />
          </div>
        ))}
      </>
    );
  };

  const renderPortfolioEditor = () => {
    const portfolioContent = contentDraft[editingLang].portfolio;
    return (
      <>
        <h3 className="admin-subtitle">Natijalar bo‘limi</h3>
        <div className="input-group">
          <label>Sarlavha</label>
          <input
            type="text"
            value={portfolioContent.heading}
            onChange={(e) => handleTextChange('portfolio', 'heading', e.target.value)}
            className="input-field"
          />
        </div>
        <div className="input-group">
          <label>Matn</label>
          <textarea
            value={portfolioContent.text}
            onChange={(e) => handleTextChange('portfolio', 'text', e.target.value)}
            className="input-field"
          />
        </div>
        {portfolioContent.items.map((item: PortfolioItem, index: number) => (
          <div key={index} className="admin-card mb-4">
            <p className="font-bold mb-2 text-icp-accent">Natija #{index + 1}</p>
            <input
              type="text"
              placeholder="Nomi"
              value={item.title}
              onChange={(e) => handleItemChange('portfolio', index, 'title', e.target.value)}
              className="input-field"
            />
            <textarea
              placeholder="Tavsif"
              value={item.description}
              onChange={(e) => handleItemChange('portfolio', index, 'description', e.target.value)}
              className="input-field"
            />
            <input
              type="text"
              placeholder="Rasm URL"
              value={item.image}
              onChange={(e) => handleItemChange('portfolio', index, 'image', e.target.value)}
              className="input-field"
            />
          </div>
        ))}
      </>
    );
  };

  const renderTeamEditor = () => {
    const teamContent = contentDraft[editingLang]?.team || { heading: '', text: '', items: [] };

    return (
      <>
        <h3 className="admin-subtitle">Team bo'limi</h3>
        <div className="input-group">
          <label>Nom</label>
          <input
            type="text"
            value={teamContent.heading || ''}
            onChange={(e) => handleTextChange('team', 'heading', e.target.value)}
            className="input-field"
          />
        </div>
        <div className="input-group">
          <label>Haqida</label>
          <textarea
            value={teamContent.text || ''}
            onChange={(e) => handleTextChange('team', 'text', e.target.value)}
            className="input-field"
          />
        </div>
        {(teamContent.items || []).map((member: TeamMember, index: number) => (
          <div key={index} className="admin-card mb-4">
            <p className="font-bold mb-2 text-icp-accent">A'zo #{index + 1}</p>
            <input
              type="text"
              value={member.name || ''}
              onChange={(e) => handleItemChange('team', index, 'name', e.target.value)}
              className="input-field"
              placeholder="Ismi"
            />
            <input
              type="text"
              value={member.role || ''}
              onChange={(e) => handleItemChange('team', index, 'role', e.target.value)}
              className="input-field"
              placeholder="Lavozimi"
            />
            <textarea
              value={member.description || ''}
              onChange={(e) => handleItemChange('team', index, 'description', e.target.value)}
              className="input-field"
              placeholder="Izoh"
            />
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (!file) return;
                const reader = new FileReader();
                reader.onload = () => {
                  handleItemChange('team', index, 'image', reader.result as string);
                };
                reader.readAsDataURL(file);
              }}
              className="input-field"
            />
            {member.image && (
              <>
                <img
                  src={member.image}
                  alt={member.name}
                  className="preview-image mt-2"
                  style={{ maxWidth: '120px', borderRadius: '8px' }}
                />
                <button
                  type="button"
                  onClick={() => handleItemChange('team', index, 'image', '')}
                  className="btn-danger mt-2"
                >
                  Rasmni o‘chirish
                </button>
              </>
            )}
            <button
              type="button"
              onClick={() => handleDeleteItem('team', index)}
              className="btn-danger mt-2"
            >
              A'zoni o‘chirish
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => handleAddItem('team')}
          className="btn-secondary mt-3"
        >
          + Yangi A'zo Qo‘shish
        </button>
      </>
    );
  };

  if (!mounted) return null;

  if (!isAuthenticated) {
    return (
      <div className={`admin-auth-container ${isDarkMode ? 'dark-mode' : ''}`}>
        <div className="admin-card auth-card">
          <h2 className="admin-title">Admin Panelga Kirish</h2>
          <form onSubmit={handleLogin}>
            <input type="text" placeholder="Login" value={loginInput} onChange={(e) => setLoginInput(e.target.value)} className="input-field" required />
            <input type="password" placeholder="Parol" value={passwordInput} onChange={(e) => setPasswordInput(e.target.value)} className="input-field" required />
            {loginError && <p className="error-message">{loginError}</p>}
            <button type="submit" className="btn-primary mt-4 w-full">Kirish</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className={`admin-container ${isDarkMode ? 'dark-mode' : ''}`}>
      <header className="admin-header">
        <h1 className="admin-title">ICP Admin Boshqaruvi</h1>
        <button onClick={handleLogout} className="btn-secondary">Chiqish</button>
      </header>

      <main className="admin-main">
        {saveMessage && <div className="save-message">{saveMessage}</div>}

        <div className="tab-container">
          <button onClick={() => setActiveTab('content')} className={`tab-btn ${activeTab === 'content' ? 'active' : ''}`}>Kontent Tahrirlash</button>
          <button onClick={() => setActiveTab('comments')} className={`tab-btn ${activeTab === 'comments' ? 'active' : ''}`}>Izohlarni Boshqarish ({pendingComments.length})</button>
          <button onClick={() => setActiveTab('orders')} className={`tab-btn ${activeTab === 'orders' ? 'active' : ''}`}>Buyurtmalar ({orders.length})</button>
        </div>

        {activeTab === 'content' && (
          <div className="admin-content-editor">
            <div className="lang-select-wrapper">
              <label>Tahrirlanadigan Til:</label>
              <select value={editingLang} onChange={(e) => setEditingLang(e.target.value as LanguageKey)} className="input-field">
                {langOptions.map(lang => <option key={lang} value={lang}>{lang.toUpperCase()}</option>)}
              </select>
            </div>

            <div className="content-tab-container">
              <button onClick={() => setActiveContentTab('About')} className={`content-tab-btn ${activeContentTab === 'About' ? 'active' : ''}`}>Biz Haqimizda</button>
              <button onClick={() => setActiveContentTab('Services')} className={`content-tab-btn ${activeContentTab === 'Services' ? 'active' : ''}`}>Xizmatlar</button>
              <button onClick={() => setActiveContentTab('Portfolio')} className={`content-tab-btn ${activeContentTab === 'Portfolio' ? 'active' : ''}`}>Natijalar</button>
              <button onClick={() => setActiveContentTab('Team')} className={`content-tab-btn ${activeContentTab === 'Team' ? 'active' : ''}`}>Jamoa</button>
            </div>

            <div className="admin-card editor-card mt-4">
              {activeContentTab === 'About' && renderAboutEditor()}
              {activeContentTab === 'Services' && renderServicesEditor()}
              {activeContentTab === 'Portfolio' && renderPortfolioEditor()}
              {activeContentTab === 'Team' && renderTeamEditor()}
            </div>

            <button onClick={handleSave} className="btn-primary mt-6" disabled={saving}>{saving ? 'Saqlanmoqda...' : 'Oʻzgarishlarni Saqlash'}</button>
          </div>
        )}

        {activeTab === 'comments' && (
          <div className="admin-comments-manager">
            <h2 className="admin-subtitle">Tasdiqlanishni Kutayotgan Izohlar ({pendingComments.length})</h2>
            {pendingComments.length === 0 ? (
              <p className="empty-message">Tasdiqlanishni kutayotgan izohlar mavjud emas.</p>
            ) : (
              <div className="comments-list">
                {pendingComments.map(comment => (
                  <div key={comment.id} className="comment-item admin-card">
                    <div className="comment-details">
                      <p><strong>Foydalanuvchi:</strong> {comment.name}</p>
                      <p><strong>Sana:</strong> {new Date(comment.timestamp).toLocaleString()}</p>
                      <p className="comment-text">"{comment.text}"</p>
                    </div>
                    <div className="comment-actions">
                      <button onClick={() => handleCommentAction(comment.id, 'approve')} className="btn-success">Tasdiqlash</button>
                      <button onClick={() => handleCommentAction(comment.id, 'delete')} className="btn-danger">Oʻchirish</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ===== ORDERS TAB RENDER ===== */}
        {activeTab === 'orders' && (
          <div className="admin-orders">
            <h2 className="admin-subtitle">Buyurtmalar ({orders.length})</h2>
            {orders.length === 0 ? (
              <p className="empty-message">Hali buyurtmalar kelmagan.</p>
            ) : (
              <div className="orders-list">
                {orders.map(order => (
                  <div key={order.id} className="order-item admin-card">
                    <p><strong>Ism:</strong> {order.name}</p>
                    <p><strong>Telefon:</strong> {order.phone || order.contact || '-'}</p>
                    <p><strong>Telegram:</strong> {order.telegramUser ? `@${order.telegramUser}` : '-'}</p>
                    <p><strong>Xizmat:</strong> {order.service || order.description || '-'}</p>
                    <p><strong>Status:</strong> {order.status}</p>
                    <p><strong>Sana:</strong> {order.createdAt ? new Date(order.createdAt).toLocaleString() : '-'}</p>
                    <div className="order-actions" style={{ marginTop: 8 }}>
                      {order.status === 'pending' && (
                        <button onClick={() => handleOrderAction(order.id, 'done')} className="btn-success" style={{ marginRight: 8 }}>Bajarildi</button>
                      )}
                      <button onClick={() => handleOrderAction(order.id, 'delete')} className="btn-danger">O‘chirish</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
