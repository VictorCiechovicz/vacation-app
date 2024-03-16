import prisma from '@/app/utils/connect'
import { auth } from '@clerk/nextjs'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const { userId } = auth()

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized', status: 401 })
    }

    const { title, description, initialDate, finalDate, completed, important } =
      await req.json()

    if (!title || !description || !initialDate || !finalDate) {
      return NextResponse.json({
        error: 'Missing required fields',
        status: 400
      })
    }

    if (title.length < 3) {
      return NextResponse.json({
        error: 'Title must be at least 3 characters long',
        status: 400
      })
    }

    const vacation = await prisma.vacation.create({
      data: {
        title,
        description,
        initialDate,
        finalDate,
        isCompleted: completed,
        isImportant: important,
        userId
      }
    })

    return NextResponse.json(vacation)
  } catch (error) {
    console.log('ERROR CREATING TASK: ', error)
    return NextResponse.json({ error: 'Error creating vacation', status: 500 })
  }
}

export async function GET(req: Request) {
  try {
    const { userId } = auth()

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized', status: 401 })
    }

    const vacations = await prisma.vacation.findMany({
      where: {
        userId
      }
    })

    return NextResponse.json(vacations)
  } catch (error) {
    console.log('ERROR GETTING TASKS: ', error)
    return NextResponse.json({ error: 'Error updating vacation', status: 500 })
  }
}

export async function PUT(req: Request) {
  try {
    const { userId } = auth()
    const { isCompleted, id } = await req.json()

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized', status: 401 })
    }

    const vacation = await prisma.vacation.update({
      where: {
        id
      },
      data: {
        isCompleted
      }
    })

    return NextResponse.json(vacation)
  } catch (error) {
    console.log('ERROR UPDATING TASK: ', error)
    return NextResponse.json({ error: 'Error deleting task', status: 500 })
  }
}
