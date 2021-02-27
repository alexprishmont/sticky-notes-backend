import { makeExecutableSchemaFromModules } from '../utils/modules';
import auth from './auth';
import board from './board';
import filter from './filter';
import user from './user';

const schema = makeExecutableSchemaFromModules({
  modules: [
    auth,
    board,
    filter,
    user,
  ],
});

export default schema;
