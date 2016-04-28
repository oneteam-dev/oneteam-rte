import createFindEntitiesBy from '../utils/createFindEntitiesBy';
import Link from '../blocks/Link';
import { ENTITY_TYPES } from '../constants'

export default {
  strategy: createFindEntitiesBy(ENTITY_TYPES.LINK),
  component: Link
};
