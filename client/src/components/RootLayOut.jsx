import { Link, Outlet } from "react-router-dom";
import { ClerkProvider, SignedIn, UserButton } from "@clerk/clerk-react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}
const queryClient = new QueryClient();

const RootLayOut = () => {
  return (
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
      <QueryClientProvider client={queryClient}>
        <div className=" py-4 px-16 h-screen flex flex-col ">
          <header className="flex items-center justify-between">
            <Link to="/" className=" flex items-center font-bold gap-2">
              <img src="/logo.png" alt="logo" className="w-8 h-8" />
              <span>Hz AI</span>
            </Link>
            <div className=" p-5 bg-primary-dark rounded-3xl max-w-[80%] self-end">
              <SignedIn>
                <UserButton />
              </SignedIn>
            </div>
          </header>
          <main className="flex-1 overflow-hidden">
            <Outlet />
          </main>
        </div>
      </QueryClientProvider>
    </ClerkProvider>
  );
};

export default RootLayOut;
