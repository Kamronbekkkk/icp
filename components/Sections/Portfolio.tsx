'use client';

import { useAppContext } from '@/lib/context';
import { PortfolioItem } from '@/lib/types';
import { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import "./Portfolio.css"

const generatePlaceholderImage = (width: number, height: number, title: string) => {
    const textHash = title.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const colors = ['4F46E5', '06B6D4', 'D946EF', '10B981'];
    const bgColor = colors[textHash % colors.length];
    return `https://placehold.co/${width}x${height}/${bgColor}/ffffff?text=${encodeURIComponent(title.toUpperCase().replace(/\s/g, '+'))}`;
};

export default function PortfolioSection() {
    const { getContent } = useAppContext();
    const [portfolioContent, setPortfolioContent] = useState<{ heading: string; text: string; items: PortfolioItem[] } | null>(null);

    useEffect(() => {
        const content = getContent();
        setPortfolioContent(content?.portfolio || { heading: "", text: "", items: [] });
    }, [getContent]);

    if (!portfolioContent) return null;

    return (
        <section id="natijalar" className="section-container">
            <div className="section-content portfolio-content">
                <h2 className="section-heading primary-text">{portfolioContent.heading}</h2>
                <p className="section-description">{portfolioContent.text}</p>

                <Swiper
                    modules={[Navigation, Pagination, Autoplay]}
                    navigation
                    pagination={{ clickable: true }}
                    autoplay={{ delay: 3000, disableOnInteraction: false }}
                    slidesPerView={1}
                    spaceBetween={30}
                    loop
                >
                    {portfolioContent.items.map((item, index) => {
                        const imageUrl = generatePlaceholderImage(600, 350, item.title);
                        return (
                            <SwiperSlide key={index}>
                                <a
                                    href={item.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="portfolio-item card hover-shadow"
                                >
                                    <div className="portfolio-image-container">
                                        <img
                                            src={item.image || imageUrl}
                                            alt={item.title}
                                            width={600}
                                            height={350}
                                            style={{ borderRadius: '8px 8px 0 0', width: '100%', height: 'auto' }}
                                        />
                                    </div>
                                    <div className="portfolio-info">
                                        <h3 className="portfolio-title">{item.title}</h3>
                                        <p className="portfolio-description">{item.description}</p>
                                        <span className="portfolio-tag primary-text">{item.tag}</span>
                                    </div>
                                </a>
                            </SwiperSlide>
                        );
                    })}
                </Swiper>
            </div>
        </section>
    );
}
