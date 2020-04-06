import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Classic from './Classic';
import Standout from './Standout';
import Premium from './Premium';


describe('App', () => {
	it('renders without crashing', () => {
	  const div = document.createElement('div');
	  ReactDOM.render(<App />, div);
	});
});

describe('classic ads ', () => {
	it('renders without crashing', () => {
	  const div = document.createElement('div');
	  ReactDOM.render(<Classic />, div);
	});
});
describe('Standout ads ', () => {
	it('renders without crashing', () => {
	  const div = document.createElement('div');
	  ReactDOM.render(<Standout selected={true} onStandout={function(c, n){}} />, div);
	});
});

it('Premium ads selected props true', () => {
	const tree = <Premium selected={true} onPremium={function(){}} />;
	expect(tree).toMatchSnapshot();
	expect(tree.props.selected).toEqual(true);
});


