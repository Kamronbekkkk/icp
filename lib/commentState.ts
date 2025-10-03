// lib/commentState.ts
'use client';

import { Comment, CommentStatus } from './types';

const COMMENTS_STORAGE_KEY = 'icp_comments';

const initializeComments = (): Comment[] => {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem(COMMENTS_STORAGE_KEY);
    if (stored) {
      try {
        return JSON.parse(stored) as Comment[];
      } catch (e) {
        console.error("Izohlarni parsing qilishda xato:", e);
        return [];
      }
    }
  }
  return [];
};

const saveComments = (comments: Comment[]) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(COMMENTS_STORAGE_KEY, JSON.stringify(comments));
  }
};

// Barcha izohlarni olish (oxirgi birinchi)
export const getComments = (): Comment[] => {
  return initializeComments().sort((a, b) => b.timestamp - a.timestamp);
};

// Faqat tasdiqlangan izohlarni olish
export const getApprovedComments = (): Comment[] => {
  return getComments().filter((c) => c.status === CommentStatus.APPROVED);
};

// Yangi izoh qo'shish — name va text qabul qiladi
export function addComment(name: string, text: string) {
  const comments = getComments();
  const newComment: Comment = {
    id: Date.now().toString(),               // noyob id
    name,
    text,
    status: CommentStatus.PENDING,           // dastlab PENDING holatda saqlaymiz
    timestamp: Date.now(),
  };
  comments.push(newComment);
  saveComments(comments);
}

// Izoh holatini yangilash (APPROVED / REJECTED / PENDING)
export const updateCommentStatus = (id: string, status: CommentStatus) => {
  const comments = getComments()
    .map((c) => (c.id === id ? { ...c, status } : c))
    .filter((c) => c.status !== CommentStatus.REJECTED); // agar REJECT bo'lsa, olib tashlash (istalgancha sozlasa bo'ladi)
  saveComments(comments);
};

// Izohni butunlay o'chirish
export const deleteComment = (id: string) => {
  const comments = getComments().filter((c) => c.id !== id);
  saveComments(comments);
};
