import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import pokemonReducer from './components/store/slices/pokemonSlice';
import App from './App';

jest.mock('./components/hints/hints', () => () => []);

beforeEach(() => { window.scrollTo = jest.fn(); });

test('starts with the calculator heading and search controls', () => {
  const store = configureStore({ reducer: { pokemon: pokemonReducer } });
  render(<Provider store={store}><App /></Provider>);
  expect(screen.getByRole('heading', { name: /welcome to pokemon react calculator/i })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /search/i })).toBeInTheDocument();
});
