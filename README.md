# 💻 Mini Order Management System (React JS Web UI)

A modern, responsive, and interactive Web Dashboard for the **Order Management System** built with **React JS**, **Vite**, **Tailwind CSS**, and **Axios**.

---

## 🚀 Key Features

- **Customer Management**: View, search, paginate, create, edit, and delete customer profiles.
- **Product Inventory & Stock**: Manage item prices, track inventory levels with dynamic stock status badges (*In Stock*, *Low Stock*, *Out of Stock*).
- **Order Processing & Transaction History**:
  - Interactive Order Placement Modal (select customer, add multi-item products, dynamic stock validation & live total calculation).
  - Real-time Order Status Updates (`PENDING`, `PAID`, `SHIPPED`, `DELIVERED`, `CANCELLED`).
  - Automatic Inventory Stock Restoration upon order cancellation.
- **Error Interceptor**: Clean modal and toast error notifications handling Spring Boot `@ControllerAdvice` validation feedback.

---

## 🛠️ Tech Stack

- **Framework**: React 18 (Vite 5)
- **Styling**: Tailwind CSS
- **HTTP Client**: Axios
- **Icons**: Lucide React

---

## ⚙️ How to Run

1. Clone the repository:
   ```bash
   git clone https://github.com/YimLemeng/Mini-order-management-web.git
   cd Mini-order-management-web
2. Install dependencies:
   ```bash
   npm install
4. Start development server:
   ```bash
    npm run dev
6. Open your browser at http://localhost:5173.
