import { useState, useEffect } from 'react'
import { blink } from '../blink/client'
import type { User } from '../types'

interface AuthState {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
}

export function useAuth() {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isLoading: true,
    isAuthenticated: false
  })

  useEffect(() => {
    const unsubscribe = blink.auth.onAuthStateChanged((state) => {
      setAuthState({
        user: state.user ? {
          id: state.user.id,
          email: state.user.email,
          displayName: state.user.displayName,
          phone: state.user.phone,
          companyName: state.user.companyName,
          userType: state.user.userType || 'buyer',
          createdAt: state.user.createdAt || new Date().toISOString(),
          updatedAt: state.user.updatedAt || new Date().toISOString()
        } : null,
        isLoading: state.isLoading,
        isAuthenticated: state.isAuthenticated
      })
    })

    return unsubscribe
  }, [])

  const login = () => {
    blink.auth.login()
  }

  const logout = () => {
    blink.auth.logout()
  }

  const updateProfile = async (updates: Partial<User>) => {
    try {
      await blink.auth.updateMe(updates)
      return { success: true }
    } catch (error) {
      console.error('Failed to update profile:', error)
      return { success: false, error: error.message }
    }
  }

  return {
    ...authState,
    login,
    logout,
    updateProfile
  }
}