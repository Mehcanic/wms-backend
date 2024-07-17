import {PrismaClient} from '@prisma/client'

const prisma = new PrismaClient()

export const getAllCustomers = async () => {
    try {
        return await prisma.customer.findMany()
    } catch (error: any) {
        throw new Error(`Error in getAllCustomer in customerServices: ${error.message}`)
    }
}
