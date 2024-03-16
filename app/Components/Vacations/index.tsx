'use client'
import { useGlobalState } from '@/app/context/globalProvider'
import React from 'react'

import CreateContent from '../Modals/CreateContent'

import { add, plus } from '@/app/utils/Icons'
import Modal from '../Modals/Modal'
import { VacationsStyled } from './styles'
import VacationItem from '../VacationItem'

interface Props {
  title: string
  vacations: any[]
}

export default function Vacations({ title, vacations }: Props) {
  const { theme, isLoading, openModal, modal, setCurrentVacation } =
    useGlobalState()

  function handleNewVacation() {
    setCurrentVacation(null)
    openModal()
  }

  return (
    <VacationsStyled theme={theme}>
      {modal && <Modal content={<CreateContent />} />}
      <h1>{title}</h1>

      <div className="vacations grid">
        {vacations.map(vacation => (
          <VacationItem
            key={vacation.id}
            title={vacation.title}
            description={vacation.description}
            initialDate={vacation.initialDate}
            finalDate={vacation.finalDate}
            isCompleted={vacation.isCompleted}
            id={vacation.id}
          />
        ))}
        <button className="create-vacation" onClick={handleNewVacation}>
          {add}
          Add New Vaction
        </button>
      </div>
    </VacationsStyled>
  )
}
