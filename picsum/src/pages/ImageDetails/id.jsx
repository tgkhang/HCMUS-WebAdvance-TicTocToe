import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import {
  Container,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Box,
  Chip,
  Stack,
} from '@mui/material'
import DownloadIcon from '@mui/icons-material/Download'
import { getPictureDetails } from '~/apis'
import Loading from '~/components/Loading/Loading'
import ErrorMessage from '~/components/ErrorMessage/ErrorMessage'

function ImageDetails() {
  const { id } = useParams()
  const [photo, setPhoto] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Fetch photo details
  useEffect(() => {
    const fetchPhotoDetails = async () => {
      setLoading(true)
      setError(null)

      try {
        const data = await getPictureDetails(id)
        setPhoto(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchPhotoDetails()
  }, [id])

  const handleDownload = () => {
    const downloadUrl = `https://picsum.photos/id/${id}/${photo.width}/${photo.height}`
    window.open(downloadUrl, '_blank')
  }

  if (loading) {
    return <Loading message='Loading photo details...' />
  }

  if (error) {
    return (
      <ErrorMessage message={error} onRetry={() => window.location.reload()} />
    )
  }

  if (!photo) {
    return <ErrorMessage message='Photo not found' />
  }

  // Generate full-size image URL
  const imageUrl = `https://picsum.photos/id/${photo.id}/800/600`

  return (
    <Container maxWidth='md' sx={{ paddingY: 4 }}>
      <Card>
        <CardMedia
          component='img'
          image={imageUrl}
          alt={`Photo by ${photo.author}`}
          sx={{
            width: '100%',
            height: 'auto',
            maxHeight: '600px',
            objectFit: 'contain',
            backgroundColor: '#f5f5f5',
          }}
        />
        <CardContent>
          <Typography variant='h4' component='h1' gutterBottom>
            Photo by {photo.author}
          </Typography>

          <Stack direction='row' spacing={1} sx={{ marginBottom: 2 }}>
            <Chip label={`${photo.width} � ${photo.height}`} color='primary' />
            <Chip label={`ID: ${photo.id}`} variant='outlined' />
          </Stack>

          <Box sx={{ marginTop: 3 }}>
            <Typography variant='body1' color='text.secondary' paragraph>
              <strong>Author:</strong> {photo.author}
            </Typography>
            <Typography variant='body1' color='text.secondary' paragraph>
              <strong>Dimensions:</strong> {photo.width} � {photo.height} pixels
            </Typography>
            <Typography variant='body1' color='text.secondary' paragraph>
              <strong>Photo URL:</strong>{' '}
              <a href={photo.url} target='_blank' rel='noopener noreferrer'>
                {photo.url}
              </a>
            </Typography>
          </Box>

          <Box sx={{ marginTop: 3 }}>
            <Button
              variant='contained'
              startIcon={<DownloadIcon />}
              onClick={handleDownload}
              fullWidth
            >
              Download Original
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Container>
  )
}

export default ImageDetails
