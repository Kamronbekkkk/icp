'use client';

import React, { createContext, useContext, useState, useMemo, ReactNode, useEffect } from 'react';
import { LanguageKey, MultiLangContent, SiteContent, AppContextType, Comment } from './types';
import { defaultContent } from './data';
import { getComments } from './commentState';

const CONTENT_STORAGE_KEY = 'siteContentMap';
const THEME_STORAGE_KEY = 'theme';

export const loadFullContentMap = (): MultiLangContent => {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem(CONTENT_STORAGE_KEY);
    if (stored) {
      try {
        const parsedContent = JSON.parse(stored);
        if (parsedContent.uzb && parsedContent.rus && parsedContent.eng) {
          return parsedContent;
        }
      } catch (e) {
        console.error("Error parsing content from localStorage", e);
      }
    }
  }
  return defaultContent;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [siteContentMap, setSiteContentMap] = useState<MultiLangContent>(loadFullContentMap);
  const [currentLang, setCurrentLang] = useState<LanguageKey>('uzb');
  const [comments, setComments] = useState<Comment[]>(getComments());
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(THEME_STORAGE_KEY) === 'dark';
    }
    return false;
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedLang = localStorage.getItem('currentLang') as LanguageKey;
      if (savedLang && siteContentMap[savedLang]) setCurrentLang(savedLang);
    }
  }, [siteContentMap]);

  // BODY klassini dark/light o'zgartirish
  useEffect(() => {
    if (typeof window !== 'undefined') {
      document.body.className = isDarkMode ? 'dark' : 'light';
    }
  }, [isDarkMode]);

  const setLang = (lang: LanguageKey) => {
    setCurrentLang(lang);
    if (typeof window !== 'undefined') localStorage.setItem('currentLang', lang);
  };

  const toggleTheme = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    if (typeof window !== 'undefined') localStorage.setItem(THEME_STORAGE_KEY, newMode ? 'dark' : 'light');
  };

  const setContentFromAdmin = (newContent: MultiLangContent) => {
    setSiteContentMap(newContent);
    if (typeof window !== 'undefined') localStorage.setItem(CONTENT_STORAGE_KEY, JSON.stringify(newContent));
  };

  const refreshComments = () => setComments(getComments());
  const getContent = (lang: LanguageKey = currentLang): SiteContent => siteContentMap[lang];

  const value: AppContextType = useMemo(
    () => ({
      currentLang,
      setLang,
      isDarkMode,
      toggleTheme,
      getContent,
      setContentFromAdmin,
      comments,
      refreshComments,
    }),
    [currentLang, isDarkMode, siteContentMap, comments]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useAppContext must be used within an AppProvider');
  return context;
};
