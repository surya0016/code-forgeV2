import { Header } from "@/components/components/header"
import { ContestsContent } from "@/components/components/contests-content"

export default function ContestsPage() {
  return (
    <div className='bg-background'>
          <Header/>
          <div className="px-8 py-4">
            <ContestsContent/>
          </div>
        </div>
  )
}
