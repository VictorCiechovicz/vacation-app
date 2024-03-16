'use client'
import React from 'react'
import { useGlobalState } from '../context/globalProvider'
import Vacations from '../Components/Vacations'

export default function Completed() {
  const { completedVacations } = useGlobalState()

  return (
    <Vacations title="Completed Vacations" vacations={completedVacations} />
  )
}
