'use client'
import { useGlobalState } from '@/app/context/globalProvider'
import React, { useRef } from 'react'
import { ModalStyled } from './styles'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'

interface Props {
  content: React.ReactNode
}

export default function Modal({ content }: Props) {
  const { closeModal } = useGlobalState()
  const { theme } = useGlobalState()
  const pdfRef = useRef<HTMLInputElement>(null)

  const handleDownloadVacationPDF = (e: any) => {
    e.preventDefault()
    const input = pdfRef.current
    if (input)
      html2canvas(input).then(canvas => {
        const imgData = canvas.toDataURL('image/png')
        const pdf = new jsPDF('p', 'mm', 'a4', true)
        const pdfWidth = pdf.internal.pageSize.getWidth()
        const pdfHeight = pdf.internal.pageSize.getHeight()
        const imgWidth = canvas.width
        const imgHeight = canvas.height
        const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight)
        const imgX = (pdfWidth - imgWidth * ratio) / 2
        const imgY = 10
        pdf.addImage(
          imgData,
          'PNG',
          imgX,
          imgY,
          imgWidth * ratio,
          imgHeight * ratio
        )
        pdf.save('vacation-details.pdf')
      })
  }

  return (
    <ModalStyled theme={theme}>
      <div className="modal-overlay" onClick={closeModal}></div>
      <div className="modal-content" ref={pdfRef}>
        <div className="flex justify-end">
          <button onClick={handleDownloadVacationPDF}>Download PDF</button>
        </div>
        {content}
      </div>
    </ModalStyled>
  )
}
