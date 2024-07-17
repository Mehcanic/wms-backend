import {PrismaClient} from '@prisma/client'

const prisma = new PrismaClient()

export const getAllUsers = async () => {
    try {
        return await prisma.user.findMany()
    } catch (error: any) {
        throw new Error(`Error in getAllUsers in userServices: ${error.message}`)
    }
}