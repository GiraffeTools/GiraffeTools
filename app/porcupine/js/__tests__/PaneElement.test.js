import React, { Component } from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import TestBackend from 'react-dnd-test-backend';
import { DragDropContext } from 'react-dnd';
import {shallow, mount} from "enzyme";
import PaneElement from "../paneElement";

/**
 * Wraps a component into a DragDropContext that uses the TestBackend.
 */
function wrapInTestContext(DecoratedComponent) {
  return DragDropContext(TestBackend)(
    class TestContextContainer extends Component {
      render() {
        return <DecoratedComponent {...this.props} />;
      }
    }
  );
}

describe('<PaneElement>', () => {
  // Render with the test context that uses the test backend
    const BoxContext = wrapInTestContext(PaneElement);
    const root = mount(
        <BoxContext
          key = "testElement"
          category = {['test', 'category']}
          id  = "test.Element"
        >testElement</BoxContext>
    );
    //
    it('can be tested with the testing backend', () => {

      // Test that the opacity is 1
      let div = root.find('div.btn').get(0)
      expect(div.props.style.opacity).toEqual(1)

    });
    // it('can be draged', () => {

    //   // Obtain a reference to the backend
    //   const backend = root.instance().getManager().getBackend();

    //   // Find the drag source ID and use it to simulate the dragging operation
    //   backend.simulateBeginDrag([root.find(PaneElement).instance().getHandlerId()]);
    //   console.log(root.find(PaneElement).instance())
    //   // Verify that the div changed its opacity
    //   let div = root.find('div.btn').get(0)
    //   expect(div.props.style.opacity).toEqual(0.5);

    // });
})

