"use client"

import { useAppContext } from '@/lib/context';
import Link from 'next/link';
import { LanguageKey } from '@/lib/types';
import { useState } from 'react';
import './Header.css';

export default function Header() {
  const { currentLang, setLang, isDarkMode, toggleTheme, getContent } = useAppContext();
  const links = getContent().header.links;
  const langOptions: LanguageKey[] = ['uzb', 'rus', 'eng'];
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showOrderModal, setShowOrderModal] = useState(false);

  const primaryColorStyle = { color: 'var(--icp-primary)' };
  const accentColorStyle = { color: 'var(--icp-accent)' };

  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="header">
      <div className="container header-inner">

        {/* Logo va shior */}
        <div className="logo-container">
          <Link href="#bosh-sahifa" className="flex flex-col">
          </Link>
          <div className="flex flex-col">
            <h1 className="logo-text">ICP</h1>
            <p className="logo-tagline">INNOVATE • CREATE • PERFORM</p>
          </div>
        </div>

        {/* Navigatsiya Linklari */}
        <nav className="hidden md:flex nav-links-desktop">
          {links.map((link, index) => (
            <a
              key={index}
              href={`#${link.toLowerCase().replace(/\s/g, '-')}`}
              className="nav-link"
            >
              {link}
            </a>
          ))}
          <a href="#bizning-jamoa" className="nav-link">Bizning Jamoa</a>
          <button className="btn-order" onClick={() => setShowOrderModal(true)}>
            Buyurtma Berish
          </button>
        </nav>

        {/* Controls */}
        <div className="controls-container">
          {/* Til */}
          <select
            value={currentLang}
            onChange={(e) => setLang(e.target.value as LanguageKey)}
            className="lang-select"
          >
            {langOptions.map(lang => (
              <option key={lang} value={lang} style={{ color: '#1f2937', backgroundColor: '#ffffff' }}>
                {lang.toUpperCase()}
              </option>
            ))}
          </select>

          {/* Tema */}
          <button
            onClick={toggleTheme}
            className="theme-toggle"
            style={accentColorStyle}
            aria-label="Toggle dark mode"
          >
            {isDarkMode ? '🌞' : '🌙'}
          </button>

          {/* Mobil menyu */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="menu-toggle"
            style={accentColorStyle}
            aria-label="Toggle navigation menu"
          >
            {isMenuOpen ? (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            ) : (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobil menyu */}
      <div className={`mobile-menu ${isMenuOpen ? 'open' : ''}`}>
        <nav className="flex flex-col p-4 gap-3">
          {links.map((link, index) => (
            <a
              key={index}
              href={`#${link.toLowerCase().replace(/\s/g, '-')}`}
              className="nav-link-mobile"
              onClick={handleLinkClick}
            >
              {link}
            </a>
          ))}
          <button className="btn-order-mobile" onClick={() => { setShowOrderModal(true); setIsMenuOpen(false); }}>
            Buyurtma Berish
          </button>
        </nav>
      </div>

      {/* Order Modal */}
      {showOrderModal && (
        <div className="modal-overlay" onClick={() => setShowOrderModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2 className="order-title">Buyurtma Berish</h2>
            <OrderForm closeModal={() => setShowOrderModal(false)} />
          </div>
        </div>
      )}
    </header>
  );
}

/* Order Form component */
function OrderForm({ closeModal }: { closeModal: () => void }) {
  const [formData, setFormData] = useState({ name: "", telegram: "", phone: "", description: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const orders = JSON.parse(localStorage.getItem("orders") || "[]");
    orders.push({ ...formData, id: Date.now(), status: "pending" });
    localStorage.setItem("orders", JSON.stringify(orders));
    setFormData({ name: "", telegram: "", phone: "", description: "" });
    alert("Buyurtma yuborildi!");
    closeModal();
  };

  return (
    <form onSubmit={handleSubmit} className="order-form">
      <input type="text" placeholder="Ism sharif" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} required />
      <input type="text" placeholder="Telegram username" value={formData.telegram} onChange={e => setFormData({ ...formData, telegram: e.target.value })} required />
      <input type="text" placeholder="Telefon raqam" value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} required />
      <textarea placeholder="Sayt haqida qisqacha yozing" value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} required />
      <button type="submit" className="btn-primary">Yuborish</button>
    </form>
  );
}