import { useState, useEffect, useCallback, useRef } from 'react'
import { Container, Typography, Box, Grid } from '@mui/material'
import { useLocation, useNavigate } from 'react-router-dom'
import { getPictures } from '~/apis'
import PhotoCard from '~/components/PhotoCard/PhotoCard'
import Loading from '~/components/Loading/Loading'
import ErrorMessage from '~/components/ErrorMessage/ErrorMessage'

function Board() {
  const location = useLocation()
  const navigate = useNavigate()

  // Restore state from navigation if available
  const savedState = location.state

  const [photos, setPhotos] = useState(savedState?.photos || [])
  const [page, setPage] = useState(savedState?.page || 1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [hasMore, setHasMore] = useState(true)
  const [initialLoad, setInitialLoad] = useState(!savedState)
  const observer = useRef()
  const isFetching = useRef(false)
  const allowInfiniteScroll = useRef(savedState ? true : false)
  const scrollRestored = useRef(false)

  // Fetch photos function
  const fetchPhotos = useCallback(async (pageNum) => {
    // Prevent multiple simultaneous requests
    if (isFetching.current) {
      console.log('Already fetching, skipping request for page:', pageNum)
      return
    }

    console.log('Fetching photos for page:', pageNum)
    isFetching.current = true
    setLoading(true)
    setError(null)

    try {
      const data = await getPictures(pageNum, 20)
      console.log('Received photos:', data.length, 'for page:', pageNum)

      if (data.length === 0) {
        setHasMore(false)
      } else {
        setPhotos(prev => pageNum === 1 ? data : [...prev, ...data])
      }
      setInitialLoad(false)
    } catch (err) {
      setError(err.message)
      setInitialLoad(false)
    } finally {
      setLoading(false)
      isFetching.current = false
    }
  }, [])

  // Load initial photos (only if no saved state)
  useEffect(() => {
    if (!savedState) {
      fetchPhotos(1)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Restore scroll position when coming back
  useEffect(() => {
    if (savedState?.scrollPosition && !scrollRestored.current) {
      console.log('Restoring scroll position:', savedState.scrollPosition)
      setTimeout(() => {
        window.scrollTo(0, savedState.scrollPosition)
        scrollRestored.current = true
      }, 100)

      // Clear the state from history to avoid issues with refresh
      navigate(location.pathname, { replace: true, state: null })
    }
  }, [savedState, navigate, location.pathname])

  // Enable infinite scroll only after user scrolls
  useEffect(() => {
    const handleScroll = () => {
      if (!allowInfiniteScroll.current) {
        console.log('User scrolled - enabling infinite scroll')
        allowInfiniteScroll.current = true
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Infinite scroll - last element ref
  const lastPhotoRef = useCallback((node) => {
    if (loading || isFetching.current) return
    if (observer.current) observer.current.disconnect()

    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore && !loading && !isFetching.current && allowInfiniteScroll.current) {
        console.log('Last photo is visible, loading more...')
        setPage(prevPage => {
          console.log('Incrementing page from', prevPage, 'to', prevPage + 1)
          return prevPage + 1
        })
      }
    }, {
      root: null,
      rootMargin: '-100px', // Only trigger when last element is 100px into viewport (truly at bottom)
      threshold: 0
    })

    if (node) observer.current.observe(node)
  }, [loading, hasMore])

  // Fetch more photos when page changes
  useEffect(() => {
    if (page > 1) {
      fetchPhotos(page)
    }
  }, [page, fetchPhotos])

  // Retry handler
  const handleRetry = () => {
    setPage(1)
    setPhotos([])
    setHasMore(true)
    setInitialLoad(true)
    fetchPhotos(1)
  }

  // Show error on initial load
  if (initialLoad && error) {
    return <ErrorMessage message={error} onRetry={handleRetry} />
  }

  // Show loading on initial load
  if (initialLoad && loading) {
    return <Loading message="Loading photos..." />
  }

  return (
    <Container maxWidth="lg" sx={{ paddingY: 4 }}>
      <Typography
        variant="h4"
        component="h1"
        gutterBottom
        sx={{
          marginBottom: 3,
          textAlign: 'center'
        }}
      >
        Photo Gallery
      </Typography>

      <Typography
        variant="body2"
        sx={{
          marginBottom: 2,
          textAlign: 'center',
          color: 'text.secondary'
        }}
      >
        Showing {photos.length} photos (Page {page})
      </Typography>

      <Grid
        container
        spacing={3}
        justifyContent="center"
        alignItems="stretch"
      >
        {photos.map((photo, index) => (
          <Grid
            item
            key={`${photo.id}-${index}`}
            xs={12}
            sm={6}
            md={4}
            lg={3}
            ref={index === photos.length - 1 ? lastPhotoRef : null}
          >
            <PhotoCard
              photo={photo}
              onNavigate={() => {
                // Save current state before navigating
                const currentState = {
                  photos,
                  page,
                  scrollPosition: window.scrollY
                }
                navigate(`/photos/${photo.id}`, { state: currentState })
              }}
            />
          </Grid>
        ))}
      </Grid>

      {/* Loading more indicator */}
      {loading && !initialLoad && (
        <Box sx={{ marginTop: 4 }}>
          <Loading message="Loading more photos..." />
        </Box>
      )}

      {/* End of list message */}
      {!hasMore && photos.length > 0 && (
        <Box sx={{ textAlign: 'center', marginTop: 4, paddingY: 2 }}>
          <Typography variant="body1" color="text.secondary">
            No more photos to load
          </Typography>
        </Box>
      )}

      {/* Error while loading more */}
      {error && !initialLoad && (
        <Box sx={{ marginTop: 4 }}>
          <ErrorMessage message={error} onRetry={() => fetchPhotos(page)} />
        </Box>
      )}
    </Container>
  )
}

export default Board