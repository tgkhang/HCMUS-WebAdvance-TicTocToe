import axios from 'axios'

// API base configuration
const API_BASE = 'https://picsum.photos'
const TIMEOUT = 10000 // 10 seconds

// Create axios instance with config
const apiClient = axios.create({
  baseURL: API_BASE,
  timeout: TIMEOUT
})

/**
 * Fetch details for a specific photo by ID
 * @param {string|number} pictureId - The photo ID
 * @returns {Promise} Photo details object
 */
export const getPictureDetails = async (pictureId) => {
  try {
    const response = await apiClient.get(`/id/${pictureId}/info`)
    return response.data
  } catch (error) {
    console.error('Error fetching picture details:', error)
    throw new Error('Failed to load photo details. Please try again.')
  }
}

/**
 * Fetch a list of photos with pagination
 * @param {number} page - Page number (default: 1)
 * @param {number} limit - Number of photos per page (default: 20)
 * @returns {Promise} Array of photo objects
 */
export const getPictures = async (page = 1, limit = 20) => {
  try {
    const response = await apiClient.get(`/v2/list?page=${page}&limit=${limit}`)
    return response.data
  } catch (error) {
    console.error('Error fetching pictures:', error)
    throw new Error('Failed to load photos. Please try again.')
  }
}