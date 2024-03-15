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
  vactions: any[]
}

export default function Vacations({ title, vactions }: Props) {
  const { theme, isLoading, openModal, modal } = useGlobalState()

  return (
    <VacationsStyled theme={theme}>
      {modal && <Modal content={<CreateContent />} />}
      <h1>{title}</h1>

      <button className="btn-rounded" onClick={openModal}>
        {plus}
      </button>

      <div className="vacations grid">
        {vactions.map(vaction => (
          <VacationItem
            key={vaction.id}
            title={vaction.title}
            description={vaction.description}
            date={vaction.date}
            isCompleted={vaction.isCompleted}
            id={vaction.id}
          />
        ))}
        <button className="create-vaction" onClick={openModal}>
          {add}
          Add New Vaction
        </button>
      </div>
    </VacationsStyled>
  )
}
