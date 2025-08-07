# Overview

This is a sophisticated Russian AI customer support landing page built with modern full-stack architecture. The project showcases an AI agent service for 24/7 customer support, designed as an "anti-landing page" that emphasizes elegant storytelling over aggressive marketing. The design follows premium aesthetic principles with ultra-subtle dark themes, sophisticated animations, and minimalist interactions to convey quiet confidence and technological excellence.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React 18 with TypeScript for type safety and modern development
- **Routing**: Wouter for lightweight client-side routing
- **UI Framework**: Shadcn/ui components built on Radix UI primitives for accessibility and customization
- **Styling**: Tailwind CSS with custom CSS variables for theming and responsive design
- **State Management**: TanStack Query (React Query) for server state management and API caching
- **Form Handling**: React Hook Form with Zod validation for type-safe form validation
- **Build Tool**: Vite for fast development and optimized production builds

## Backend Architecture
- **Runtime**: Node.js with Express.js framework for RESTful API endpoints
- **Language**: TypeScript for full-stack type safety
- **API Design**: RESTful architecture with structured error handling and logging middleware
- **Validation**: Zod schemas for request/response validation
- **Development**: Hot module replacement and development middleware integration

## Data Storage Solutions
- **Database**: PostgreSQL configured with Drizzle ORM for type-safe database operations
- **Schema Management**: Drizzle Kit for database migrations and schema evolution
- **Connection**: Neon Database serverless PostgreSQL for cloud-native data storage
- **Session Storage**: PostgreSQL-backed session storage using connect-pg-simple

## Authentication and Authorization
- **User Management**: Basic user schema with username/password authentication
- **Session Handling**: Express session management with PostgreSQL persistence
- **Storage Interface**: Abstracted storage layer supporting both memory and database implementations

## Design System
- **Design Philosophy**: "Anti-landing page" approach emphasizing sophisticated storytelling over aggressive marketing
- **Color Palette**: Ultra-premium dark theme with subtle blue/purple accents and refined opacity variations
- **Component Library**: Comprehensive UI component system based on Radix UI primitives with custom styling
- **Theming**: CSS custom properties for sophisticated color gradients and spacing harmony
- **Typography**: Inter font family with precise letter-spacing and font weights for premium feel
- **Animations**: Subtle, slow animations focused on neural network effects and smooth state transitions
- **Responsive Design**: Mobile-first approach with carefully considered breakpoints and layouts

## Development Workflow
- **Hot Reloading**: Vite development server with Express middleware integration
- **Type Checking**: Comprehensive TypeScript configuration across client, server, and shared code
- **Code Organization**: Monorepo structure with shared types and utilities
- **Path Aliases**: Configured import aliases for clean, maintainable code structure

# External Dependencies

## Core Frameworks
- **React**: Frontend UI library with hooks and modern patterns
- **Express.js**: Node.js web framework for API server
- **Vite**: Build tool and development server
- **TypeScript**: Static type checking across the entire stack

## Database and ORM
- **Drizzle ORM**: Type-safe database toolkit for PostgreSQL
- **Neon Database**: Serverless PostgreSQL cloud database
- **connect-pg-simple**: PostgreSQL session store for Express

## UI and Styling
- **Tailwind CSS**: Utility-first CSS framework
- **Radix UI**: Low-level UI primitives for accessibility
- **Shadcn/ui**: Pre-built component library
- **Lucide React**: Icon library for consistent iconography

## State Management and API
- **TanStack Query**: Server state management and caching
- **React Hook Form**: Form handling and validation
- **Zod**: Schema validation library

## Development Tools
- **Replit Integration**: Runtime error overlay and cartographer for Replit environment
- **ESBuild**: Fast JavaScript bundler for production builds
- **PostCSS**: CSS processing with Autoprefixer

## Design Assets
- **Google Fonts**: Inter font family for typography
- **Custom Animations**: Neural network background effects and smooth transitions