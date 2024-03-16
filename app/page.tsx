'use client'

import Vacations from './Components/Vacations'
import { useGlobalState } from './context/globalProvider'

export default function Home() {
  const { vacations } = useGlobalState()
  console.log(vacations)
  return <Vacations title="All Vacations" vacations={vacations} />
}
