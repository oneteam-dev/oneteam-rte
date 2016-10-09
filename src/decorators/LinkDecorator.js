import { ENTITY_TYPES } from 'oneteam-rte-utils'
import Link from './Link';
import createFindEntitiesBy from '../utils/createFindEntitiesBy';
import findWithRegex from '../utils/findWithRegex';
import URL_REGEX from '../helpers/urlRegex';

const findLinkEntity = createFindEntitiesBy(ENTITY_TYPES.LINK);

export default {
  strategy(contentBlock, callback) {
    findLinkEntity(contentBlock, callback);
    findWithRegex(URL_REGEX, contentBlock, callback);
  },
  component: Link
};
