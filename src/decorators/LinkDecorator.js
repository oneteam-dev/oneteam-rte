import urlRegex from 'url-regex';
import Link from './Link';
import createFindEntitiesBy from '../utils/createFindEntitiesBy';
import findWithRegex from '../utils/findWithRegex';
import { ENTITY_TYPES } from '../constants'

const URL_REGEX = urlRegex();

const findLinkEntity = createFindEntitiesBy(ENTITY_TYPES.LINK);

export default {
  strategy(contentBlock, callback) {
    findLinkEntity(contentBlock, callback);
    findWithRegex(URL_REGEX, contentBlock, callback);
  },
  component: Link
};
