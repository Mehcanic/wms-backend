import {PrismaClient} from '@prisma/client'

const prisma = new PrismaClient()

export const getAllLogs = async () => {
    try {
        return await prisma.logs.findMany()
    } catch (error: any) {
        throw new Error(`Error in getAllLogs in userServices: ${error.message}`)
    }
}