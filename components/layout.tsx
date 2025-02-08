import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-black text-white font-mono">
      <header className="py-12 px-4">
        <div className="container mx-auto space-y-8">
          <div className="relative">
            <div className="text-6xl font-bold tracking-wider text-center relative">
              <span className="absolute top-0 left-0 w-full text-red-500 opacity-50 transform translate-x-[1px]">
                acid test
              </span>
              <span className="absolute top-0 left-0 w-full text-blue-500 opacity-50 transform -translate-x-[1px]">
                acid test
              </span>
              <span className="relative">acid test</span>
            </div>
            <div className="w-24 h-24 mx-auto mt-4 bg-gradient-to-r from-white to-transparent" />
          </div>

          <div className="h-px bg-white/20 relative">
            <div className="absolute inset-0 bg-white/20 animate-pulse" />
          </div>

          <nav className="grid grid-cols-2 gap-4">
            <Link href="/" className="w-full">
              <Button variant="outline" className="w-full text-2xl py-8 border-2 hover:bg-white/5">
                ABOUT
              </Button>
            </Link>
            <Link href="/releases" className="w-full">
              <Button variant="outline" className="w-full text-2xl py-8 border-2 hover:bg-white/5">
                RELEASES
              </Button>
            </Link>
          </nav>
        </div>
      </header>
      <main className="container mx-auto py-8 px-4">{children}</main>
    </div>
  )
}

