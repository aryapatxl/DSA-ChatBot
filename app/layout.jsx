import { Inter } from 'next/font/google';
import { ClerkProvider, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
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
          </SignedOut>

          {/* When the user is signed in */}
          <SignedIn>
            <header className="flex justify-between items-center p-4">
              <p className="text-sm font-medium">AlgoBot</p>
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
