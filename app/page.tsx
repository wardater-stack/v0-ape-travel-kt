'use client'

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plane, Shield, Zap, Star, Users, Bot, ArrowRight, CheckCircle, Sparkles, User, Wallet, LogOut } from "lucide-react"
import { LoginModal } from "@/components/login-modal"
import { useAuth } from "@/components/auth-provider"
import { useState } from "react"

export default function HomePage() {
  const { user, logout, isLoggedIn, isWalletConnected, walletAddress } = useAuth()
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)

  const formatWalletAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <nav className="border-b border-border/50 backdrop-blur-sm sticky top-0 z-50 bg-background/95">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Plane className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold">Ape Travel Portal</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors">
                Features
              </a>
              <a href="#benefits" className="text-muted-foreground hover:text-foreground transition-colors">
                Benefits
              </a>
              <a href="#partners" className="text-muted-foreground hover:text-foreground transition-colors">
                Partners
              </a>
              {isLoggedIn && user ? (
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2 text-sm">
                    <User className="w-4 h-4 text-muted-foreground" />
                    <span className="text-muted-foreground">{user.email}</span>
                  </div>
                  {user.walletAddress && (
                    <div className="flex items-center space-x-2 text-sm">
                      <Wallet className={`w-4 h-4 ${isWalletConnected ? 'text-green-500' : 'text-muted-foreground'}`} />
                      <span className={`font-mono ${isWalletConnected ? 'text-green-500' : 'text-muted-foreground'}`}>
                        {formatWalletAddress(user.walletAddress)}
                      </span>
                      {isWalletConnected && (
                        <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                          Connected
                        </span>
                      )}
                    </div>
                  )}
                  <Button variant="outline" size="sm" onClick={logout}>
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </Button>
                </div>
              ) : (
                <>
                  <Button variant="outline" size="sm" onClick={() => setIsLoginModalOpen(true)}>
                    Login
                  </Button>
                  <Button size="sm">Get Started</Button>
                </>
              )}
            </div>
            {/* Mobile actions */}
            <div className="md:hidden">
              {isLoggedIn ? (
                <Button variant="outline" size="sm" onClick={logout}>
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </Button>
              ) : (
                <Button size="sm" onClick={() => setIsLoginModalOpen(true)}>
                  Login
                </Button>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/beautiful-tropical-beach-destination-with-crystal-.jpg"
            alt="Beautiful travel destination"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background/80 to-background/60"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="text-center">
            <Badge variant="secondary" className="mb-6 bg-secondary/10 text-secondary border-secondary/20">
              <Sparkles className="w-3 h-3 mr-1" />
              {"Powered by Apechain • Web3 Travel Revolution"}
            </Badge>
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight text-balance mb-8">
              {"The fastest and most powerful"}
              <br />
              <span className="text-primary">{"platform for Web3 travel"}</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-12 text-pretty">
              {
                "Build transformative travel experiences powered by decentralized technology. Unified onboarding, AI-powered planning, cross-platform rewards, and secure payments."
              }
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="text-lg px-8 py-6">
                {"Start Planning"}
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8 py-6 bg-transparent">
                {"View Demo"}
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold mb-4">{"Discover Amazing Destinations"}</h2>
            <p className="text-muted-foreground">{"Explore the world with Ape Travel Portal's curated travel experiences"}</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="relative group overflow-hidden rounded-lg">
              <img
                src="/placeholder.jpg"
                alt="City destination"
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-4 left-4 text-white">
                <h3 className="font-semibold">{"Tokyo"}</h3>
                <p className="text-sm opacity-90">{"Urban Adventure"}</p>
              </div>
            </div>
            <div className="relative group overflow-hidden rounded-lg">
              <img
                src="/tropical-island-with-white-sand-beach-and-turquois.jpg"
                alt="Beach destination"
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-4 left-4 text-white">
                <h3 className="font-semibold">{"Maldives"}</h3>
                <p className="text-sm opacity-90">{"Beach Paradise"}</p>
              </div>
            </div>
            <div className="relative group overflow-hidden rounded-lg">
              <img
                src="/snow-capped-mountains-with-alpine-lake-and-forest.jpg"
                alt="Mountain destination"
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-4 left-4 text-white">
                <h3 className="font-semibold">{"Swiss Alps"}</h3>
                <p className="text-sm opacity-90">{"Mountain Escape"}</p>
              </div>
            </div>
            <div className="relative group overflow-hidden rounded-lg">
              <img
                src="/ancient-temple-ruins-with-golden-sunset-lighting.jpg"
                alt="Cultural destination"
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-4 left-4 text-white">
                <h3 className="font-semibold">{"Angkor Wat"}</h3>
                <p className="text-sm opacity-90">{"Cultural Heritage"}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Partner Logos */}
      <section className="py-16 border-b border-border/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-muted-foreground">{"Trusted by leading travel partners worldwide"}</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 items-center opacity-60">
            <div className="text-2xl font-bold text-primary">Booking.com</div>
            <div className="text-2xl font-bold text-primary">Expedia</div>
            <div className="text-2xl font-bold text-primary">Airbnb</div>
            <div className="text-2xl font-bold text-primary">Marriott</div>
            <div className="text-2xl font-bold text-primary">Emirates</div>
          </div>
        </div>
      </section>

      {/* Core Features */}
      <section id="features" className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">{"Revolutionary Features"}</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              {
                "Powerful Web3 travel tools designed for the modern traveler. Our industry-leading platform powers seamless experiences for millions of users."
              }
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <Card className="p-8 bg-card border-border hover:shadow-lg transition-all duration-300">
              <div className="mb-6">
                <img
                  src="/ai-robot-assistant-helping-with-travel-planning-on.jpg"
                  alt="AI Planning"
                  className="w-full h-32 object-cover rounded-lg mb-4"
                />
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Bot className="w-6 h-6 text-primary" />
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-3">{"AI-Powered Planning"}</h3>
              <p className="text-muted-foreground mb-4">
                {
                  "Intelligent itinerary generation with personalized recommendations based on your preferences and travel history."
                }
              </p>
              <div className="space-y-2">
                <div className="flex items-center text-sm">
                  <CheckCircle className="w-4 h-4 text-secondary mr-2" />
                  {"Smart recommendations"}
                </div>
                <div className="flex items-center text-sm">
                  <CheckCircle className="w-4 h-4 text-secondary mr-2" />
                  {"Real-time optimization"}
                </div>
              </div>
            </Card>

            <Card className="p-8 bg-card border-border hover:shadow-lg transition-all duration-300">
              <div className="mb-6">
                <img
                  src="/digital-rewards-and-loyalty-points-visualization-w.jpg"
                  alt="Cross-Platform Rewards"
                  className="w-full h-32 object-cover rounded-lg mb-4"
                />
                <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center">
                  <Zap className="w-6 h-6 text-secondary" />
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-3">{"Cross-Platform Rewards"}</h3>
              <p className="text-muted-foreground mb-4">
                {"Unified reward system that works across all travel partners with transparent blockchain tracking."}
              </p>
              <div className="space-y-2">
                <div className="flex items-center text-sm">
                  <CheckCircle className="w-4 h-4 text-secondary mr-2" />
                  {"Universal points system"}
                </div>
                <div className="flex items-center text-sm">
                  <CheckCircle className="w-4 h-4 text-secondary mr-2" />
                  {"Instant redemption"}
                </div>
              </div>
            </Card>

            <Card className="p-8 bg-card border-border hover:shadow-lg transition-all duration-300">
              <div className="mb-6">
                <img
                  src="/secure-digital-payment-with-blockchain-security-sh.jpg"
                  alt="Secure Payments"
                  className="w-full h-32 object-cover rounded-lg mb-4"
                />
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Shield className="w-6 h-6 text-primary" />
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-3">{"Secure Payments"}</h3>
              <p className="text-muted-foreground mb-4">
                {"Decentralized payment processing with enhanced security and privacy protection for all transactions."}
              </p>
              <div className="space-y-2">
                <div className="flex items-center text-sm">
                  <CheckCircle className="w-4 h-4 text-secondary mr-2" />
                  {"Blockchain security"}
                </div>
                <div className="flex items-center text-sm">
                  <CheckCircle className="w-4 h-4 text-secondary mr-2" />
                  {"Privacy protection"}
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">{"50% faster"}</div>
              <div className="text-sm text-muted-foreground">{"booking process"}</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-secondary mb-2">{"200% more"}</div>
              <div className="text-sm text-muted-foreground">{"rewards earned"}</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">{"100K+"}</div>
              <div className="text-sm text-muted-foreground">{"active travelers"}</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-secondary mb-2">{"5x better"}</div>
              <div className="text-sm text-muted-foreground">{"user experience"}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold mb-6">
                {"Seamless Web3 travel."}
                <br />
                {"Mainstream simplicity."}
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                {
                  "The platform for rapid progress. Let your team focus on creating amazing travel experiences instead of managing complex blockchain infrastructure with automated onboarding, built-in rewards, and integrated collaboration."
                }
              </p>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center mt-0.5">
                    <CheckCircle className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">{"Unified Onboarding"}</h4>
                    <p className="text-muted-foreground">
                      {"Single sign-on across all travel partners with Web3 wallet integration"}
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-secondary/10 rounded-full flex items-center justify-center mt-0.5">
                    <CheckCircle className="w-4 h-4 text-secondary" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">{"Verified Reviews"}</h4>
                    <p className="text-muted-foreground">
                      {"Blockchain-verified reviews you can trust from real travelers"}
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center mt-0.5">
                    <CheckCircle className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">{"Global Partner Access"}</h4>
                    <p className="text-muted-foreground">{"Access to exclusive deals and partnerships worldwide"}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="relative">
                <img
                  src="/modern-travel-app-interface-showing-booking-dashbo.jpg"
                  alt="Ape Travel Portal App Interface"
                  className="w-full rounded-2xl shadow-2xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent rounded-2xl"></div>
              </div>
              <div className="absolute -bottom-6 -right-6 bg-card border border-border rounded-2xl p-6 shadow-lg">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                        <Plane className="w-4 h-4 text-primary" />
                      </div>
                      <span className="font-medium">{"Flight to Tokyo"}</span>
                    </div>
                    <Badge className="bg-secondary text-secondary-foreground">{"Booked"}</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-secondary/20 rounded-full flex items-center justify-center">
                        <Users className="w-4 h-4 text-secondary" />
                      </div>
                      <span className="font-medium">{"Hotel Reservation"}</span>
                    </div>
                    <Badge variant="outline">{"Confirmed"}</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                        <Star className="w-4 h-4 text-primary" />
                      </div>
                      <span className="font-medium">{"Rewards Earned"}</span>
                    </div>
                    <Badge className="bg-secondary text-secondary-foreground">{"2,500 APE"}</Badge>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">{"What Travelers Say"}</h2>
            <p className="text-xl text-muted-foreground">{"Real experiences from our community"}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="p-6 bg-card border-border">
              <div className="flex items-center space-x-4 mb-4">
                <img
                  src="/young-woman-professional-headshot.png"
                  alt="Sarah Chen"
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h4 className="font-semibold">Sarah Chen</h4>
                  <p className="text-sm text-muted-foreground">Digital Nomad</p>
                </div>
              </div>
              <p className="text-muted-foreground">
                "APETour revolutionized my travel planning. The AI recommendations were spot-on, and earning rewards
                across all platforms is amazing!"
              </p>
              <div className="flex text-secondary mt-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
            </Card>
            <Card className="p-6 bg-card border-border">
              <div className="flex items-center space-x-4 mb-4">
                <img
                  src="/avatar-2.png"
                  alt="Marcus Johnson"
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h4 className="font-semibold">Marcus Johnson</h4>
                  <p className="text-sm text-muted-foreground">Business Traveler</p>
                </div>
              </div>
              <p className="text-muted-foreground">
                "The secure payments and unified booking system saved me hours. Web3 technology made simple - exactly
                what I needed."
              </p>
              <div className="flex text-secondary mt-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
            </Card>
            <Card className="p-6 bg-card border-border">
              <div className="flex items-center space-x-4 mb-4">
                <img
                  src="/professional-headshot-of-a-young-couple-smiling-to.jpg"
                  alt="Emma & David"
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h4 className="font-semibold">Emma & David</h4>
                  <p className="text-sm text-muted-foreground">Adventure Seekers</p>
                </div>
              </div>
              <p className="text-muted-foreground">
                "Planning our honeymoon was effortless with APETour. The verified reviews gave us confidence in every
                booking decision."
              </p>
              <div className="flex text-secondary mt-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/airplane-flying-over-beautiful-landscape-with-moun.jpg"
            alt="Travel inspiration"
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-secondary/80"></div>
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-white">
            {"Ready to revolutionize your travel experience?"}
          </h2>
              <p className="text-xl text-white/90 mb-8">
            {"Join thousands of travelers already using Ape Travel Portal to plan, book, and earn rewards seamlessly."}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-lg px-8 py-6 bg-white text-primary hover:bg-white/90">
              {"Get Started Free"}
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="text-lg px-8 py-6 border-white text-white hover:bg-white/10 bg-transparent"
            >
              {"Schedule Demo"}
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-6 h-6 bg-primary rounded flex items-center justify-center">
                  <Plane className="w-4 h-4 text-primary-foreground" />
                </div>
                <span className="font-bold">Ape Travel Portal</span>
              </div>
              <p className="text-sm text-muted-foreground">
                {"Revolutionizing travel with Web3 technology on Apechain."}
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-3">{"Product"}</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    {"Features"}
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    {"Pricing"}
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    {"API"}
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">{"Company"}</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    {"About"}
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    {"Blog"}
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    {"Careers"}
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">{"Support"}</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    {"Help Center"}
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    {"Contact"}
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    {"Status"}
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>{"© 2025 Ape Travel Portal. All rights reserved. Built on Apechain."}</p>
          </div>
        </div>
      </footer>

      {/* Login Modal */}
      <LoginModal 
        open={isLoginModalOpen} 
        onOpenChange={setIsLoginModalOpen} 
      />
    </div>
  )
}
