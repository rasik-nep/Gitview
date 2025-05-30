# GitView - GitHub Profile Viewer

GitView is a modern web application that allows users to explore GitHub profiles and repositories with a beautiful, responsive interface. Built with Next.js and TypeScript, it provides a seamless experience for viewing GitHub data.

## Features

- **GitHub Profile Viewing**: View detailed information about GitHub users
- **Repository Exploration**: Browse through user repositories with detailed information
- **Favorites System**: Save and manage your favorite repositories
- **Notes for Favorites**: Add personal notes to your favorite repositories
- **Responsive Design**: Beautiful UI that works on all devices
- **Real-time Updates**: Data is refreshed every 60 seconds using ISR (Incremental Static Regeneration)

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

### Caching Strategy
- GitHub API responses are cached for 60 seconds using Next.js's built-in ISR
- Favorites are stored in-memory

### State Management
- React's built-in state management (useState, useEffect) for client-side state
- Server-side state handled through Next.js's data fetching methods

### API Routes
- RESTful API endpoints for favorites management
- Server-side API routes for secure GitHub API communication

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
