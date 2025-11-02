import { Box, CircularProgress, Typography } from '@mui/material'

/**
 * Loading component - Shows a loading spinner with optional message
 */
function Loading({ message = 'Loading...' }) {
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
      <CircularProgress size={50} />
      <Typography variant="body1" sx={{ marginTop: 2 }} color="text.secondary">
        {message}
      </Typography>
    </Box>
  )
}

export default Loading
