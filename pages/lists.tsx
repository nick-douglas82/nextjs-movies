import Router from 'next/router'
import { useEffect, useState } from 'react'
import { isAuthenticated } from '../auth'

const Lists = () => {
  const authenticated = isAuthenticated()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!authenticated) Router.push('/login')
    setLoading(false)
  }, [authenticated])

  if (loading) return <p>Loading...</p>

  return (
    <main className="flex items-center justify-center h-full mx-auto max-w-7xl">
      LISTS
    </main>
  )
}

export default Lists