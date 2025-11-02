import Box from '@mui/material/Box'
import './App.css'
import HeaderBar from './components/HeaderBar/HeaderBar'
import { Navigate, Route, Routes } from 'react-router-dom'
import NotFound from './pages/404/NotFound'
import Board from './pages/Boards/Board'
import ImageDetail from './pages/ImageDetails/id'

function App() {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <HeaderBar />
      <Box component="main" sx={{ flexGrow: 1, p: 2 }}>
        <Routes>
          {/* Home route - redirects to /photos */}
          <Route path="/" element={<Navigate to="/photos" replace />} />

          {/* Photo gallery route */}
          <Route path="/photos" element={<Board />} />

          {/* Photo detail route with dynamic ID */}
          <Route path="/photos/:id" element={<ImageDetail />} />

          {/* 404 Not Found route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Box>
    </Box>
  )
}

export default App
