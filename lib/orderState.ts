// lib/orderState.ts
export type Order = {
  id: string
  name: string
  phone: string
  telegramUser: string
  service: string
  status: 'pending' | 'done'
  createdAt: number
}

const STORAGE_KEY = "orders"

export function getOrders(): Order[] {
  if (typeof window === "undefined") return []
  return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]")
}

export function saveOrders(orders: Order[]) {
  if (typeof window === "undefined") return
  localStorage.setItem(STORAGE_KEY, JSON.stringify(orders))
}

export function addOrder(order: Omit<Order, "id" | "status" | "createdAt">) {
  const orders = getOrders()
  const newOrder: Order = {
    ...order,
    id: Date.now().toString(),
    status: "pending",
    createdAt: Date.now()
  }
  orders.push(newOrder)
  saveOrders(orders)
}

export function updateOrderStatus(id: string, status: 'pending' | 'done') {
  const orders = getOrders().map(o =>
    o.id === id ? { ...o, status } : o
  )
  saveOrders(orders)
}

export function deleteOrder(id: string) {
  const orders = getOrders().filter(o => o.id !== id)
  saveOrders(orders)
}
