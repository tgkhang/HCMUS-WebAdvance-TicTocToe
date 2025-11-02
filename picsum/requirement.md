# 📸 Lorem Picsum Photo Gallery

## 🎯 Objective

Build a modern React application that fetches and displays photos from the **Lorem Picsum API**. Users can browse through a photo gallery and view detailed information about each image.

---

## 📋 Requirements

### 🖼️ Display a Grid/List of Photos

- **API Integration**: Fetch photos from [Lorem Picsum API](https://picsum.photos/)
- **Layout**: Display photos in a responsive grid or list view
- **Photo Cards**: Each photo should show:
  - 🖼️ Thumbnail image
  - 👤 Author's name
  - 📝 Basic photo information

### ♾️ Infinite Scroll (Scroll to Load More)

- **Auto-loading**: Automatically load more photos as user scrolls down
- **Pagination**: Use the `page` parameter from Lorem Picsum API
- **Loading States**: 
  - ⏳ Show loading indicator when fetching new photos
  - 🚫 Handle end-of-list scenarios gracefully
- **Performance**: Smooth scrolling experience without lag

### 🔍 View Photo Details on Click

- **Navigation**: Click any photo to view detailed information
- **Detail View Components**:
  - 🖼️ Full-size image display
  - 📝 Photo title (or placeholder if unavailable)
  - 👤 Author information
  - 📄 Photo description (or placeholder if unavailable)
  - 🔙 Navigation back to gallery

### 🗺️ Navigation and Routing

- **Router**: Implement React Router for navigation
- **URL Structure**:
  - `/` or `/photos` - Photo gallery/list view
  - `/photos/:id` - Individual photo detail view
- **Browser Support**: Proper browser back/forward button functionality

### 🔌 API Integration

- **Endpoints**: Use official Lorem Picsum API endpoints
- **Error Handling**: 
  - ⚠️ Graceful error handling for network issues
  - 🔄 Retry mechanisms for failed requests
  - 📱 Offline state handling
- **Loading States**: Clear visual feedback during data fetching

### 🎨 Styling and Responsiveness

- **Framework**: Use modern CSS framework (Tailwind CSS, Material-UI, or Bootstrap)
- **Responsive Design**: 
  - 📱 Mobile-first approach
  - 💻 Desktop optimization
  - 📐 Flexible grid layouts
- **User Experience**: Clean, intuitive interface design

---

## 📊 Grading Rubric

| **Criteria** | **Description** | **Points** |
|--------------|-----------------|:----------:|
| 🔌 **API Integration** | Successfully fetches data from Lorem Picsum API with proper error handling | **1** |
| 🖼️ **Photo Grid/List Display** | Responsive, well-styled grid/list with author information | **2** |
| ♾️ **Infinite Scroll** | Smooth infinite scroll with loading indicators and pagination | **1** |
| 🔍 **Photo Details View** | Complete detail view with image, title, author, and description | **2** |
| 🗺️ **Routing and Navigation** | Intuitive URLs and functional navigation system | **1** |
| 🎨 **Styling and Responsiveness** | Professional design, fully responsive across all devices | **1** |
| 💻 **Code Quality** | Well-organized code with comments, reusable components, and React best practices | **1** |
| 🌐 **Public Hosting** | Successfully deployed to a public hosting platform | **1** |

### **Total Points: 10**

---

## 🚀 Technical Stack

- **Frontend**: React 18+ with Hooks
- **Routing**: React Router DOM
- **Styling**: Material-UI / Tailwind CSS / Bootstrap
- **HTTP Client**: Axios / Fetch API
- **Build Tool**: Vite
- **Deployment**: Netlify / Vercel / GitHub Pages

## 📚 API Documentation

- **Base URL**: `https://picsum.photos/`
- **Photos List**: `https://picsum.photos/v2/list?page={page}&limit={limit}`
- **Photo Details**: `https://picsum.photos/id/{id}/info`

---

## ✅ Submission Requirements

1. 📁 Complete source code with proper folder structure
2. 📖 README.md with setup instructions
3. 🌐 Live demo URL
4. 📝 Brief documentation of features implemented

---

*Happy coding! 🚀*