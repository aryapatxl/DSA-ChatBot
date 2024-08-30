import Link from "next/link"
import { SignInButton } from '@clerk/nextjs';
import { Button } from './/components/ui/button.jsx'

export default function Component() {
  return (
 <div className="flex min-h-[100dvh] flex-col bg-background text-foreground">
      <header className="flex items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link href="#" className="flex items-center gap-2" prefetch={false}>
          <BotIcon className="h-8 w-8" />
          <span className="text-xl font-bold">AlgoBot</span>
        </Link>
        <SignInButton>
        <Button className="rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2">
          Sign In
        </Button>
      </SignInButton>
      </header>
      <main className="flex flex-1 items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-2xl flex-col items-center gap-8 text-center">
          <div className="grid gap-4">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Conquer Data Structures and Algorithms.</h1>
            <p className="text-lg text-muted-foreground">
              Our data structures and algorithms chatbot is your personal assistant for mastering the fundamentals of
              computer science.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            <div className="rounded-lg bg-muted p-4 text-center">
              <CuboidIcon className="mx-auto h-8 w-8" />
              <h3 className="mt-2 text-lg font-medium">Data Structures</h3>
            </div>
            <div className="rounded-lg bg-muted p-4 text-center">
              <PowerIcon className="mx-auto h-8 w-8" />
              <h3 className="mt-2 text-lg font-medium">Algorithms</h3>
            </div>
            <div className="rounded-lg bg-muted p-4 text-center">
              <CodeIcon className="mx-auto h-8 w-8" />
              <h3 className="mt-2 text-lg font-medium">Personalized Learning</h3>
            </div>
            <div className="rounded-lg bg-muted p-4 text-center">
              <RocketIcon className="mx-auto h-8 w-8" />
              <h3 className="mt-2 text-lg font-medium">Proficiency</h3>
            </div>
          </div>
          <SignInButton>
      <Button className="rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2">
          Get Started
        </Button>
      </SignInButton>
        </div>
      </main>
      <footer className="bg-muted px-4 py-6 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center text-sm text-muted-foreground">
          &copy; 2024 AlgoBot. All rights reserved.
        </div>
      </footer>
    </div>
  )
}

function BotIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 8V4H8" />
      <rect width="16" height="12" x="4" y="8" rx="2" />
      <path d="M2 14h2" />
      <path d="M20 14h2" />
      <path d="M15 13v2" />
      <path d="M9 13v2" />
    </svg>
  )
}


function CodeIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  )
}


function CuboidIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m21.12 6.4-6.05-4.06a2 2 0 0 0-2.17-.05L2.95 8.41a2 2 0 0 0-.95 1.7v5.82a2 2 0 0 0 .88 1.66l6.05 4.07a2 2 0 0 0 2.17.05l9.95-6.12a2 2 0 0 0 .95-1.7V8.06a2 2 0 0 0-.88-1.66Z" />
      <path d="M10 22v-8L2.25 9.15" />
      <path d="m10 14 11.77-6.87" />
    </svg>
  )
}


function PowerIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 2v10" />
      <path d="M18.4 6.6a9 9 0 1 1-12.77.04" />
    </svg>
  )
}


function RocketIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
      <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
      <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
      <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
    </svg>
  )
}