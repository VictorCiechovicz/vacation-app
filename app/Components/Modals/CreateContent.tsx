'use client'
import { useGlobalState } from '@/app/context/globalProvider'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import Button from '../Button'
import { add, edit } from '@/app/utils/Icons'
import { CreateContentStyled } from './styles'

export default function CreateContent() {
  const [title, setTitle] = useState('')
  const [participants, setParticipants] = useState('')
  const [location, setLocation] = useState('')
  const [description, setDescription] = useState('')
  const [initialDate, setInitialDate] = useState('')
  const [finalDate, setFinalDate] = useState('')
  const [completed, setCompleted] = useState(false)
  const [important, setImportant] = useState(false)

  const { theme, allVacations, closeModal, currentVacation } = useGlobalState()

  const handleChange = (name: any) => (e: any) => {
    const value =
      name === 'completed' || name === 'important'
        ? e.target.checked
        : e.target.value

    switch (name) {
      case 'title':
        setTitle(value)
        break
      case 'description':
        setDescription(value)
        break
      case 'participants':
        setParticipants(value)
        break
      case 'location':
        setLocation(value)
        break
      case 'initialDate':
        setInitialDate(value)
        break
      case 'finalDate':
        setFinalDate(value)
        break
      case 'completed':
        setCompleted(value)
        break
      case 'important':
        setImportant(value)
        break
      default:
        break
    }
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()

    const vacation = {
      title,
      participants,
      location,
      description,
      initialDate,
      finalDate,
      completed,
      important
    }

    try {
      if (currentVacation) {
        await axios.put(`/api/vacations/${currentVacation.id}`, vacation)
        toast.success('Vacation updated successfully.')
      } else {
        await axios.post('/api/vacations', vacation)
        toast.success('Vacation created successfully.')
      }
      closeModal()
      allVacations()
    } catch (error) {
      toast.error('Something went wrong.')
      console.error(error)
    }
  }

  useEffect(() => {
    if (currentVacation) {
      setTitle(currentVacation.title)
      setDescription(currentVacation.description)
      setLocation(currentVacation.location)
      setParticipants(currentVacation.participants)
      setInitialDate(currentVacation.initialDate)
      setFinalDate(currentVacation.finalDate)
      setCompleted(currentVacation.isCompleted)
      setImportant(currentVacation.isImportant)
    }
  }, [currentVacation])

  return (
    <CreateContentStyled onSubmit={handleSubmit} theme={theme}>
      {currentVacation ? <h1>Edit a Vacation</h1> : <h1>Create a Vacation</h1>}

      <div className="input-control">
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          value={title}
          name="title"
          onChange={handleChange('title')}
          placeholder="Title"
          minLength={3}
          required
        />
      </div>
      <div className="input-control">
        <label htmlFor="location">Location</label>
        <input
          type="text"
          id="location"
          value={location}
          name="location"
          onChange={handleChange('location')}
          placeholder="Location"
          required
        />
      </div>
      <div className="input-control">
        <label htmlFor="participants">Participants</label>
        <input
          type="text"
          id="participants"
          value={participants}
          name="participants"
          onChange={handleChange('participants')}
          placeholder="Participants"
        />
      </div>
      <div className="input-control">
        <label htmlFor="description">Description</label>
        <textarea
          value={description}
          onChange={handleChange('description')}
          name="description"
          id="description"
          rows={4}
          maxLength={500}
          placeholder="Description"
          required
        />
        <p>{description.length}/500</p>
      </div>
      <div className="input-control">
        <label htmlFor="date">Initial Date</label>
        <input
          value={initialDate}
          onChange={handleChange('initialDate')}
          type="date"
          name="initialDate"
          id="initialDate"
          required
        />
      </div>
      <div className="input-control">
        <label htmlFor="date">Final Date</label>
        <input
          value={finalDate}
          onChange={handleChange('finalDate')}
          type="date"
          name="finalDate"
          id="finalDate"
          required
        />
      </div>
      <div className="input-control toggler">
        <label htmlFor="completed">Completed</label>
        <input
          checked={completed}
          onChange={handleChange('completed')}
          type="checkbox"
          name="completed"
          id="completed"
        />
      </div>
      <div className="input-control toggler">
        <label htmlFor="important">Important</label>
        <input
          checked={important}
          onChange={handleChange('important')}
          type="checkbox"
          name="important"
          id="important"
        />
      </div>

      <div className="submit-btn flex justify-end">
        <Button
          type="submit"
          name={currentVacation ? 'Edit' : 'Create'}
          icon={currentVacation ? edit : add}
          padding={'0.5rem 1rem'}
          borderRad={'0.8rem'}
          fw={'500'}
          fs={'1.2rem'}
          background={'rgb(0, 163, 255)'}
        />
      </div>
    </CreateContentStyled>
  )
}
