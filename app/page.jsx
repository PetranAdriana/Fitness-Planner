import { Button } from "./components/ui/button";
import Link from "next/link";

export default async function Home() {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center text-center">
      <div className="mx-auto max-w-2xl px-4">
        <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
          Your Personal Fitness Journey Starts Here
        </h1>
        <p className="mt-6 text-lg leading-8 text-muted-foreground">
          Access our comprehensive exercise database, create custom workouts,
          and track your progress. Sign in to get started.
        </p>
        <Link href="/exercises">
          <Button className="mt-8">Sign in</Button>
        </Link>
      </div>
    </div>
  );
}
