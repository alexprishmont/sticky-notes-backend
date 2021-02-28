import { makeExecutableSchemaFromModules } from '../utils/modules';
import auth from './auth';
import board from './board';
import filter from './filter';
import user from './user';
import note from './note';

const schema = makeExecutableSchemaFromModules({
  modules: [
    auth,
    board,
    filter,
    user,
    note,
  ],
});

export default schema;
