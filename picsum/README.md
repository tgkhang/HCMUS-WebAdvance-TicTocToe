# IA02 - Photo Gallery

**Course**: Web Advanced - HCMUS
**Student**: Tran Gia Khang - 22127181
**Exercise**: IA02 - Photo Gallery

A modern photo gallery application built with React, featuring infinite scrolling, smart state management, and responsive design.

## 🎯 Features

### Photo Gallery
- ✅ Browse photos from Lorem Picsum API
- ✅ Infinite scroll loading with automatic pagination
- ✅ Responsive grid layout (adapts to all screen sizes)
- ✅ Photo detail view with author info and download functionality
- ✅ Clean Material-UI design with smooth animations

### Smart Navigation & State Management
- ✅ **Browser Back Button**: Automatically restores scroll position and loaded photos
- ✅ **F5 Refresh**: Always starts fresh from the top (no stale data)
- ✅ **Session Persistence**: Uses sessionStorage to maintain state across navigation
- ✅ **Auto-Expiry**: Cached state expires after 10 minutes
- ✅ **SPA Routing**: Works correctly in production with direct URL access

### User Experience
- ✅ Loading indicators for better feedback
- ✅ Error handling with retry functionality
- ✅ Debounced scroll saving (performance optimized)
- ✅ Prevents duplicate API requests
- ✅ Smooth scrolling and transitions

## 🛠️ Tech Stack

- **React 19** - Latest React with modern hooks
- **React Router DOM v7** - Client-side routing
- **Material-UI (MUI) v7** - Component library and theming
- **Tailwind CSS v4** - Utility-first CSS framework
- **Axios** - Promise-based HTTP client
- **Vite** - Fast build tool and dev server
- **Lorem Picsum API** - Free photo service

## 📦 Installation

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Setup

```bash
# Clone the repository
git clone <repository-url>

# Navigate to project directory
cd picsum

# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🚀 Deployment

This project is configured for deployment on **Vercel**.

**Live Demo**: https://hcmus-web-advance-tic-toc-toe-ceto.vercel.app/

### Deployment Configuration

The project includes proper SPA routing configuration for production:

- `vercel.json` - Vercel deployment config (rewrites all routes to index.html)
- `netlify.toml` - Netlify alternative config
- `public/_redirects` - Fallback redirect rules

### Deploy to Vercel

1. **Via Git Integration** (Recommended):
   - Push your code to GitHub
   - Connect repository to Vercel
   - Auto-deploy on every push

2. **Via Vercel CLI**:
   ```bash
   npm i -g vercel
   vercel
   ```

## 📁 Project Structure

```
picsum/
├── public/              # Static assets
│   ├── _redirects      # SPA redirect rules
│   └── vite.svg        # Favicon
├── src/
│   ├── apis/           # API integration layer
│   │   └── index.js    # Picsum API calls
│   ├── components/     # Reusable UI components
│   │   ├── HeaderBar/  # Navigation header
│   │   ├── PhotoCard/  # Photo grid item
│   │   ├── Loading/    # Loading spinner
│   │   └── ErrorMessage/ # Error display
│   ├── pages/          # Route pages
│   │   ├── Boards/     # Main photo gallery
│   │   ├── ImageDetails/ # Photo detail view
│   │   └── 404/        # Not found page
│   ├── App.jsx         # Root component with routing
│   ├── main.jsx        # Application entry point
│   ├── theme.js        # MUI theme customization
│   ├── index.css       # Global styles
│   └── App.css         # Component styles
├── vercel.json         # Vercel deployment config
├── netlify.toml        # Netlify deployment config
├── vite.config.js      # Vite configuration
├── tailwind.config.js  # Tailwind CSS config
└── package.json        # Dependencies and scripts
```

## 🔍 Key Implementation Details

### 1. State Persistence Strategy

The app uses a sophisticated state management approach:

```javascript
// When navigating to photo detail
sessionStorage.setItem('didNavigateAway', 'true')
sessionStorage.setItem('boardState', JSON.stringify({
  photos, page, scrollPosition, timestamp
}))

// On return (back button)
if (didNavigateAway && boardState) {
  // Restore photos, page, and scroll position
}

// On F5 refresh
// didNavigateAway flag doesn't exist → Start fresh
```

**Benefits**:
- Back button: Instant restoration (no re-fetching)
- F5 refresh: Clean state (no stale data)
- Auto-expires after 10 minutes

### 2. Infinite Scroll Implementation

Uses **IntersectionObserver API** for efficient scroll detection:

```javascript
// Observe last photo in grid
const observer = new IntersectionObserver((entries) => {
  if (entries[0].isIntersecting && hasMore) {
    loadMorePhotos()
  }
}, { rootMargin: '-100px' })
```

**Features**:
- Prevents duplicate requests with ref-based locking
- Debounced state saving (500ms delay)
- Only activates after user scrolls
- Configurable trigger distance

### 3. Production Routing Fix

React Router's BrowserRouter requires server-side configuration:

```json
// vercel.json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

This ensures all routes serve `index.html`, allowing client-side routing to work.

## 🔌 API Integration

**Lorem Picsum API** - https://picsum.photos/

### Endpoints Used:

```javascript
// List photos (paginated)
GET https://picsum.photos/v2/list?page={page}&limit={limit}

// Photo details
GET https://picsum.photos/id/{id}/info

// Download photo (direct URL)
https://picsum.photos/id/{id}/{width}/{height}
```

## 🎨 UI Components

### Material-UI Components Used:
- `Container`, `Box`, `Grid` - Layout
- `Card`, `CardMedia`, `CardContent` - Photo cards
- `Typography` - Text styling
- `Button`, `Chip` - Interactive elements
- `CircularProgress` - Loading states

### Tailwind CSS
- Utility classes for spacing, colors, and responsiveness
- Custom theme integration with MUI

## 🌐 Browser Support

- Chrome (latest) ✅
- Firefox (latest) ✅
- Safari (latest) ✅
- Edge (latest) ✅

## 📝 Assignment Requirements Checklist

- [x] Fetch and display photos from API
- [x] Implement infinite scrolling
- [x] Photo detail page
- [x] Responsive design
- [x] React Router navigation
- [x] Error handling
- [x] Loading states
- [x] Production deployment
- [x] Clean code structure
- [x] State management

## 🐛 Known Issues

None currently. All features working as expected in production.

## 📚 Learning Outcomes

This project demonstrates:
- React Hooks (useState, useEffect, useCallback, useRef)
- React Router DOM v7 navigation
- API integration with async/await
- IntersectionObserver API usage
- Session storage for state persistence
- SPA deployment configuration
- Material-UI theming and components
- Performance optimization techniques

## 📄 License

This is an educational project for HCMUS Web Advanced course.

## 🙏 Acknowledgments

- [Lorem Picsum](https://picsum.photos/) - Free photo API
- [Material-UI](https://mui.com/) - React component library
- [Vite](https://vitejs.dev/) - Next generation frontend tooling
- HCMUS Web Advanced Course - Project assignment
