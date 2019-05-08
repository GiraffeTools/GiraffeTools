import { Model, many, fk, attr } from "redux-orm";
import Node from "./node";

import { ADD_NODE, REMOVE_NODE, CLEAR_DATABASE } from "../actions/actionTypes";

class Language extends Model {
  static reducer(action, Language, session) {
    const { type, payload } = action;
    switch (type) {
      case CLEAR_DATABASE:
        Language.all().delete();
        break;
      case ADD_NODE:
        const node_languages =
          payload.code && payload.code.map(c => c.language);
        node_languages.forEach(node_language => {
          const language = Language.all()
            .filter(language => language.name === node_language)
            .toModelArray()[0];
          if (language) {
            language.update({
              nodes: language.nodes
                .toModelArray()
                .map(node => node.id)
                .concat(payload.id)
            });
          } else {
            Language.create({
              name: node_language,
              nodes: [payload.id]
            });
          }
        });
        break;
    }
    return undefined;
  }
}
Language.modelName = "Language";
Language.fields = {
  name: attr(),
  numberInEditor: attr(),
  // languages
  nodes: many({
    to: "Node",
    as: "nodes",
    relatedName: "languages"
  })
};

export default Language;
