import createFindEntitiesBy from '../utils/createFindEntitiesBy';
import DownloadLink from './DownloadLink';
import { ENTITY_TYPES } from '../constants'

export default {
  strategy: createFindEntitiesBy(ENTITY_TYPES.DOWNLOAD_LINK),
  component: DownloadLink
};
