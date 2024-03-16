'use client'
import { useGlobalState } from '@/app/context/globalProvider'
import { edit, trash } from '@/app/utils/Icons'
import React from 'react'

import formatDate from '@/app/utils/formatDate'
import { VacationItemStyled } from './styles'

interface Props {
  title: string
  description: string
  initialDate: string
  finalDate: string
  isCompleted: boolean
  id: string
}

export default function VacationItem({
  title,
  description,
  finalDate,
  initialDate,
  isCompleted,
  id
}: Props) {
  const { theme, deleteVacation, updateVacation, getVacation, editVacation } =
    useGlobalState()

  function truncateText(text: string, limit: number) {
    return text.length > limit ? text.substring(0, limit) + '...' : text
  }

  return (
    <VacationItemStyled theme={theme}>
      <h1>{title}</h1>
      <p>{truncateText(description, 30)}</p>
      <p>Vacation Period</p>
      <div className="date-content">
        <p className="date">{formatDate(initialDate)}</p>-
        <p className="date">{formatDate(finalDate)}</p>
      </div>

      <div className="task-footer">
        {isCompleted ? (
          <button
            className="completed"
            onClick={() => {
              const vacation = {
                id,
                isCompleted: !isCompleted
              }

              updateVacation(vacation)
            }}
          >
            Completed
          </button>
        ) : (
          <button
            className="incomplete"
            onClick={() => {
              const vacation = {
                id,
                isCompleted: !isCompleted
              }

              updateVacation(vacation)
            }}
          >
            Incomplete
          </button>
        )}
        <button
          className="edit"
          onClick={async () => {
            const vacationData = await getVacation(id)
            editVacation(vacationData)
          }}
        >
          {edit}
        </button>
        <button
          className="delete"
          onClick={() => {
            deleteVacation(id)
          }}
        >
          {trash}
        </button>
      </div>
    </VacationItemStyled>
  )
}
