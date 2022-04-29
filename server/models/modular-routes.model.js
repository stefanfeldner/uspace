import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// modular route: returns all entries in a table
const returnAllEntries = async (route) => {
  const tableName = route;

  try {
    const entries = await prisma[tableName].findMany();
    return entries;
  } catch (error) {
    return error;
  }
};

// modular route: returns single entry in a table by id
const returnEntryById = async (route, id) => {
  // extract path from url and remove slashes and plural 's'
  const tableName = route.match(/(\/\w+\/)/g)[0].slice(1, -2);

  try {
    const user = await prisma[tableName].findUnique({
      where: {
        id: +id // parsed string
      }
    });
    return user;
  } catch (error) {
    return error;
  }
};

export default {
  returnAllEntries,
  returnEntryById
}
