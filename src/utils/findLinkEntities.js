import { Entity } from 'draft-js';
import { ENTITY_TYPES } from '../constants';

export default function findLinkEntities(contentBlock, callback) {
  contentBlock.findEntityRanges(
    (character) => {
      const entityKey = character.getEntity();
      return (
        entityKey !== null &&
        Entity.get(entityKey).getType() === ENTITY_TYPES.LINK
      );
    },
    callback
  );
}
