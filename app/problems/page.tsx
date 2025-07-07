import { Header } from '@/components/components/header'
import { ProblemsContent } from '@/components/components/problem-content'
import React from 'react'

const Page = () => {
  return (
    <div className='bg-gradient-to-br from-blue-100 via-white to-indigo-100 dark:from-gray-900 dark:via-blue-950 dark:to-gray-900'>
      <Header/>
      <div className="px-8 py-4">
        <ProblemsContent/>
      </div>
    </div>
  )
}

export default Page