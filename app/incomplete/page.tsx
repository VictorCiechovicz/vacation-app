'use client'
import React from 'react'
import { useGlobalState } from '../context/globalProvider'
import Vacations from '../Components/Vacations'

export default function Incomplete() {
  const { incompleteVacations } = useGlobalState()
  return (
    <Vacations title="Incomplete Vacations" vactions={incompleteVacations} />
  )
}
