import {createSelector} from 'redux-orm';

import orm from '../models';

export const stickies = createSelector(
    orm,
    (state) => state.orm,
    (session) => {
      return session.Sticky.all().toRefArray();
    }
);

export const nodes = createSelector(
    orm,
    (state) => state.orm,
    (session) => {
      return session.Node.all().toRefArray();
    }
);

export const languageNames = createSelector(
    orm,
    (state) => state.orm,
    (session) => {
      return session.Language.all()
          .toModelArray()
          .map((language) => language.name);
    }
);

export const nodesWithParameters = createSelector(
    orm,
    (state) => state.orm,
    (session) => {
      return session.Node.all()
          .toModelArray()
          .map((node) => {
            const parameters = session.Node.withId(node.id).parameters;
            return {
              ...node.ref,
              parameters: parameters && parameters.toRefArray(),
            };
          });
    }
);

export const copiedNodes = createSelector(
    orm,
    (state) => state.orm,
    (state) => state.scene.copyNodes,
    (orm, copyNodes) => {
      if (!copyNodes) return null;
      const nodes = orm.Node.filter((node) =>
        copyNodes.includes(node.id)
      ).toRefArray();
      if (!nodes.length) return null;
      return nodes;
    }
);

export const selectedNode = (orm, node) => {
  if (!node) {
    return null;
  }
  const parameters =
    node.parameters &&
    node.parameters.toModelArray().map((parameterRef) => {
      const parameter = orm.Parameter.withId(parameterRef.id);

      const inputLinks =
        parameter.input && parameter.input.inputLinks
          ? parameter.input.inputLinks.toRefArray()
          : [];
      const outputLinks =
        parameter.output && parameter.output.outputLinks
          ? parameter.output.outputLinks.toRefArray()
          : [];

      return {...parameter.ref, outputLinks, inputLinks};
    });
  return {...node.ref, parameters};
};

export const selectedLink = (orm, link) => {
  return link ? {...link.ref} : null;
};

export const selectedSticky = (orm, sticky) => {
  return sticky ? {...sticky.ref} : null;
};

export const selection = createSelector(
    orm,
    (state) => state.orm,
    (state) => state.scene.selection,
    (orm, selection) => {
      if (!selection) {
        return null;
      }
      const {links, nodes, stickies} = selection;
      // exctly one selected item:
      if (
        (nodes && nodes.length) +
        (links && links.length) +
        (stickies && stickies.length) ==
      1
      ) {
        if (nodes && nodes.length == 1) {
          const node = orm.Node.withId(nodes[0]);
          return {type: 'node', ...selectedNode(orm, node)};
        } else if (links && links.length == 1) {
          const link = orm.Link.withId(links[0]);
          return {type: 'link', ...selectedLink(orm, link)};
        } else if (stickies && stickies.length == 1) {
          const sticky = orm.Sticky.withId(stickies[0]);
          return {type: 'sticky', ...selectedSticky(orm, sticky)};
        }
      }
      return null;
    }
);

export const links = createSelector(
    orm,
    (state) => state.orm,
    (session) => {
      return session.Link.all().toRefArray();
    }
);

export const linksWithPorts = createSelector(
    orm,
    (state) => state.orm,
    (session) => {
      return session.Link.all()
          .toRefArray()
          .map((link) => {
            const portFrom = link.portFrom
          ? session.Port.withId(link.portFrom).ref
          : null;
            const portTo = link.portTo
          ? session.Port.withId(link.portTo).ref
          : null;
            return {...link, portFrom, portTo};
          });
    }
);

export const linksWithPortsAndNodes = createSelector(
    orm,
    (state) => state.orm,
    (session) => {
      return session.Link.all()
          .toRefArray()
          .map((link) => {
            // TODO: check if all this Object.assign is strictly necessary
            const outputPort = session.Port.withId(link.portFrom);
            const nodeFrom = session.Node.withId(outputPort.node);
            const portFrom = outputPort
          ? {
            ...outputPort.ref,
            name: outputPort.outputParent && outputPort.outputParent.name,
            node: {...nodeFrom.ref},
          }
          : null;

            const inputPort = session.Port.withId(link.portTo);
            const nodeTo = session.Node.withId(inputPort.node);
            const portTo = inputPort
          ? {
            ...inputPort.ref,
            name: inputPort.inputParent && inputPort.inputParent.name,
            node: {...nodeTo.ref},
          }
          : null;

            return {...link, portFrom, portTo};
          });
    }
);
