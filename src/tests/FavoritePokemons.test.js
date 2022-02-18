import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import { FavoritePokemons } from '../components';
import App from '../App';

describe('Requisito 3 - testando o FavoritePokemons.js', () => {
  it(`Teste se é exibido na tela a mensagem 'No favorite pokemon found',
  se a pessoa não tiver pokémons favoritos.`, () => {
    renderWithRouter(<FavoritePokemons />);
    const pEl = screen.getByText('No favorite pokemon found');
    expect(pEl).toBeInTheDocument();
  });
  it('Teste se é exibido todos os cards de pokémons favoritados.', () => {
    renderWithRouter(<App />);
    const moreDetailsEl = screen.getByRole('link', { name: 'More details' });
    userEvent.click(moreDetailsEl);

    const checkBoxEl = screen.getByRole('checkbox', { name: 'Pokémon favoritado?' });
    userEvent.click(checkBoxEl);

    const favoriteEl = screen.getByRole('link', { name: 'Favorite Pokémons' });
    userEvent.click(favoriteEl);

    const imgEl = screen.getAllByRole('img');
    console.log(imgEl);
    expect(imgEl).toHaveLength(2);
  });
});
