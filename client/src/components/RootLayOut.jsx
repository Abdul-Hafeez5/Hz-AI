import { Link, Outlet } from "react-router-dom";
import { ClerkProvider, SignedIn, UserButton } from "@clerk/clerk-react";
import { CLERK_PUBLISHABLE_KEY } from "../utils/constants";

if (!CLERK_PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

const RootLayOut = () => {
  return (
    <ClerkProvider publishableKey={CLERK_PUBLISHABLE_KEY} afterSignOutUrl="/">
      <div className=" py-4 px-4 md:px-8 lg:px-16 h-screen flex flex-col ">
        <header className="flex items-center justify-between">
          <Link to="/" className=" flex items-center font-bold gap-2">
            <img src="/logo.png" alt="logo" className="w-8 h-8" />
            <span>Hz AI</span>
          </Link>
          <div className="  rounded-full max-w-[80%] self-end">
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
        </header>
        <main className="flex-1 overflow-hidden">
          <Outlet />
        </main>
      </div>
    </ClerkProvider>
  );
};

export default RootLayOut;
