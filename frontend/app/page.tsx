import { ArrowRight, Scale } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <div className="flex justify-center mb-6">
            <Scale className="h-16 w-16 text-primary" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl md:text-6xl">
            Law Firm Management
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Streamline your legal practice with our comprehensive management
            system.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
            <div className="space-y-4 sm:space-y-0 sm:space-x-4">
              <Link
                href="/login/lawyer"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-primary bg-secondary hover:bg-secondary/80 transition-colors"
              >
                Lawyer Login
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <Link
                href="/signup/lawyer"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary/90 transition-colors"
              >
                Lawyer Sign Up
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
            <div className="space-y-4 sm:space-y-0 sm:space-x-4">
              {/* <Link
                href="/signup/client"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary/90 transition-colors"
              >
                Client Sign Up
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link> */}
              <Link
                href="/login/client"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-primary bg-secondary hover:bg-secondary/80 transition-colors"
              >
                Client Login
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
