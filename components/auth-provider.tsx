'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import { useConnect, useDisconnect, useAddress, useConnectionStatus, useMetamask, useWalletConnect } from '@thirdweb-dev/react'

interface User {
  email: string
  walletAddress: string
  isVerified: boolean
}

interface AuthContextType {
  user: User | null
  login: (email: string, verificationCode: string) => Promise<boolean>
  logout: () => void
  sendVerificationCode: (email: string) => Promise<boolean>
  connectWallet: () => Promise<void>
  disconnectWallet: () => Promise<void>
  isLoggedIn: boolean
  isWalletConnected: boolean
  walletAddress: string | undefined
  connectionStatus: 'unknown' | 'connecting' | 'connected' | 'disconnected'
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  
  // ThirdWeb hooks
  const connect = useConnect()
  const disconnect = useDisconnect()
  const address = useAddress()
  const connectionStatus = useConnectionStatus()
  const metamask = useMetamask()
  const walletConnect = useWalletConnect()
  console.log('AuthProvider: ThirdWeb hooks status:', {
    address,
    connectionStatus,
    connect: typeof connect,
    disconnect: typeof disconnect
  })

  // Load user from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('apeTravelUser')
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
  }, [])

  // Save user to localStorage whenever it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem('apeTravelUser', JSON.stringify(user))
    } else {
      localStorage.removeItem('apeTravelUser')
    }
  }, [user])

  // Update user wallet address when wallet connects/disconnects
  useEffect(() => {
    if (user) {
      // Only update if the wallet address actually changed
      const currentWalletAddress = user.walletAddress || ''
      const newWalletAddress = address || ''
      
      if (currentWalletAddress !== newWalletAddress) {
        setUser(prev => prev ? { ...prev, walletAddress: newWalletAddress } : null)
      }
    }
  }, [address]) // Remove 'user' from dependencies to prevent infinite loop

  const connectWallet = async () => {
    try {
      console.log('Attempting to connect wallet...')
      console.log('Connect function available:', typeof connect)
      console.log('MetaMask available:', typeof metamask)
      console.log('WalletConnect available:', typeof walletConnect)
      
      if (!connect) {
        throw new Error('Wallet connection not available. Please ensure ThirdWeb is properly configured.')
      }
      
      // Check if we're on mobile
      const isMobile = typeof window !== 'undefined' && /Mobi|Android|iPhone|iPad|iPod/i.test(window.navigator.userAgent)
      console.log('Is mobile device:', isMobile)
      
      // Try different connection methods based on availability
      if (isMobile && walletConnect) {
        console.log('Attempting WalletConnect connection...')
        await walletConnect()
      } else if (metamask) {
        console.log('Attempting MetaMask connection...')
        await metamask()
      } else if (connect) {
        console.log('Attempting generic connect...')
        await connect()
      } else {
        throw new Error('No compatible wallet found. Install MetaMask or use a WalletConnect-compatible wallet.')
      }
      console.log('Wallet connected successfully')
    } catch (error) {
      console.error('Failed to connect wallet:', error)
      // Provide more specific error messages
      if (error instanceof Error) {
        if (error.message.includes('User rejected') || error.message.includes('user rejected')) {
          throw new Error('Wallet connection was cancelled by user')
        } else if (error.message.includes('No wallet found') || error.message.includes('no wallet')) {
          throw new Error('No wallet found. Please install a Web3 wallet like MetaMask')
        } else if (error.message.includes('Already processing')) {
          throw new Error('Wallet connection is already in progress. Please wait.')
        } else {
          throw new Error(`Wallet connection failed: ${error.message}`)
        }
      }
      throw new Error('Failed to connect wallet. Please try again.')
    }
  }

  const disconnectWallet = async () => {
    try {
      console.log('Attempting to disconnect wallet...')
      console.log('Disconnect function available:', typeof disconnect)
      
      if (!disconnect) {
        throw new Error('Wallet disconnection not available. Please ensure ThirdWeb is properly configured.')
      }
      
      await disconnect()
      console.log('Wallet disconnected successfully')
    } catch (error) {
      console.error('Failed to disconnect wallet:', error)
      // Provide more specific error messages
      if (error instanceof Error) {
        throw new Error(`Wallet disconnection failed: ${error.message}`)
      }
      throw new Error('Failed to disconnect wallet. Please try again.')
    }
  }

  const sendVerificationCode = async (email: string): Promise<boolean> => {
    // Simulate sending verification code
    // In a real app, this would call your backend API
    console.log(`AuthProvider: Sending verification code to ${email}`)
    
    // For demo purposes, we'll simulate a successful send with a delay
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log(`AuthProvider: Verification code sent successfully to ${email}`)
        console.log(`AuthProvider: Demo verification code: 123456`)
        resolve(true)
      }, 1500) // Slightly longer delay to make it feel more realistic
    })
  }

  const login = async (email: string, verificationCode: string): Promise<boolean> => {
    // Simulate verification code validation
    // In a real app, this would call your backend API
    console.log(`Verifying code ${verificationCode} for ${email}`)
    
    // For demo purposes, accept any 6-digit code
    if (verificationCode.length === 6 && /^\d+$/.test(verificationCode)) {
      // Use connected wallet address if available, otherwise generate a mock one
      const walletAddress = address || `0x${Math.random().toString(16).substr(2, 40)}`
      
      const newUser: User = {
        email,
        walletAddress,
        isVerified: true
      }
      
      setUser(newUser)
      return true
    }
    
    return false
  }

  const logout = () => {
    setUser(null)
    // Optionally disconnect wallet on logout
    if (address) {
      disconnectWallet()
    }
  }

  const value: AuthContextType = {
    user,
    login,
    logout,
    sendVerificationCode,
    connectWallet,
    disconnectWallet,
    isLoggedIn: !!user,
    isWalletConnected: !!address,
    walletAddress: address,
    connectionStatus
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
