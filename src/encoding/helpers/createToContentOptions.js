import { Entity } from 'draft-js';
import { getRegex } from 'react-oneteam/lib/Mention';
import { entityType, entityMutability } from '../../plugins/mention';

const createToContentOptions = ({ mentions = [] } = {}) => {
  return {
    textToEntity(text) {
      const ret = [];
      const mentionRegex = getRegex();
      let result;
      while ((result = mentionRegex.exec(text))) { // eslint-disable-line no-cond-assign
        const [match, mentionName/*, teamName*/] = result;
        const { index: offset } = result;
        const mention = mentions.find(m => [m.userName, m.groupName].includes(mentionName));
        if (mention) {
          // TODO: ref https://draftjs.org/docs/v0-10-api-migration.html#content
          //                 \
          const entityKey = Entity.__create(entityType, entityMutability, { mention });
          ret.push({
            entity: entityKey,
            offset,
            length: match.length,
            result: mention.name
          });
        }
      }
      return ret;
    }
  };
};

export default createToContentOptions;
