import { Header } from "@/components/components/header"
import { Hero } from "@/components/components/hero"
import Hero2 from "@/components/components/hero-v2"
import { ProblemCategories } from "@/components/components/problem-categories"
import { RecentActivity } from "@/components/components/recent-activities"
import { Stats } from "@/components/components/stats"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <main>
        <Hero2 />
        {/* <div className="container mx-auto px-4 py-8 space-y-8">
          <Stats />
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <ProblemCategories />
            </div>
            <div>
              <RecentActivity />
            </div>
          </div>
        </div> */}
      </main>
    </div>
  )
}
