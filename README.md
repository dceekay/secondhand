# SecondHand

A modern marketplace platform built with Next.js, React, TypeScript, Tailwind CSS, Shadcn/UI, and Zustand.

SecondHand is designed to provide a fast, intuitive, and scalable experience for buying and selling pre-owned products while maintaining a clean and maintainable frontend architecture.

---

## Overview

SecondHand is a peer-to-peer marketplace focused on connecting buyers and sellers through a modern web experience.

The platform enables users to:

* Browse curated product listings
* Search and filter products
* View detailed product information
* Add products to a persistent shopping cart
* Explore seller profiles
* Discover trusted marketplace sellers
* Navigate a responsive mobile-first interface

The project is currently frontend-focused and uses structured mock data while core marketplace functionality is developed.

---

## Objectives

The primary goal of the project is to demonstrate modern marketplace architecture and frontend engineering practices.

Key objectives include:

* Responsive marketplace design
* Scalable component architecture
* State management with persistence
* Marketplace user experience design
* Seller and product management workflows
* Preparation for backend integration

---

## Technology Stack

### Frontend

* Next.js 16 (App Router)
* React 19
* TypeScript
* Tailwind CSS v4
* Shadcn/UI
* Radix UI
* Lucide React

### State Management

* Zustand
* Zustand Persist Middleware

### User Experience

* Framer Motion
* Sonner Notifications
* Responsive Mobile-First Design

---

## Current Features

### Marketplace

* Product Catalog
* Product Detail Pages
* Category Browsing
* Product Search
* Dynamic Filtering
* Product Sorting
* Condition-Based Product Classification

### Seller System

* Seller Profiles
* Seller Ratings
* Verification Status
* Seller Bios
* Seller Statistics
* Seller Product Listings

### Shopping Experience

* Persistent Shopping Cart
* Quantity Management
* Dynamic Price Calculations
* Cart Drawer
* Local Storage Persistence

### User Interface

* Responsive Layout
* Mobile Navigation
* Product Cards
* Condition Badges
* Marketplace Search Experience
* Seller Discovery

---

## Architecture

SecondHand follows a component-driven architecture using the Next.js App Router.

### Rendering Strategy

The platform leverages:

* Server Components
* Client Components
* Static Site Generation (SSG)
* Dynamic Route Generation
* Route-Based Code Splitting

This approach delivers:

* Faster page loads
* Better SEO
* Reduced bundle sizes
* Improved maintainability

### State Management

Global application state is managed using Zustand.

Current state modules include:

* Shopping Cart
* Cart Persistence
* Quantity Management

The state layer is designed to support future marketplace functionality such as:

* Wishlists
* Recently Viewed Products
* User Preferences
* Seller Dashboards

---

## Project Structure

```text
app/
├── checkout/
├── data/
├── product/
├── products/
├── sellers/
├── layout.tsx
└── page.tsx

components/
├── home/
├── layout/
├── products/
├── sellers/
├── shared/
└── ui/

store/
├── cart-store.ts

lib/
├── types.ts
├── utils.ts
```

---

## Completed Features

### Marketplace Foundation

* [x] Next.js Setup
* [x] Tailwind CSS
* [x] Shadcn/UI Integration
* [x] Zustand Integration
* [x] Responsive Layout
* [x] Homepage
* [x] Product Catalog
* [x] Product Detail Pages
* [x] Search Functionality
* [x] Product Filtering
* [x] Product Sorting
* [x] Shopping Cart
* [x] Seller Profiles

---

## Roadmap

### Phase 2 — Marketplace Experience

* [ ] Wishlist System
* [ ] Recently Viewed Products
* [ ] Enhanced Checkout Experience
* [ ] Product Reviews
* [ ] Seller Reviews

### Phase 3 — Seller Ecosystem

* [ ] Seller Dashboard
* [ ] Product Upload System
* [ ] Listing Management
* [ ] Inventory Management
* [ ] Seller Analytics

### Phase 4 — Backend Integration

* [ ] MongoDB Atlas
* [ ] Authentication System
* [ ] User Management
* [ ] API Layer
* [ ] Cloud Storage

### Phase 5 — Search & Discovery

* [ ] Advanced Search
* [ ] Semantic Search
* [ ] Vector Database Integration
* [ ] Intelligent Product Discovery
* [ ] Marketplace Recommendations

---

## SIWES Project

This project is being developed as part of the Student Industrial Work Experience Scheme (SIWES).

The system demonstrates practical software engineering concepts including:

* Frontend Architecture
* State Management
* Marketplace Design
* Component Engineering
* Responsive Development
* Type Safety
* User Experience Design
* Ecommerce Workflows

---

## Developer

Ceekay

Software Engineer | Frontend Developer | Full Stack Developer

Focused on building scalable digital products, marketplace platforms, and modern web applications.

---

## Vision

SecondHand aims to evolve into a full-featured marketplace platform that combines modern frontend engineering practices with scalable marketplace architecture while providing a seamless buying and selling experience.
