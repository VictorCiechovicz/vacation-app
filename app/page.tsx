'use client'

import Vacations from './Components/Vacations'
import { useGlobalState } from './context/globalProvider'

export default function Home() {
  const { vacations } = useGlobalState()

  return <Vacations title="All Vacations" vactions={vacations} />
}
