'use client'
import React, { createContext, useState, useContext, useEffect } from 'react'
import themes from './themes'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useUser } from '@clerk/nextjs'

export const GlobalContext = createContext()
export const GlobalUpdateContext = createContext()

export const GlobalProvider = ({ children }) => {
  const { user } = useUser()

  const [selectedTheme, setSelectedTheme] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [modal, setModal] = useState(false)
  const [collapsed, setCollapsed] = useState(false)
  const [vacations, setVacations] = useState([])
  const [currentVacation, setCurrentVacation] = useState(null)

  const theme = themes[selectedTheme]

  const openModal = () => {
    setModal(true)
  }

  const closeModal = () => {
    setModal(false)
  }

  const collapseMenu = () => {
    setCollapsed(!collapsed)
  }

  const allVacations = async () => {
    setIsLoading(true)
    try {
      const res = await axios.get('/api/vacations')

      const sorted = res.data.sort((a, b) => {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      })

      setVacations(sorted)

      setIsLoading(false)
    } catch (error) {
      console.log(error)
    }
  }

  const deleteVacation = async id => {
    try {
      await axios.delete(`/api/vacations/${id}`)
      toast.success('Vacation deleted')

      allVacations()
    } catch (error) {
      console.log(error)
      toast.error('Something went wrong')
    }
  }

  const updateVacation = async vaction => {
    try {
      await axios.put(`/api/vacations`, vaction)

      toast.success('Vaction updated')

      allVacations()
    } catch (error) {
      console.log(error)
      toast.error('Something went wrong')
    }
  }

  const editVacation = vacation => {
    setCurrentVacation(vacation)
    openModal()
  }

  const getVacation = async id => {
    try {
      const res = await axios.get(`/api/vacations/${id}`)
      return res.data
    } catch (error) {
      console.log(error)
      toast.error('Something went wrong')
    }
  }

  const completedVacations = vacations.filter(
    vacation => vacation.isCompleted === true
  )
  const importantVacations = vacations.filter(
    vacation => vacation.isImportant === true
  )

  useEffect(() => {
    if (user) allVacations()
  }, [user])

  return (
    <GlobalContext.Provider
      value={{
        theme,
        vacations,
        deleteVacation,
        getVacation,
        currentVacation,
        setCurrentVacation,
        editVacation,
        isLoading,
        completedVacations,
        importantVacations,

        updateVacation,
        modal,
        openModal,
        closeModal,
        allVacations,
        collapsed,
        collapseMenu
      }}
    >
      <GlobalUpdateContext.Provider value={{}}>
        {children}
      </GlobalUpdateContext.Provider>
    </GlobalContext.Provider>
  )
}

export const useGlobalState = () => useContext(GlobalContext)
export const useGlobalUpdate = () => useContext(GlobalUpdateContext)
