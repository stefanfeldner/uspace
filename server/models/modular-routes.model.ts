import { CustomError } from '../error-handling/custom-err.class';
import { IAllTables } from '../interfaces/modular-routes.interface';
import { getAllEntriesQuery, getUniqueEntryQuery } from '../queries/modular-routes.queries';

// modular route: returns all entries in a table
export const returnAllEntries = async (route: string): Promise <IAllTables[]> => {
  try {
    const entries = await getAllEntriesQuery(route);
    return entries;
  } catch (error) {
    console.log(error);
    throw new CustomError('A database error has occurred.');
  }
};

// modular route: returns single entry in a table by id
export const returnEntryById = async (route: string, id: string): Promise<IAllTables> => {
  // extract path from url and remove slashes and plural 's'
  const tableName = route.match(/(\/\w+\/)/g)![0].slice(1, -2);
  try {
    if (!tableName) {
      throw new CustomError('A database error has occurred.');
    } else {
      const entry = await getUniqueEntryQuery(tableName, id);
      return entry;
    }
  } catch (error) {
    console.log(error);
    throw new CustomError('A database error has occurred.');
  }
};
