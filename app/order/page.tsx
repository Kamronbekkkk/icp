'use client';

import { useState } from "react";

interface OrderFormProps {
  closeModal: () => void;
}

export default function OrderForm({ closeModal }: OrderFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    telegram: "",
    phone: "",
    description: "",
  });

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
      <input
        type="text"
        placeholder="Ism sharif"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        required
      />
      <input
        type="text"
        placeholder="Telegram username"
        value={formData.telegram}
        onChange={(e) => setFormData({ ...formData, telegram: e.target.value })}
        required
      />
      <input
        type="text"
        placeholder="Telefon raqam"
        value={formData.phone}
        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
        required
      />
      <textarea
        placeholder="Sayt haqida qisqacha yozing"
        value={formData.description}
        onChange={(e) =>
          setFormData({ ...formData, description: e.target.value })
        }
        required
      />
      <button type="submit" className="btn-primary">Yuborish</button>
    </form>
  );
}
