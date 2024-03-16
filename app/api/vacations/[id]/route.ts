import prisma from '@/app/utils/connect'
import { auth } from '@clerk/nextjs'
import { NextResponse } from 'next/server'

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { userId } = auth()
    const { id } = params

    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const vacation = await prisma.vacation.delete({
      where: {
        id
      }
    })

    return NextResponse.json(vacation)
  } catch (error) {
    console.log('ERROR DELETING VACATION: ', error)
    return NextResponse.json({ error: 'Error deleting vacation', status: 500 })
  }
}

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { userId } = auth()
    const { id } = params

    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const vacation = await prisma.vacation.findFirst({
      where: {
        id
      }
    })

    return NextResponse.json(vacation)
  } catch (error) {
    console.log('ERROR GET VACATION: ', error)
    return NextResponse.json({ error: 'Error get vacation', status: 500 })
  }
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { userId } = auth()
    const { id } = params
    const { title, description, initialDate, finalDate, completed, important } =
      await req.json()

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized', status: 401 })
    }

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

    const vacation = await prisma.vacation.update({
      where: {
        id
      },
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
    console.log('ERROR UPDATING TASK: ', error)
    return NextResponse.json({ error: 'Error deleting task', status: 500 })
  }
}
