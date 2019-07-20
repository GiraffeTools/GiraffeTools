import {Model, many, attr} from 'redux-orm';

import {ADD_NODE, CLEAR_DATABASE} from '../actions/actionTypes';

class Language extends Model {
  static reducer(action, Language, session) {
    const {type, payload} = action;
    switch (type) {
      case CLEAR_DATABASE:
        Language.all().delete();
        break;
      case ADD_NODE:
        const nodeLanguages =
          Array.isArray(payload.code) && payload.code.map((c) => c.language);
        nodeLanguages &&
          nodeLanguages.forEach((nodeLanguage) => {
            const language = Language.all()
                .filter((language) => language.name === nodeLanguage)
                .toModelArray()[0];
            if (language) {
              language.update({
                nodes: language.nodes
                    .toModelArray()
                    .map((node) => node.id)
                    .concat(payload.id),
              });
            } else {
              Language.create({
                name: nodeLanguage,
                nodes: [payload.id],
              });
            }
          });
        break;
    }
    return undefined;
  }
}
Language.modelName = 'Language';
Language.fields = {
  name: attr(),
  numberInEditor: attr(),
  // languages
  nodes: many({
    to: 'Node',
    as: 'nodes',
    relatedName: 'languages',
  }),
};

export default Language;
