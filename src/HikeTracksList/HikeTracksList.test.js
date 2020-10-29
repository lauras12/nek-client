import React from 'react';
import ReactDom from 'react-dom';
import renderer from 'react-test-renderer';
import HikeTracksList from './HikeTracksList';
import {BrowserRouter as BR} from 'react-router-dom';
import { HikeContextProvider as TCP } from '../Context';

describe('HikeTracksList component', () => {
    const props = {
        match: {params: {path: '/hike'}},
        history: {push: () => {}}
    };
    
    it ('renders without crashing',() => {
        const div = document.createElement('div');
        ReactDom.render(<BR><TCP><HikeTracksList {...props} /></TCP></BR>, div);
        ReactDom.unmountComponentAtNode(div);
    });

    it('renders UI as expected', () => {
        const loginPage = renderer.create(<BR><TCP><HikeTracksList {...props}/></TCP></BR>);
        expect(loginPage.toJSON()).toMatchSnapshot();
    });
});