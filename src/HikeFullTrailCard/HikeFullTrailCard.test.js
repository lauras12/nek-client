import React from 'react';
import ReactDom from 'react-dom';
import renderer from 'react-test-renderer';
import HikeFullTrailCard from './HikeFullTrailCard';
import {BrowserRouter as BR} from 'react-router-dom';

describe('HikeFullTrailCard component', () => {
    let props = {
        location: { pathname: '/hike'},
        history: {location: {pathname: '/hike'}},
        match: {params: {track_id: 1}}
    };
   
    it ('renders without crashing',() => {
        const div = document.createElement('div');
        ReactDom.render(<BR><HikeFullTrailCard {...props} /></BR>, div);
        ReactDom.unmountComponentAtNode(div);
    });
   
    it('renders UI as expected', () => {
        const fullCard = renderer.create(<BR><HikeFullTrailCard {...props} /></BR>);
        expect(fullCard.toJSON()).toMatchSnapshot();
    });
});