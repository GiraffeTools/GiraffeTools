import React from 'react'
import {shallow} from "enzyme";
import App from '../app'
import 'raf/polyfill';
import Content from "../content";

describe('<App>', () => {
    it('renders', () => {
        const comp = shallow(<App/>)
        expect(comp.contains(<Content/>)).toBeTruthy()
    })
})