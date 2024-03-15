'use client'
import { useGlobalState } from '@/app/context/globalProvider'
import { edit, trash } from '@/app/utils/Icons'
import React from 'react'

import formatDate from '@/app/utils/formatDate'
import { VacationItemStyled } from './styles'

interface Props {
  title: string
  description: string
  date: string
  isCompleted: boolean
  id: string
}

export default function VacationItem({
  title,
  description,
  date,
  isCompleted,
  id
}: Props) {
  const { theme, deleteTask, updateTask } = useGlobalState()
  return (
    <VacationItemStyled theme={theme}>
      <h1>{title}</h1>
      <p>{description}</p>
      <p className="date">{formatDate(date)}</p>
      <div className="task-footer">
        {isCompleted ? (
          <button
            className="completed"
            onClick={() => {
              const task = {
                id,
                isCompleted: !isCompleted
              }

              updateTask(task)
            }}
          >
            Completed
          </button>
        ) : (
          <button
            className="incomplete"
            onClick={() => {
              const task = {
                id,
                isCompleted: !isCompleted
              }

              updateTask(task)
            }}
          >
            Incomplete
          </button>
        )}
        <button className="edit">{edit}</button>
        <button
          className="delete"
          onClick={() => {
            deleteTask(id)
          }}
        >
          {trash}
        </button>
      </div>
    </VacationItemStyled>
  )
}
