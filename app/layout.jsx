import { Inter } from 'next/font/google';
import { ClerkProvider, SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import './globals.css';
import Component from './component'; // Assuming component.jsx is in the same directory

const fontHeading = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-heading',
});

const fontBody = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-body',
});

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className="bg-background min-h-screen text-foreground">
          {/* When the user is not signed in */}
          <SignedOut>
            <Component /> {/* This renders the content from component.jsx */}
            <div className="flex justify-center py-4">
              <SignInButton>
                <button className="rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2">
                  Sign In
                </button>
              </SignInButton>
            </div>
          </SignedOut>

          {/* When the user is signed in */}
          <SignedIn>
            <header className="flex justify-between items-center p-4">
              <p className="text-sm font-medium">You are signed in</p>
              <UserButton />
            </header>
            <main className="p-4">
              {children}
            </main>
          </SignedIn>
        </body>
      </html>
    </ClerkProvider>
  );
}
