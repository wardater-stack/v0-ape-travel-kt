'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { useAuth } from '@/components/auth-provider'
import { Mail, Shield, Loader2, Wallet, CheckCircle } from 'lucide-react'

interface LoginModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function LoginModal({ open, onOpenChange }: LoginModalProps) {
  const { login, sendVerificationCode, connectWallet, disconnectWallet, isWalletConnected, walletAddress, connectionStatus } = useAuth()
  const [email, setEmail] = useState('')
  const [verificationCode, setVerificationCode] = useState('')
  const [step, setStep] = useState<'wallet' | 'email' | 'verification'>('wallet')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  // Reset form when dialog closes
  React.useEffect(() => {
    if (!open) {
      setEmail('')
      setVerificationCode('')
      setStep('wallet')
      setError('')
      setIsLoading(false)
    }
  }, [open])

  const handleWalletConnect = async () => {
    console.log('Login modal: Wallet connect button clicked')
    setIsLoading(true)
    setError('')

    try {
      console.log('Login modal: Calling connectWallet...')
      console.log('Login modal: Auth context available: Yes')
      console.log('Login modal: Connection status:', connectionStatus)
      
      // Check for mobile and WalletConnect configuration
      if (typeof window !== 'undefined') {
        const onMobile = /Mobi|Android|iPhone|iPad|iPod/i.test(window.navigator.userAgent)
        console.log('Login modal: Is mobile device:', onMobile)
        
        if (onMobile && !process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID) {
          console.warn('Login modal: WalletConnect project ID missing for mobile')
          // Don't throw error, just warn - let the auth provider handle it
        }
      }
      
      await connectWallet()
      console.log('Login modal: Wallet connected, moving to email step')
      setStep('email')
    } catch (err) {
      console.error('Login modal: Wallet connection failed:', err)
      // Use the error message from the auth context if available
      const errorMessage = err instanceof Error ? err.message : 'Failed to connect wallet. Please try again.'
      setError(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  const handleWalletDisconnect = async () => {
    setIsLoading(true)
    setError('')

    try {
      console.log('Login modal: Calling disconnectWallet...')
      await disconnectWallet()
      console.log('Login modal: Wallet disconnected successfully')
    } catch (err) {
      console.error('Login modal: Wallet disconnection failed:', err)
      // Use the error message from the auth context if available
      const errorMessage = err instanceof Error ? err.message : 'Failed to disconnect wallet. Please try again.'
      setError(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    console.log('Login modal: Email submit clicked for:', email)
    setIsLoading(true)
    setError('')

    try {
      console.log('Login modal: Calling sendVerificationCode...')
      const success = await sendVerificationCode(email)
      console.log('Login modal: sendVerificationCode result:', success)
      
      if (success) {
        console.log('Login modal: Moving to verification step')
        setStep('verification')
      } else {
        console.log('Login modal: sendVerificationCode returned false')
        setError('Failed to send verification code. Please try again.')
      }
    } catch (err) {
      console.error('Login modal: Email submission error:', err)
      setError('An error occurred. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleVerificationSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!verificationCode) return

    setIsLoading(true)
    setError('')

    try {
      const success = await login(email, verificationCode)
      if (success) {
        onOpenChange(false)
        // Reset form
        setEmail('')
        setVerificationCode('')
        setStep('email')
      } else {
        setError('Invalid verification code. Please try again.')
      }
    } catch (err) {
      setError('An error occurred. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleBackToEmail = () => {
    setStep('email')
    setVerificationCode('')
    setError('')
  }

  const handleBackToWallet = () => {
    setStep('wallet')
    setEmail('')
    setVerificationCode('')
    setError('')
  }

  const handleClose = () => {
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-primary" />
            Login to APETour
          </DialogTitle>
          <DialogDescription>
            {step === 'wallet' 
              ? 'Connect your wallet to get started with Web3 travel'
              : step === 'email' 
              ? 'Enter your email address to receive a verification code'
              : 'Enter the 6-digit verification code sent to your email'
            }
          </DialogDescription>
        </DialogHeader>

        <Card className="border-0 shadow-none">
          <CardContent className="p-0">
            {step === 'wallet' ? (
              <div className="space-y-4">
                <div className="text-center py-6">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Wallet className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Connect Your Wallet</h3>
                  <p className="text-sm text-muted-foreground mb-6">
                    Connect your Web3 wallet to access APETour's decentralized features
                  </p>
                  
                  {isWalletConnected && walletAddress ? (
                    <div className="space-y-4">
                      <div className="flex items-center justify-center gap-2 text-sm text-green-600 bg-green-50 p-3 rounded-lg">
                        <CheckCircle className="w-4 h-4" />
                        Wallet Connected
                      </div>
                      <div className="text-xs text-muted-foreground font-mono bg-muted p-2 rounded">
                        {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
                      </div>
                      <div className="space-y-2">
                        <Button 
                          onClick={() => setStep('email')} 
                          className="w-full"
                        >
                          Continue to Email Verification
                        </Button>
                        <Button 
                          variant="outline" 
                          onClick={handleWalletDisconnect}
                          disabled={isLoading}
                          className="w-full"
                        >
                          {isLoading ? (
                            <>
                              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                              Disconnecting...
                            </>
                          ) : (
                            'Disconnect Wallet'
                          )}
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <Button 
                      onClick={handleWalletConnect}
                      disabled={isLoading || connectionStatus === 'connecting'}
                      className="w-full"
                    >
                      {isLoading || connectionStatus === 'connecting' ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Connecting...
                        </>
                      ) : (
                        <>
                          <Wallet className="w-4 h-4 mr-2" />
                          Connect Wallet
                        </>
                      )}
                    </Button>
                  )}
                </div>

                {error && (
                  <div className="text-sm text-destructive bg-destructive/10 p-3 rounded-md">
                    {error}
                  </div>
                )}

                {/* Debug Information - Remove in production */}
                {process.env.NODE_ENV === 'development' && (
                  <div className="text-xs text-muted-foreground bg-muted p-2 rounded">
                    <div>Debug Info:</div>
                    <div>• Wallet Connected: {isWalletConnected ? 'Yes' : 'No'}</div>
                    <div>• Wallet Address: {walletAddress || 'None'}</div>
                    <div>• Connection Status: {connectionStatus}</div>
                    <div>• Auth Context Available: Yes</div>
                    <div>• ThirdWeb Client ID: {process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID || 'demo-client-id'}</div>
                    <div>• WalletConnect Project ID: {process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || 'Not set'}</div>
                  </div>
                )}

                {/* Helpful tips for users */}
                {!isWalletConnected && (
                  <div className="text-xs text-muted-foreground bg-blue-50 p-3 rounded-md">
                    <div className="font-medium text-blue-800 mb-1">💡 Need help?</div>
                    <div>• Install MetaMask browser extension</div>
                    <div>• Make sure your wallet is unlocked</div>
                    <div>• Try refreshing the page if connection fails</div>
                  </div>
                )}

                <div className="text-center">
                  <Button 
                    variant="ghost" 
                    onClick={() => setStep('email')}
                    className="text-sm text-muted-foreground"
                  >
                    Skip wallet connection for now
                  </Button>
                </div>
              </div>
            ) : step === 'email' ? (
              <form onSubmit={handleEmailSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                {error && (
                  <div className="text-sm text-destructive bg-destructive/10 p-3 rounded-md">
                    {error}
                  </div>
                )}

                <div className="space-y-2">
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Sending Code...
                      </>
                    ) : (
                      'Send Verification Code'
                    )}
                  </Button>
                  <Button 
                    type="button" 
                    variant="outline" 
                    className="w-full" 
                    onClick={handleBackToWallet}
                    disabled={isLoading}
                  >
                    Back to Wallet
                  </Button>
                </div>
              </form>
            ) : (
              <form onSubmit={handleVerificationSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="verification">Verification Code</Label>
                  <Input
                    id="verification"
                    type="text"
                    placeholder="Enter 6-digit code"
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                    className="text-center text-lg tracking-widest"
                    maxLength={6}
                    required
                  />
                  <p className="text-sm text-muted-foreground">
                    Code sent to: <span className="font-medium">{email}</span>
                  </p>
                  <div className="text-sm text-green-600 bg-green-50 p-2 rounded-md">
                    ✅ Verification code sent! Check your email or use demo code: <span className="font-mono font-bold">123456</span>
                  </div>
                </div>

                {error && (
                  <div className="text-sm text-destructive bg-destructive/10 p-3 rounded-md">
                    {error}
                  </div>
                )}

                <div className="space-y-2">
                  <Button type="submit" className="w-full" disabled={isLoading || verificationCode.length !== 6}>
                    {isLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Verifying...
                      </>
                    ) : (
                      'Verify & Login'
                    )}
                  </Button>
                  <Button 
                    type="button" 
                    variant="outline" 
                    className="w-full" 
                    onClick={handleBackToEmail}
                    disabled={isLoading}
                  >
                    Back to Email
                  </Button>
                </div>
              </form>
            )}
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  )
}
