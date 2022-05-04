import React from 'react';
import CreateSpaceForm from '../CreateSpaceForm';
import { render, cleanup } from '@testing-library/react';
import { screen } from '@testing-library/dom';
import '@testing-library/jest-dom/extend-expect';
// import { create } from 'lodash';
// import renderer from 'react-test-renderer';


describe ('Testing CreateSpaceFrom component', () => {
  afterEach(cleanup);
  // test('Renders correctly', () => {
  //   const tree = renderer.create(<CreateSpaceForm />).toJSON();
  //   expect(tree).toMatchSnapshot();
  // })
  // test('testing123', ()=> {
  //   (1+1).shouldEqual(2);
  // })
  test('there is a create button', () => {
    const createButton = screen.getByRole('button',{name: /create/i});
    expect(createButton).toBe(expect.anything());
  })
})
