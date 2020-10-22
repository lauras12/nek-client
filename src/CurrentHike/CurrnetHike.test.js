import React from 'react';
import ReactDom from 'react-dom';
import renderer from 'react-test-renderer';
import CurrentHike from './CurrentHike';
import {BrowserRouter as BR} from 'react-router-dom';

describe('CurrentHike component', () => {
    
    it ('renders without crashing',() => {
        const div = document.createElement('div');
        ReactDom.render(<BR><CurrentHike /></BR>, div);
        ReactDom.unmountComponentAtNode(div);
    });
    
    it('renders UI as expected', () => {
        const loginPage = renderer.create(<BR><CurrentHike /></BR>);
        expect(loginPage.toJSON()).toMatchSnapshot();
    });
});