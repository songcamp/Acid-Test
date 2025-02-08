import Image from "next/image"
import { Button } from "@/components/ui/button"
import Layout from "@/components/layout"

interface Release {
  id: string
  title: string
  artist: string
  testPressing: {
    price: string
    highestBid: string
  }
  openEdition: {
    price: string
    minted: number
    available: boolean
    endsIn: string
  }
}

const releases: Release[] = [
  {
    id: "AT001",
    title: "Midnight Acid",
    artist: "Unknown Artist",
    testPressing: {
      price: "2.5 ETH",
      highestBid: "2.1 ETH",
    },
    openEdition: {
      price: "0.1 ETH",
      minted: 145,
      available: true,
      endsIn: "11:24:32",
    },
  },
  {
    id: "AT002",
    title: "Deep Space",
    artist: "Unknown Artist",
    testPressing: {
      price: "3.0 ETH",
      highestBid: "2.8 ETH",
    },
    openEdition: {
      price: "0.15 ETH",
      minted: 89,
      available: true,
      endsIn: "23:14:55",
    },
  },
]

export default function ReleasesPage() {
  return (
    <Layout>
      <div className="space-y-16">
        {releases.map((release) => (
          <div key={release.id} className="grid md:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold glitch" data-text={`${release.id} Test Pressing`}>
                  {release.id} Test Pressing
                </h2>
                <p className="text-xl text-white/60">1/1 NFT</p>
              </div>

              <div className="aspect-square relative bg-gradient-to-br from-white/10 to-white/5 rounded-lg overflow-hidden border-2 border-white/20">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,transparent_0%,rgba(255,255,255,0.1)_50%,transparent_100%)] animate-scan" />
                <Image
                  src="/placeholder.svg?height=400&width=400"
                  alt={`${release.id} Test Pressing`}
                  width={400}
                  height={400}
                  className="object-cover"
                />
              </div>

              <div className="grid gap-6">
                <div className="grid grid-cols-2 gap-4 text-xl">
                  <span className="text-white/60">Reserve Price</span>
                  <span className="font-bold">{release.testPressing.price}</span>

                  <span className="text-white/60">Highest Bid</span>
                  <span className="font-bold">{release.testPressing.highestBid}</span>
                </div>

                <Button size="lg" className="w-full text-xl py-8">
                  Place Bid
                </Button>
              </div>
            </div>

            <div className="space-y-8">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold glitch" data-text={`${release.id} Open Edition`}>
                  {release.id} Open Edition
                </h2>
                <p className="text-xl text-white/60">24h Edition</p>
              </div>

              <div className="aspect-square relative bg-gradient-to-br from-white/10 to-white/5 rounded-lg overflow-hidden border-2 border-white/20">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,transparent_0%,rgba(255,255,255,0.1)_50%,transparent_100%)] animate-scan" />
                <Image
                  src="/placeholder.svg?height=400&width=400"
                  alt={`${release.id} Open Edition`}
                  width={400}
                  height={400}
                  className="object-cover"
                />
              </div>

              <div className="grid gap-6">
                <div className="grid grid-cols-2 gap-4 text-xl">
                  <span className="text-white/60">Price</span>
                  <span className="font-bold">{release.openEdition.price}</span>

                  <span className="text-white/60">Minted</span>
                  <span className="font-bold">{release.openEdition.minted}</span>

                  <span className="text-white/60">Ends In</span>
                  <span className="font-bold">{release.openEdition.endsIn}</span>
                </div>

                <Button size="lg" className="w-full text-xl py-8">
                  Collect
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Layout>
  )
}

