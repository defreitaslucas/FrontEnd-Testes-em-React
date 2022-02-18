import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import { About } from '../components';

describe('Requisito 2 - testando o About.js', () => {
  it('Teste se a página contém as informações sobre a Pokédex.', () => {
    renderWithRouter(<About />);
    const aboutEl = screen.getByRole('heading', { name: /about pokédex/i });
    expect(aboutEl).toBeInTheDocument();
  });

  it('Teste se a página contém um heading `h2` com o texto `About Pokédex`.', () => {
    renderWithRouter(<About />);
    const aboutEl = screen.getByRole('heading', { name: /about pokédex/i, level: 2 });
    expect(aboutEl).toBeInTheDocument();
  });

  it('Teste se a página contém dois parágrafos com texto sobre a Pokédex.', () => {
    renderWithRouter(<About />);
    const primeiroP = screen.getByText(/This application simulates a Pokédex/i);
    const segundoP = screen.getByText(/One can filter Pokémons by type/i);
    expect(primeiroP && segundoP).toBeInTheDocument();
  });

  it('Teste se a página contém a seguinte imagem de uma Pokédex', () => {
    renderWithRouter(<About />);
    const imgEl = screen.getByAltText('Pokédex');
    expect(imgEl).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
