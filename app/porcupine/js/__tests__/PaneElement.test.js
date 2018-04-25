import React from 'react'
import PaneElement from "../paneElement";
import {shallow} from "enzyme";

describe('<PaneElement>', () => {
    it('wraps children in a draggable div', () => {
        const comp = shallow(
            <PaneElement category={[]} id="1">
                {"title"}
            </PaneElement>
        )

        expect(comp).toMatchSnapshot()
    })
})