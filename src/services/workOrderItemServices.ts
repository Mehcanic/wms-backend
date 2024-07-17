import {PrismaClient} from '@prisma/client'

const prisma = new PrismaClient()

export const getAllWorkOrderItems = async (amount: string) => {
    try {
        return await prisma.workOrderItem.findMany({
           take: parseInt(amount),
            orderBy: {
               name: 'asc'
            }

        })
    } catch (error: any) {
        throw new Error(`Error in getAllWorkOrderItems in workOrderItemServices: ${error.message}`)
    }

}