import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { fetchCurrentUser, loginUser, registerUser } from '../api/auth.js'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem('qr_guard_token') || '')
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let active = true

    async function hydrateUser() {
      if (!token) {
        setUser(null)
        setLoading(false)
        return
      }

      try {
        const currentUser = await fetchCurrentUser()
        if (active) {
          setUser(currentUser)
        }
      } catch (error) {
        localStorage.removeItem('qr_guard_token')
        setToken('')
        setUser(null)
      } finally {
        if (active) {
          setLoading(false)
        }
      }
    }

    hydrateUser()

    return () => {
      active = false
    }
  }, [token])

  const saveSession = (accessToken, nextUser) => {
    localStorage.setItem('qr_guard_token', accessToken)
    setToken(accessToken)
    setUser(nextUser)
  }

  const login = async (payload) => {
    const response = await loginUser(payload)
    saveSession(response.access_token, response.user)
    return response
  }

  const register = async (payload) => {
    const response = await registerUser(payload)
    saveSession(response.access_token, response.user)
    return response
  }

  const logout = () => {
    localStorage.removeItem('qr_guard_token')
    setToken('')
    setUser(null)
  }

  const refreshUser = async () => {
    if (!token) {
      setUser(null)
      return null
    }

    const currentUser = await fetchCurrentUser()
    setUser(currentUser)
    return currentUser
  }

  const value = useMemo(
    () => ({
      token,
      user,
      loading,
      isAuthenticated: Boolean(token),
      login,
      register,
      logout,
      refreshUser,
    }),
    [token, user, loading],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }

  return context
}
