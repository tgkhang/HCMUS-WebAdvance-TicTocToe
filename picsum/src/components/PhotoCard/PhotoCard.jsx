import { Card, CardMedia, CardContent, Typography, CardActionArea } from '@mui/material'

/**
 * PhotoCard component - Displays a single photo card in the gallery
 * @param {Object} photo - Photo object from API
 * @param {Function} onNavigate - Optional custom navigation handler
 */
function PhotoCard({ photo, onNavigate }) {
  const handleClick = () => {
    if (onNavigate) {
      onNavigate()
    }
  }

  // Generate thumbnail URL (300x200 for cards)
  const thumbnailUrl = `https://picsum.photos/id/${photo.id}/300/200`

  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: 'transform 0.2s, box-shadow 0.2s',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: 6
        }
      }}
    >
      <CardActionArea onClick={handleClick} sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}>
        <CardMedia
          component="img"
          height="200"
          image={thumbnailUrl}
          alt={`Photo by ${photo.author}`}
          loading="lazy"
          sx={{ objectFit: 'cover' }}
        />
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography variant="h6" component="div" gutterBottom noWrap>
            {photo.author}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {photo.width} × {photo.height}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

export default PhotoCard
