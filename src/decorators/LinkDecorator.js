import findLinkEntities from '../utils/findLinkEntities';
import Link from '../blocks/Link';

export default {
  strategy: findLinkEntities,
  component: Link
};
