# APETour - Web3 Travel Platform

A decentralized travel organizer and concierge app built on Apechain with AI-powered planning, cross-platform rewards, and secure payments.

## Features

- **Web3 Wallet Integration**: Connect with ThirdWeb SDK for seamless wallet management
- **Email Verification**: Secure login with email verification codes
- **AI-Powered Planning**: Intelligent itinerary generation with personalized recommendations
- **Cross-Platform Rewards**: Unified reward system across all travel partners
- **Secure Payments**: Decentralized payment processing with blockchain security

## Setup Instructions

### 1. Install Dependencies

```bash
pnpm install
```

### 2. ThirdWeb Configuration

1. Go to [ThirdWeb Dashboard](https://thirdweb.com/dashboard)
2. Create a new project or use an existing one
3. Copy your Client ID from the project settings
4. Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_THIRDWEB_CLIENT_ID=your-actual-client-id-here
```

### 3. Run the Development Server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Authentication Flow

1. **Wallet Connection**: Users can connect their Web3 wallet (optional)
2. **Email Verification**: Enter email address to receive verification code
3. **Code Verification**: Enter 6-digit verification code to complete login
4. **Profile Display**: Email and wallet address are displayed in the header

## Tech Stack

- **Framework**: Next.js 14
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI + shadcn/ui
- **Web3**: ThirdWeb SDK
- **Authentication**: Custom email verification system
- **Icons**: Lucide React

## Project Structure

```
├── app/                    # Next.js app directory
├── components/            # React components
│   ├── auth-provider.tsx  # Authentication context
│   ├── login-modal.tsx    # Login modal with wallet integration
│   ├── thirdweb-provider.tsx # ThirdWeb provider
│   └── ui/               # Reusable UI components
├── lib/                   # Utility functions
└── public/                # Static assets
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is licensed under the MIT License.
