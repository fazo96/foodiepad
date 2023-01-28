import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main () {
  const groceries = await prisma.shoppingList.upsert({
    where: { title: 'Groceries' },
    update: {},
    create: {
      title: 'Groceries'
    }
  })

  const tasks = await prisma.shoppingList.upsert({
    where: { title: 'Tasks' },
    update: {},
    create: {
      title: 'Tasks'
    }
  })

  console.log({ groceries, tasks })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
