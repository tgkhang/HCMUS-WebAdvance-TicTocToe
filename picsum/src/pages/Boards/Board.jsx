import { useState, useEffect, useCallback, useRef } from 'react'
import { Container, Typography, Box, Grid } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { getPictures } from '~/apis'
import PhotoCard from '~/components/PhotoCard/PhotoCard'
import Loading from '~/components/Loading/Loading'
import ErrorMessage from '~/components/ErrorMessage/ErrorMessage'

function Board() {
  const navigate = useNavigate()

  // Try to restore state from sessionStorage (for browser back button ONLY)
  const getStoredState = () => {
    try {
      // Check if we just navigated away (back button scenario)
      const didNavigateAway = sessionStorage.getItem('didNavigateAway') === 'true'

      const stored = sessionStorage.getItem('boardState')

      // Clear the navigation flag
      sessionStorage.removeItem('didNavigateAway')

      if (stored && didNavigateAway) {
        const parsed = JSON.parse(stored)

        // Check if data is recent (within 10 minutes)
        if (parsed.timestamp && Date.now() - parsed.timestamp < 10 * 60 * 1000) {
          return parsed
        }
      }

      // Clear state if not restoring
      sessionStorage.removeItem('boardState')
    } catch {
      // Silent fail - just start fresh
    }
    return null
  }

  const storedState = getStoredState()

  const [photos, setPhotos] = useState(storedState?.photos || [])
  const [page, setPage] = useState(storedState?.page || 1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [hasMore, setHasMore] = useState(true)
  const [initialLoad, setInitialLoad] = useState(!storedState)
  const observer = useRef()
  const isFetching = useRef(false)
  const allowInfiniteScroll = useRef(storedState ? true : false)
  const hasRestoredScroll = useRef(false)

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
        setPhotos((prev) => (pageNum === 1 ? data : [...prev, ...data]))
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

  // Load initial photos only if no stored state
  useEffect(() => {
    if (!storedState) {
      fetchPhotos(1)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Restore scroll position when coming back via browser back button
  useEffect(() => {
    if (storedState?.scrollPosition && !hasRestoredScroll.current) {
      // Wait a bit for images to render
      const timer = setTimeout(() => {
        window.scrollTo(0, storedState.scrollPosition)
        hasRestoredScroll.current = true
      }, 100)

      return () => clearTimeout(timer)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  // Save state to sessionStorage periodically for back button
  useEffect(() => {
    const saveState = () => {
      try {
        const state = {
          photos,
          page,
          scrollPosition: window.scrollY,
          timestamp: Date.now()
        }
        sessionStorage.setItem('boardState', JSON.stringify(state))
      } catch (err) {
        console.error('Failed to save state:', err)
      }
    }

    // Save on scroll (debounced)
    let scrollTimer
    const handleScroll = () => {
      if (!allowInfiniteScroll.current) {
        console.log('User scrolled - enabling infinite scroll')
        allowInfiniteScroll.current = true
      }

      clearTimeout(scrollTimer)
      scrollTimer = setTimeout(saveState, 500)
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      clearTimeout(scrollTimer)
      // Save final state on unmount
      saveState()
    }
  }, [photos, page])


  // Infinite scroll - last element ref
  const lastPhotoRef = useCallback(
    (node) => {
      if (loading || isFetching.current) return
      if (observer.current) observer.current.disconnect()

      observer.current = new IntersectionObserver(
        (entries) => {
          if (
            entries[0].isIntersecting &&
            hasMore &&
            !loading &&
            !isFetching.current &&
            allowInfiniteScroll.current
          ) {
            console.log('Last photo is visible, loading more...')
            setPage((prevPage) => {
              console.log(
                'Incrementing page from',
                prevPage,
                'to',
                prevPage + 1
              )
              return prevPage + 1
            })
          }
        },
        {
          root: null,
          rootMargin: '-100px',
          threshold: 0,
        }
      )

      if (node) observer.current.observe(node)
    },
    [loading, hasMore]
  )

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
    return <Loading message='Loading photos...' />
  }

  return (
    <Container maxWidth='lg' sx={{ paddingY: 4 }}>
      <Typography
        variant='h4'
        component='h1'
        gutterBottom
        sx={{
          marginBottom: 3,
          textAlign: 'center',
        }}
      >
        Photo Gallery
      </Typography>

      <Typography
        variant='body2'
        sx={{
          marginBottom: 2,
          textAlign: 'center',
          color: 'text.secondary',
        }}
      >
        Showing {photos.length} photos (Page {page})
      </Typography>

      <Grid container spacing={3} justifyContent='center' alignItems='stretch'>
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
                // Mark that we're navigating away intentionally
                sessionStorage.setItem('didNavigateAway', 'true')
                navigate(`/photos/${photo.id}`)
              }}
            />
          </Grid>
        ))}
      </Grid>

      {/* Loading more indicator */}
      {loading && !initialLoad && (
        <Box sx={{ marginTop: 4 }}>
          <Loading message='Loading more photos...' />
        </Box>
      )}

      {/* End of list message */}
      {!hasMore && photos.length > 0 && (
        <Box sx={{ textAlign: 'center', marginTop: 4, paddingY: 2 }}>
          <Typography variant='body1' color='text.secondary'>
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
