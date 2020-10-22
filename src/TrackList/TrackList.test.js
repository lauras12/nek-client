import React from 'react';
import ReactDom from 'react-dom';
import renderer from 'react-test-renderer';
import TrackList from './TrackList';
import {BrowserRouter as BR } from 'react-router-dom';


describe('TrackList component', () => {
    
    it ('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDom.render(<BR><TrackList /></BR>, div);
        ReactDom.unmountComponentAtNode(div);
    });

    it('renders UI as expected', () => {
        const list = renderer.create(<BR><TrackList /></BR>);
        expect(list.toJSON()).toMatchSnapshot();
    });
});
