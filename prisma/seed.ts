// eslint-disable-next-line @typescript-eslint/no-var-requires
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const plants = [
    {
        nickName: 'The ZZ',
        commonName: 'ZZ Plant',
        waterDates: [new Date('2022-9-1')]
    },
    {
        nickName: 'Big ZZ',
        commonName: 'ZZ Plant',
        waterDates: [new Date('2022-8-4')]
    },
    {
        nickName: 'Queen Pothos',
        commonName: 'Marble Queen Pothos',
        purchaseDate: new Date('2022-09-13'),
    },
    {
        commonName: 'Golden Pothos',
        waterDates: [new Date('2022-8-28')]
    },
    {
        nickName: 'Pothos #2',
        commonName: 'Pothos',
        waterDates: [new Date('2022-8-28')]
    },
    {
        nickName: 'Monstera #1',
        commonName: 'Monstera deliciosa',
        waterDates: [new Date('2022-9-12')]
    },
    {
        nickName: 'Monstera #2',
        commonName: 'Monstera deliciosa',
        waterDates: [new Date('2022-8-28')]
    },
    {
        commonName: 'Philodendren',
        purchaseDate: new Date('2022-5-8'),
        waterDates: [new Date('2022-9-15')]
    },
    {
        nickName: 'Monty',
        commonName: 'Monstera deliciosa',
        waterDates: [new Date('2022-8-28')]
    },
    {
        nickName: 'M/L Fiddle',
        commonName: 'Fiddle Leaf Fig',
        waterDates: [new Date('2022-9-13')],
        waterInstructions: '1 cup per foot'
    },
    {
        nickName: 'Lil Fiddle',
        commonName: 'Fiddle Leaf Fig',
        purchaseDate: new Date('2021-5-9'),
        waterDates: [new Date('2022-9-13')],
        waterInstructions: '1/2 cup from bottom'
    },
    {
        nickName: 'BB Cacti',
        commonName: 'Cactus',
        waterDates: [new Date('2022-7-14')]
    },
    {
        nickName: 'Cacti',
        commonName: 'Cactus',
        waterDates: [new Date('2022-8-4')]
    },
    {
        nickName: 'Superba',
        commonName: 'Fittonia',
        purchaseDate: new Date('2022-9-13'),
    },
];

const load = async () => {
    try {
        await prisma.plant.deleteMany();
        console.log('Deleted all existing plants');

        await prisma.$queryRaw`SELECT setval('"Plant_id_seq"', 1, false);`;
        console.log('reset plant auto increment to 1');

        await prisma.plant.createMany({
            data: plants,
        });
        console.log('Added product data');
    } catch (e) {
        console.error(e);
        process.exit(1);
    } finally {
        await prisma.$disconnect();
    }
};

load();
