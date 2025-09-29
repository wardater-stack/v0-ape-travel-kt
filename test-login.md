# Login Testing Checklist

## Pre-Test Setup
- [ ] Create `.env.local` file with ThirdWeb Client ID
- [ ] Install MetaMask browser extension
- [ ] Start development server: `npm run dev`
- [ ] Open browser dev tools (F12) to see console logs

## Test Cases

### 1. Basic Login Flow
- [ ] Click "Login" button in navigation
- [ ] Login modal opens
- [ ] Debug information is visible (development mode)
- [ ] "Connect Wallet" button is clickable

### 2. Wallet Connection
- [ ] Click "Connect Wallet"
- [ ] MetaMask popup appears (or appropriate wallet)
- [ ] Approve connection in wallet
- [ ] Wallet address appears in modal
- [ ] "Continue to Email Verification" button appears

### 3. Email Verification
- [ ] Enter any email address
- [ ] Click "Send Verification Code"
- [ ] Success message appears
- [ ] Move to verification step

### 4. Code Verification
- [ ] Enter any 6-digit number (e.g., 123456)
- [ ] Click "Verify & Login"
- [ ] User is logged in
- [ ] Modal closes
- [ ] User info appears in navigation

### 5. Error Handling
- [ ] Test wallet rejection (cancel in MetaMask)
- [ ] Test invalid email format
- [ ] Test invalid verification code
- [ ] Error messages appear correctly

### 6. Wallet Disconnection
- [ ] Click "Disconnect Wallet" when connected
- [ ] Wallet disconnects successfully
- [ ] Return to wallet connection step

## Common Issues to Check

### Console Errors
Look for these in browser console:
- ThirdWeb initialization errors
- Wallet connection errors
- Missing environment variables

### Visual Issues
- Login button not clickable
- Modal not opening
- Error messages not displaying
- Loading states not working

### Functional Issues
- Wallet connection failing
- Email verification not working
- Login not persisting
- Navigation not updating

## Debug Information

In development mode, check the debug panel shows:
- Wallet Connected: Yes/No
- Wallet Address: (address or None)
- Connection Status: (status)
- Auth Context Available: Yes
- ThirdWeb Client ID: (ID or demo-client-id)
- WalletConnect Project ID: (ID or Not set)

## Success Criteria

✅ Login modal opens and functions properly
✅ Wallet connection works with MetaMask
✅ Email verification flow completes
✅ User can successfully log in
✅ Error handling works correctly
✅ Debug information is helpful
✅ No console errors during normal flow
