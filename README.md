# 🗺️ Nusantara Network Route Planner - Web (Admin Dashboard)

A web-based information system for managing distribution routes, field assignments, and customer data at **PT Nusantara Network**.  
This system allows administrators to plan the shortest delivery routes automatically using a **Genetic Algorithm**, track field employees in real time, and manage business data efficiently.

> [!IMPORTANT]
> **Mobile App Integration:** This Web Admin Dashboard communicates and coordinates with the mobile client application used by field employees via RESTful API and a Supabase backend.  
> 🔗 **Staff Mobile Repository:** [Nusantara Network Staff App](https://github.com/alivveee/nusantara-network-staff)

## 🚀 Features

- 🔐 **Authentication System** for admin and employees  
- 📍 **Automatic Shortest Route Planning** using Genetic Algorithm + OSRM (Open Source Routing Machine) API  
- 🗺️ **Interactive Maps** powered by Leaflet and OpenStreetMap
- 👨‍💼 **Task Assignment Management** (create, edit, track employee tasks)  
- 🗂️ **Customer & Product Database Management**  
- 📊 **Route History & Performance Reports**  
- 🛰️ **Real-time Employee Tracking**

## 🛠️ Tech Stack

- **Frontend:** NextJS, TypeScript, ShadcnUI 
- **Backend:** Supabase (PostgreSQL + Auth + Storage)  
- **Mapping & Routing:** Leaflet, OpenStreetMap, OSRM API  
- **State Management:** Zustand  
- **Deployment:** Vercel  

## 📂 Folder Structure Conventions (Next.js)

To prevent utility, state, action, and component folders from being registered as routes in the Next.js App Router, the project uses the leading underscore prefix (`_`) convention for non-page folders:
- `_actions/`: Server actions for database operations
- `_components/`: Reusable components specific to the route
- `_store/`: Zustand state management store
- `_algorithm/`: Genetic algorithm implementation

## 🧩 System Architecture

The web app serves as the **Admin Dashboard**, responsible for:
- Creating and assigning routes to field staff  
- Monitoring task progress  
- Viewing route optimization results  

## ⚙️ Installation

1. Clone the repository  
   ```bash
   git clone https://github.com/alivveee/nusantara-network-admin.git
   cd nusantara-network-admin
   ```
2. Install dependencies
   ```bash
   npm install
   ```
3. Set up environment variables (.env)
   ```bash
   NEXT_PUBLIC_SUPABASE_URL=
   NEXT_PUBLIC_SUPABASE_ANON_KEY=
   SERVICE_ROLE_KEY=
   ```
4. Run the development server
   ```bash
   npm run dev
   ```
5. Build for production
   ```bash
   npm run build
   ```
