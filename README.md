# GitView - GitHub Profile Viewer

GitView is a modern web application that allows users to explore GitHub profiles and repositories with a beautiful, responsive interface. Built with Next.js and TypeScript, it provides a seamless experience for viewing GitHub data.

## Features

- **GitHub Profile Viewing**: View detailed information about GitHub users
- **Repository Exploration**: Browse through user repositories with detailed information
- **Favorites System**: Save and manage your favorite repositories
- **Notes for Favorites**: Add personal notes to your favorite repositories
- **Responsive Design**: Beautiful UI that works on all devices
- **Real-time Updates**: Data is refreshed every 60 seconds using ISR (Incremental Static Regeneration)
- **GitHub Authentication**: Secure sign-in with GitHub OAuth

## Tech Stack

- **Framework**: Next.js 15.3.2
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Testing**: Jest with React Testing Library
- **Font**: Raleway (Google Fonts)

## Setup and Installation

1. Clone the repository:
```bash
git clone [your-repo-url]
cd gitview
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run test` - Run Jest tests
- `npm run test:watch` - Run Jest tests in watch mode

## Architectural Decisions

### Rendering Strategy
- **ISR (Incremental Static Regeneration)**: Used for GitHub API data with a 60-second revalidation period
- **Client Components**: Used for interactive features like favorites and notes
- **Server Components**: Used for initial data fetching and static content

#### Why ISR was chosen over SSR or SSG:

1. **GitHub API Rate Limits**:
   - GitHub's API has strict rate limits (60 requests per hour for unauthenticated requests)
   - ISR helps manage these rate limits by:
     - Caching responses for 60 seconds
     - Serving cached content to multiple users
     - Only making new API requests after the cache expires

2. **Performance Benefits**:
   - Faster page loads for users as content is served from cache
   - Reduced server load by serving cached content
   - Better user experience with instant page loads

3. **Data Freshness**:
   - 60-second revalidation ensures data is relatively fresh
   - GitHub profile and repository data doesn't change very frequently
   - Balance between performance and data freshness

4. **Why not SSG**:
   - SSG would be too static for GitHub data
   - Would require manual rebuilds to update content
   - Not suitable for frequently changing data

5. **Why not SSR**:
   - SSR would make a new API call for every request
   - Would quickly hit GitHub API rate limits
   - Slower page loads for users
   - Higher server load

### Caching Strategy
- GitHub API responses are cached for 60 seconds using Next.js's built-in ISR

### In-memory vs. local storage
- Favorites are stored in-memory on the server for the following reasons:
  1. **Server-Side State Management**:
     - Centralized state management across all clients
     - Data stored in server-side memory with user email as key
     - Consistent state across all user sessions
  2. **Authentication Integration**:
     - Tight integration with GitHub OAuth
     - Favorites associated with user email
     - Server-side authentication verification
  3. **Real-time Synchronization**:
     - Immediate synchronization across all client sessions
     - Changes reflected instantly for all active sessions
     - Managed through React Query's client-side state
  4. **Security**:
     - Server-side storage prevents client-side manipulation
     - All operations require authentication
     - Protected from unauthorized access
  5. **API-First Design**:
     - RESTful API architecture
     - All operations through API endpoints
     - Maintainable and scalable design

### State Management
- React Query (@tanstack/react-query) for client-side state management with automatic caching and synchronization
- Server-side state handled through Next.js's data fetching methods

### API Routes
- RESTful API endpoints for favorites management
- Server-side API routes for secure GitHub API communication

### Authentication
- **NextAuth.js**: Implemented for secure GitHub OAuth authentication
- **JWT Strategy**: Used for session management with 30-day expiration
- **Protected Routes**: Authentication required for favorites management

## Deployment

The application is configured for deployment on Vercel:

1. Push your code to GitHub
2. Import the project in Vercel
3. Deploy with default settings

https://gitview-eight.vercel.app/

## Development Notes

- The application uses TypeScript for type safety
- ESLint is configured for code quality
- Jest is set up for testing
- Tailwind CSS is used for styling
- The project follows Next.js 13+ App Router conventions
