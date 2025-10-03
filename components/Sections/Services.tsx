'use client';

import { useAppContext } from '@/lib/context';
import { ServiceItem } from '@/lib/types';
import { iconMap } from '@/lib/iconMap';
import "./Services.css"

export default function ServicesSection() {
  const { getContent } = useAppContext();
  const servicesContent = getContent().services;

  // Misol uchun internetdan rasmlar linklari
  const sampleImages = [
    'https://images.unsplash.com/photo-1612832021302-5c9e5b2b5f3f?fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1605902711622-cfb43c443f8b?fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?fit=crop&w=800&q=80'
  ];






  return (
    <section id="xizmatlar" className="section-padding">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">{servicesContent.heading}</h2>
          <p className="section-description">{servicesContent.text}</p>
        </div>

        <div className="services-grid">
          {servicesContent.items.map((item: ServiceItem, index: number) => {
            const Icon = iconMap[item.icon] || iconMap.default;
            const bgImage = sampleImages[index % sampleImages.length]; // rasmlar aylanishi
            return (
              <div 
                key={index} 
                className="service-card" 
                style={{ backgroundImage: `url('${bgImage}')` }}
              >
                <div className="service-icon-wrapper">
                  <div className="service-icon">
                    <Icon size={32} />
                  </div>
                </div>
                <h3 className="card-title">{item.title}</h3>
                <p className="card-description">{item.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
