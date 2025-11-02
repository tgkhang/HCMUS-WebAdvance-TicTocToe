import { Box, Alert, Button } from '@mui/material'
import RefreshIcon from '@mui/icons-material/Refresh'

/**
 * ErrorMessage component - Displays error message with retry button
 */
function ErrorMessage({ message = 'Something went wrong', onRetry }) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 4,
        minHeight: '200px'
      }}
    >
      <Alert severity="error" sx={{ marginBottom: 2, maxWidth: '500px' }}>
        {message}
      </Alert>
      {onRetry && (
        <Button
          variant="contained"
          startIcon={<RefreshIcon />}
          onClick={onRetry}
        >
          Try Again
        </Button>
      )}
    </Box>
  )
}

export default ErrorMessage
