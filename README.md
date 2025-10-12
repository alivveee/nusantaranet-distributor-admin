# 🗺️ Nusantara Network Route Planner - Web (Admin Dashboard)

A web-based information system for managing distribution routes, field assignments, and customer data at **PT Nusantara Network**.  
This system allows administrators to plan the shortest delivery routes automatically using a **Genetic Algorithm**, track field employees in real time, and manage business data efficiently.

## 🚀 Features

- 🔐 **Authentication System** for admin and employees  
- 📍 **Automatic Shortest Route Planning** using Genetic Algorithm + Google Distance Matrix API  
- 👨‍💼 **Task Assignment Management** (create, edit, track employee tasks)  
- 🗂️ **Customer & Product Database Management**  
- 📊 **Route History & Performance Reports**  
- 🛰️ **Real-time Employee Tracking**

## 🛠️ Tech Stack

- **Frontend:** NextJS, TypeScript, ShadcnUI 
- **Backend:** Supabase (PostgreSQL + Auth + Storage)  
- **Mapping API:** Google Maps Distance Matrix API  
- **State Management:** Zustand  
- **Deployment:** Vercel  

## 🧩 System Architecture

The web app serves as the **Admin Dashboard**, responsible for:
- Creating and assigning routes to field staff  
- Monitoring task progress  
- Viewing route optimization results  

It communicates with the mobile client via RESTful API and Supabase backend.
(https://github.com/alivveee/nusantara-network-staff)

## ⚙️ Installation

1. Clone the repository  
   ```bash
   git clone https://github.com/alivveee/nusantara-network-admin.git
   cd nusantara-network-admin
2. Install dependencies
   ```bash
   npm install
3. Set up environment variables (.env)
    ```bash
   NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=
   NEXT_PUBLIC_SUPABASE_URL=
   NEXT_PUBLIC_SUPABASE_ANON_KEY=
   SERVICE_ROLE_KEY=
4. Run the development server
   ```bash
   npm run dev
5. Build for production
   ```bash
   npm run build

