import { makeExecutableSchemaFromModules } from '../utils/modules';
import auth from './auth';
import board from './board';

const schema = makeExecutableSchemaFromModules({
  modules: [
    auth,
    board,
  ],
});

export default schema;
