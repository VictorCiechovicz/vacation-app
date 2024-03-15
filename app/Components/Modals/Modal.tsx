'use client'
import { useGlobalState } from '@/app/context/globalProvider'
import React from 'react'
import { ModalStyled } from './styles'

interface Props {
  content: React.ReactNode
}

export default function Modal({ content }: Props) {
  const { closeModal } = useGlobalState()

  const { theme } = useGlobalState()
  return (
    <ModalStyled theme={theme}>
      <div className="modal-overlay" onClick={closeModal}></div>
      <div className="modal-content">{content}</div>
    </ModalStyled>
  )
}
