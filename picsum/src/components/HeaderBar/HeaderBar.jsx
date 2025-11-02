import Box from '@mui/material/Box'
import AppsIcon from '@mui/icons-material/Apps'
import Typography from '@mui/material/Typography'

function HeaderBar() {
  return (
    <Box
      sx={(theme) => ({
        width: '100%',
        height: theme.trello.appBarHeight,
        display: 'flex',
        px: 2,
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 2,
        overflowX: 'auto',
        bgcolor: '#1565c0',
        ...theme.applyStyles('dark', {
          bgcolor: '#2c3e50',
        }),
        '&::-webkit-scrollbar-track': { m: 2 },
      })}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <AppsIcon sx={{ color: 'white' }} />
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.4 }}>
          <Typography
            variant='span'
            sx={{ fontSize: '1.2rem', fontWeight: 'bold', color: 'white' }}
          >
            {' '}
            Picsum
          </Typography>
        </Box>
      </Box>
    </Box>
  )
}

export default HeaderBar
