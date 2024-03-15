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
