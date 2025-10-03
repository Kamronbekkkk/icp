'use client';

import { socialLinks } from '@/lib/data';
import Link from 'next/link';
import { FaTelegramPlane, FaInstagram, FaLinkedin, FaBook } from 'react-icons/fa';
import { FaMapMarkerAlt, FaEnvelope } from 'react-icons/fa';

import './Footer.css';

export default function Footer() {
    const links = [
        { name: "Telegram", key: 'telegram', icon: <FaTelegramPlane />, linkPrefix: 'https://t.me/' },
        { name: "Instagram", key: 'instagram', icon: <FaInstagram />, linkPrefix: 'https://' },
        { name: "LinkedIn", key: 'linkedin', icon: <FaLinkedin />, linkPrefix: 'https://linkedin.com/company/' },
        { name: "GoldenPage", key: 'goldenpage', icon: <FaBook />, linkPrefix: 'https://goldenpages.uz/search/?query=' },
    ];

    return (
        <footer>
            <div className="container">
                {/* 1. Asosiy Ma'lumot */}
                <div>
                    <h3 className="icp-accent">ICP IT COMPANY</h3>
                    <p>
                        Sizning raqamli hamkorlaringiz. Innovatsiya, Yaratish, Natija (Innovate,
                        Create, Perform).
                    </p>
                </div>

                {/* 2. Aloqa Detallari */}
                <div>
                    <h3>Aloqa</h3>
                    <p className="contact-item">
                        <FaMapMarkerAlt  className="contact-icon" /> Manzil: {socialLinks.address}
                    </p>
                    <p className="contact-item">
                        <FaEnvelope className="contact-icon" /> Email:
                        <a href={`mailto:${socialLinks.email}`} className="icp-accent">{socialLinks.email}</a>
                    </p>

                </div>

                {/* 3. Ijtimoiy Tarmoqlar */}
                <div>
                    <h3>Ijtimoiy Tarmoqlar</h3>
                    <div className="social-links">
                        {links.map((item) => {
                            const url = socialLinks[item.key as keyof typeof socialLinks] as string | undefined;
                            if (!url) return null;

                            return (
                                <Link
                                    key={item.name}
                                    href={`${item.linkPrefix}${url}`}
                                    target="_blank"
                                >
                                    <span className="social-icon">{item.icon}</span>
                                    {item.name}: {url}
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </div>

            <div className="copyright">
                &copy; {new Date().getFullYear()} ICP IT COMPANY. Barcha huquqlar himoyalangan.
            </div>
        </footer>
    );
}
