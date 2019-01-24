import { createSelector } from "redux-orm";

import orm from "../models";

export const nodes = createSelector(
  orm,
  state => state.orm,
  session => {
    return session.Node.all().toRefArray();
  }
);

export const nodesWithParameters = createSelector(
  orm,
  state => state.orm,
  session => {
    return session.Node.all()
      .toRefArray()
      .map(node => {
        const parameters = session.Node.withId(node.id).parameters;
        return { ...node, parameters: parameters && parameters.toRefArray() };
      });
  }
);

export const selectedNode = createSelector(
  orm,
  state => state.orm,
  state => state.scene.selection,
  (orm, selection) => {
    if (!selection || !selection.nodes || selection.nodes.length != 1) {
      return null;
    }
    const node = orm.Node.withId(selection.nodes[0]);
    if (!node) {
      return null;
    }

    const parameters =
      node.parameters &&
      node.parameters.toRefArray().map(parameterRef => {
        const parameter = orm.Parameter.withId(parameterRef.id);

        const inputLinks = parameter.input
          ? parameter.input.inputLinks.toRefArray()
          : [];
        const outputLinks = parameter.output
          ? parameter.output.outputLinks.toRefArray()
          : [];

        return { ...parameter.ref, outputLinks, inputLinks };
      });
    return { ...node.ref, parameters };
  }
);

export const links = createSelector(
  orm,
  state => state.orm,
  session => {
    return session.Link.all().toRefArray();
  }
);

export const linksWithPorts = createSelector(
  orm,
  state => state.orm,
  session => {
    return session.Link.all()
      .toRefArray()
      .map(link => {
        const portFrom = link.portFrom
          ? session.Port.withId(link.portFrom).ref
          : null;
        const portTo = link.portTo
          ? session.Port.withId(link.portTo).ref
          : null;
        return { ...link, portFrom, portTo };
      });
  }
);

export const linksWithPortsAndNodes = createSelector(
  orm,
  state => state.orm,
  session => {
    return session.Link.all()
      .toRefArray()
      .map(link => {
        // TODO: check if all this Object.assign is strictly necessary
        const outputPort = session.Port.withId(link.portFrom);
        const nodeFrom = session.Node.withId(outputPort.node);
        const portFrom = outputPort
          ? {
              ...outputPort.ref,
              name: outputPort.outputParent && outputPort.outputParent.name,
              node: { ...nodeFrom.ref }
            }
          : null;

        const inputPort = session.Port.withId(link.portTo);
        const nodeTo = session.Node.withId(inputPort.node);
        const portTo = inputPort
          ? {
              ...inputPort.ref,
              name: inputPort.inputParent && inputPort.inputParent.name,
              node: { ...nodeTo.ref }
            }
          : null;

        return { ...link, portFrom, portTo };
      });
  }
);
