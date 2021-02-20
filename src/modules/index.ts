import { makeExecutableSchemaFromModules } from '../utils/modules';
import auth from './auth';

const schema = makeExecutableSchemaFromModules({
    modules: [
        auth
    ]
});

export default schema;