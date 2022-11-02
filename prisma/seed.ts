import {Prisma, PrismaClient} from '@prisma/client'

const prisma = new PrismaClient();

const plantsData: Prisma.PlantCreateInput[] = [
  {
    nickName: 'The ZZ',
    commonName: 'ZZ Plant',
    waterDates: {
      create: [{date: new Date('2022-9-1')}, {date: new Date('2022-8-3')}]
    }
  },
  {
    nickName: 'Queen Pothos',
    commonName: 'Marble Queen Pothos',
    purchaseDate: new Date('2022-09-13'),
  },
  {
    nickName: 'Golden Pothos',
    waterDates: {
      create: {date: new Date('2022-8-28')}
    }
  },
  {
    nickName: 'Pothos #2',
    commonName: 'Pothos',
    waterDates: {
      create: {date: new Date('2022-8-28')}
    }
  },
  {
    nickName: 'Big ZZ',
    commonName: 'ZZ Plant',
    waterDates: {
      create: {date: new Date('2022-8-4')}
    }
  },
  {
    nickName: 'Monstera #1',
    commonName: 'Monstera deliciosa',
    waterDates: {
      create: {date: new Date('2022-9-12')}
    }
  },
  {
    nickName: 'Monstera #2',
    commonName: 'Monstera deliciosa',
    waterDates: {
      create: {date: new Date('2022-8-28')}
    }
  },
  {
    nickName: 'Philodendren',
    purchaseDate: new Date('2022-5-8'),
    waterDates: {
      create: {date: new Date('2022-9-15')}
    }
  },
  {
    nickName: 'Monty',
    commonName: 'Monstera deliciosa',
    waterDates: {
      create: {date: new Date('2022-8-28')}
    }
  },
  {
    nickName: 'M/L Fiddle',
    commonName: 'Fiddle Leaf Fig',
    waterDates: {
      create: {date: new Date('2022-9-13')}
    },
    waterInstructions: '1 cup per foot'
  },
  {
    nickName: 'Lil Fiddle',
    commonName: 'Fiddle Leaf Fig',
    purchaseDate: new Date('2021-5-9'),
    waterDates: {
      create: {date: new Date('2022-9-13')}
    },
    waterInstructions: '1/2 cup from bottom'
  },
  {
    nickName: 'BB Cacti',
    commonName: 'Cactus',
    waterDates: {
      create: {date: new Date('2022-7-14')}
    }
  },
  {
    nickName: 'Cacti',
    commonName: 'Cactus',
    waterDates: {
      create: {date: new Date('2022-8-4')}
    }
  },
  {
    nickName: 'Superba',
    commonName: 'Fittonia',
    purchaseDate: new Date('2022-9-13'),
  },
];

async function resetDatabase() {
  await prisma.waterDate.deleteMany();
  await prisma.plant.deleteMany();
  console.log('Deleted all existing plants');

  await prisma.$queryRaw`SELECT setval('"Plant_id_seq"', 1, false);`;
  console.log('reset plant auto increment to 1');
}

async function createSampleRecords() {
  for (const plant of plantsData) {
    await prisma.plant.create({data: plant});
  }

  console.log('Added plant sample data');
}

const load = async () => {
  try {
    await resetDatabase();
    await createSampleRecords();
  } catch (e) {
    console.error(e);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
};

load();
