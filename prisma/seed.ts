import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main(){
  await prisma.user.create({
    data: {
      username: 'boss',
      email: 'boss@example.com',
      password: '$2a$10$xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx' // use real hash or create via API
    }
  });
  await prisma.quest.createMany({
    data: [
      { title: 'Intro Mission', description: 'Solve hello world', xpReward: 50, penaltyXp: 10, isDaily: true },
      { title: 'Algo Warmup', description: 'Two-sum style', xpReward: 100, penaltyXp: 20, isDaily: false }
    ]
  });
}
main().catch(e=>{console.error(e); process.exit(1)}).finally(()=>prisma.$disconnect());