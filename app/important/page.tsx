'use client'
import React from 'react'
import { useGlobalState } from '../context/globalProvider'
import Vacations from '../Components/Vacations'

export default function Important() {
  const { importantVacations } = useGlobalState()
  return <Vacations title="Important Vacations" vactions={importantVacations} />
}
