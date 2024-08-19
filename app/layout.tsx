import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton
} from '@clerk/nextjs';
import './globals.css';
import { Button } from '@mui/material';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body style={{ backgroundColor: '#282c34', margin: 0, padding: 0 }}>
          {/* Render the SignInButton and login page when the user is not signed in */}
          <SignedOut>
            <div style={{
              display: 'flex', 
              flexDirection: 'column', 
              justifyContent: 'center', 
              alignItems: 'center', 
              height: '100vh', 
              textAlign: 'center', 
              color: '#ffffff'
            }}>
              <h1 style={{ marginBottom: '20px', fontSize: '2rem', fontWeight: 'bold', fontFamily: 'Arial, sans-serif' }}>
                Welcome to the Data Structures and Algorithms Chat Bot
              </h1>
              <p style={{ marginBottom: '40px', fontSize: '1.2rem', fontFamily: 'Arial, sans-serif' }}>
                Please sign in to continue
              </p>
              <SignInButton>
              <Button>Sign-In</Button>
              </SignInButton>
            </div>
          </SignedOut>

          {/* Render the UserButton, signed-in message, and children when the user is signed in */}
          <SignedIn>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px' }}>
              <p style={{ color: '#ffffff', fontFamily: 'Arial, sans-serif' }}>You are signed in</p>
              <UserButton />
            </div>
            <main style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
              {children}
            </main>
          </SignedIn>
        </body>
      </html>
    </ClerkProvider>
  );
}