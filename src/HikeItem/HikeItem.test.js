import React from 'react';
import ReactDom from 'react-dom';
import renderer from 'react-test-renderer';
import HikeItem from './HikeItem';
import {BrowserRouter as BR} from 'react-router-dom';

describe('HikeItem component', () => {
    let props = {
        hikeId: 1,
        trackId: 1,
        history: {location: {pathname: `/hike/1/track/1}`}},   
    };
   
    it ('renders without crashing',() => {
        const div = document.createElement('div');
        ReactDom.render(<BR><HikeItem {...props} /></BR>, div);
        ReactDom.unmountComponentAtNode(div);
    });
   
    it('renders UI as expected', () => {
        const item= renderer.create(<BR><HikeItem {...props} /></BR>);
        expect(item.toJSON()).toMatchSnapshot();
    });
});