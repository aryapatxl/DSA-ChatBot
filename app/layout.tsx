// User Authenticaton

import {
    ClerkProvider,
    SignInButton,
    SignedIn,
    SignedOut,
    UserButton
  } from '@clerk/nextjs'
  import './globals.css'
  
  export default function RootLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
      <ClerkProvider>
        <html lang="en">
          <body>
            {/* Render the SignInButton when the user is not signed in */}
            <SignedOut>
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <SignInButton />
              </div>
            </SignedOut>
  
            {/* Render the UserButton and the children when the user is signed in */}
            <SignedIn>
              <div style={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>
                <UserButton />
              </div>
              <main>
                {children}
              </main>
            </SignedIn>
          </body>
        </html>
      </ClerkProvider>
    )
  }