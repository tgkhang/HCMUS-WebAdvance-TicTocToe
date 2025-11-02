import { createRoot } from 'react-dom/client'
import '~/index.css'
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider } from '@mui/material/styles'
import theme from '~/theme.js'
import { BrowserRouter } from 'react-router-dom'
import App from '~/App.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter basename='/'>
    <ThemeProvider theme={theme}>
      <CssBaseline enableColorScheme />
      <App />
    </ThemeProvider>
  </BrowserRouter>
)