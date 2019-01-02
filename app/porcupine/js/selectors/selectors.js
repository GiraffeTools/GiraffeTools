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
        const obj = Object.assign({}, node);
        const parameters = session.Node.withId(node.id).parameters;
        obj.parameters = parameters && parameters.toRefArray();
        return obj;
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

    const obj = Object.assign({}, node.ref);
    //add parameters
    obj.parameters =
      node.parameters &&
      node.parameters.toRefArray().map(parameterRef => {
        const parameter = orm.Parameter.withId(parameterRef.id);
        //add links

        const inputLinks = parameter.input
          ? parameter.input.inputLinks.toRefArray()
          : [];
        const outputLinks = parameter.output
          ? parameter.output.outputLinks.toRefArray()
          : [];

        const obj = Object.assign({}, parameter.ref);
        return { ...obj, outputLinks, inputLinks };
      });
    return obj;
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
        const obj = Object.assign({}, link);
        let portFrom = obj.portFrom ? session.Port.withId(obj.portFrom) : null;
        obj.portFrom = portFrom && portFrom.ref;
        let portTo = obj.portTo ? session.Port.withId(obj.portTo) : null;
        obj.portTo = portTo && portTo.ref;
        return obj;
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
        const newLink = Object.assign({}, link);
        let portRef = session.Port.withId(newLink.portFrom);
        if (portRef && portRef.ref) {
          const newPort = portRef && Object.assign({}, portRef.ref);
          newPort.name = portRef.outputParent && portRef.outputParent.name;
          let nodeRef = session.Node.withId(newPort.node);
          const newNode = nodeRef && Object.assign({}, nodeRef.ref);
          newPort.node = newNode;
          newLink.portFrom = newPort;
        } else {
          newLink.portFrom = null;
        }

        portRef = session.Port.withId(newLink.portTo);
        if (portRef && portRef.ref) {
          const newPort = portRef && Object.assign({}, portRef.ref);
          newPort.name = portRef.inputParent && portRef.inputParent.name;
          let nodeRef = session.Node.withId(newPort.node);
          const newNode = nodeRef && Object.assign({}, nodeRef.ref);
          newPort.node = newNode;
          newLink.portTo = newPort;
        } else {
          newLink.portTo = null;
        }
        return newLink;
      });
  }
);
