import { Header } from "@/components/components/header"
import { DiscussionContent } from "@/components/components/discussion-content"

export default function ContestsPage() {
  return (
    <div className='bg-background'>
          <Header/>
          <div className="px-8 py-4">
            <DiscussionContent/>
          </div>
        </div>
  )
}
