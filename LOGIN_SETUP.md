# APETour Login Setup Instructions

## Issues Fixed

Your login feature had several issues that have now been resolved:

1. **Missing Environment Variables**: Created `.env.local` file for ThirdWeb configuration
2. **ThirdWeb Configuration**: Improved provider setup with better RPC endpoints and testnet support
3. **Authentication Context**: Enhanced error handling and debugging
4. **Login Modal**: Added better error messages and debug information
5. **Wallet Connection Logic**: Improved connection flow with better error handling

## Setup Instructions

### 1. Get a ThirdWeb Client ID

1. Go to [ThirdWeb Dashboard](https://thirdweb.com/dashboard)
2. Create a new project or use an existing one
3. Copy your Client ID
4. Create a `.env.local` file in your project root with:

```bash
NEXT_PUBLIC_THIRDWEB_CLIENT_ID=your-actual-client-id-here
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your-walletconnect-project-id
NODE_ENV=development
```

### 2. Optional: Get WalletConnect Project ID (for mobile support)

1. Go to [WalletConnect Cloud](https://cloud.walletconnect.com/)
2. Create a new project
3. Copy your Project ID
4. Add it to your `.env.local` file

### 3. Test the Login Flow

1. Start the development server: `npm run dev`
2. Open the app in your browser
3. Click the "Login" button
4. Try connecting a wallet (MetaMask recommended)
5. Check the browser console for debug information

### 4. Debug Information

In development mode, the login modal now shows debug information including:
- Wallet connection status
- Wallet address
- Connection status
- Auth context availability
- ThirdWeb Client ID status
- WalletConnect Project ID status

### 5. Common Issues and Solutions

**"Wallet connection not available"**
- Make sure you have a valid ThirdWeb Client ID
- Check that the `.env.local` file is in the project root
- Restart the development server after adding environment variables
- Check browser console for detailed error messages

**"No wallet found"**
- Install MetaMask or another Web3 wallet
- Make sure the wallet is unlocked
- Try refreshing the page
- Check if wallet extension is enabled

**"User rejected"**
- User cancelled the wallet connection prompt
- This is normal behavior

**"Already processing"**
- Wait for the current connection attempt to complete
- Refresh the page if stuck

**Mobile wallet issues**
- Install WalletConnect-compatible wallet app
- Make sure WalletConnect Project ID is set
- Try using QR code connection

### 6. Testing the Complete Flow

1. **Wallet Connection**: Click "Connect Wallet" → Should open MetaMask
2. **Email Verification**: Enter any email → Should show success
3. **Code Verification**: Enter any 6-digit number → Should log you in

The verification code system is currently simulated for demo purposes. In production, you would integrate with a real email service.

### 7. Troubleshooting Steps

1. **Check Console Logs**: Open browser dev tools and look for error messages
2. **Verify Environment Variables**: Make sure `.env.local` exists and has correct values
3. **Test Wallet**: Try connecting to other dApps to verify wallet works
4. **Clear Cache**: Clear browser cache and localStorage
5. **Restart Server**: Stop and restart the development server

### 8. Production Considerations

- Replace demo Client ID with real ThirdWeb Client ID
- Set up real email verification service
- Configure proper RPC endpoints
- Add error monitoring and logging
- Test on multiple devices and browsers


