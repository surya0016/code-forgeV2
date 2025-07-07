import { Header } from '@/components/components/header'
import { ProblemsContent } from '@/components/components/problem-content'
import React from 'react'

const Page = () => {
  return (
    <div>
      <Header/>
      <div className="px-8 py-4">
        <ProblemsContent/>
      </div>
    </div>
  )
}

export default Page