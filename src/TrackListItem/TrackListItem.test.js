import React from 'react';
import ReactDom from 'react-dom';
import renderer from 'react-test-renderer';
import TrackListItem from './TrackListItem';
import {BrowserRouter as BR} from 'react-router-dom';

describe('TrackListItem component', () => {
    const props = {
        name: 'chair',
        sanskrit: 'utkatasana',
        img: '',
        location: {pathname: '/'},
        history: {push : '/'}
    };

    it('renders without crashing', () => {
         const div = document.createElement('div');
         ReactDom.render(<BR><TrackListItem {...props} /></BR>, div);
         ReactDom.unmountComponentAtNode(div);
    });

    it('renders UI as expected', () => {
        const item = renderer.create(<BR><TrackListItem {...props}/></BR>)
        expect(item.toJSON()).toMatchSnapshot();
    });
});
