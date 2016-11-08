import { ENTITY_TYPES } from 'oneteam-rte-constants'
import createFindEntitiesBy from '../utils/createFindEntitiesBy';
import DownloadLink from './DownloadLink';

export default {
  strategy: createFindEntitiesBy(ENTITY_TYPES.DOWNLOAD_LINK),
  component: DownloadLink
};
