'use client';

import { useAppContext } from '@/lib/context';
import { TeamMember } from '@/lib/types';
import { useState, useEffect } from 'react';
import "./Team.css";

export default function TeamSection() {
  const { getContent } = useAppContext();
  const [teamContent, setTeamContent] = useState<{ heading: string; text: string; items: TeamMember[] } | null>(null);

  useEffect(() => {
    const content = getContent();
    setTeamContent(content?.team || { heading: "", text: "", items: [] });
  }, [getContent]);

  if (!teamContent) return null;

  return (
    <section id="bizning-jamoa" className="section-container">
      <div className="section-content">
        <h2 className="section-heading">{teamContent.heading}</h2>
        <p className="section-description">{teamContent.text}</p>
        <div className="team-grid">
          {teamContent.items.map((member, idx) => (
            <div key={idx} className="team-card">
              {member.image && (
                <img src={member.image} alt={member.name} className="team-photo" />
              )}
              <h3 className="team-name">{member.name}</h3>
              <p className="team-role">{member.role}</p>
              <p className="team-bio">{member.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
