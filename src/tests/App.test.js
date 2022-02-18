import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Requisito 1 - testando o App.js', () => {
  it('Teste se o topo da aplicação contém um conjunto fixo de links de navegação', () => {
    renderWithRouter(<App />);

    const homeEl = screen.getByRole('link', { name: /home/i });
    expect(homeEl).toBeInTheDocument();

    const aboutEl = screen.getByRole('link', { name: /about/i });
    expect(aboutEl).toBeInTheDocument();

    const favoriteEl = screen.getByRole('link', { name: /Favorite Pokémons/i });
    expect(favoriteEl).toBeInTheDocument();
  });

  it(`Teste se a aplicação é redirecionada para a página inicial,
   na URL '/' ao clicar no link 'Home' da barra de navegação.`, () => {
    const { history } = renderWithRouter(<App />);

    const homeEl = screen.getByRole('link', { name: /home/i });
    userEvent.click(homeEl);

    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });

  it(`Teste se a aplicação é redirecionada para a página de 'About',
   na URL '/about', ao clicar no link 'About' da barra de navegação.`, () => {
    const { history } = renderWithRouter(<App />);

    const aboutEl = screen.getByRole('link', { name: /about/i });
    userEvent.click(aboutEl);

    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });

  it(`Teste se a aplicação é redirecionada para a página de 'Pokémons Favoritados',
   na URL '/favorites', ao clicar no link 'Favorite Pokémons' 
   da barra de navegação.`, () => {
    const { history } = renderWithRouter(<App />);

    const favoriteEl = screen.getByRole('link', { name: /Favorite Pokémons/i });
    userEvent.click(favoriteEl);

    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
  });

  it(`Teste se a aplicação é redirecionada para a página 'Not Found' ao
   entrar em uma URL desconhecida.`, () => {
    const { history } = renderWithRouter(<App />);

    history.push('/xablau');

    const notFoundEl = screen.getByRole('heading', { name: /Page requested not found/i },
      { level: 2 });
    expect(notFoundEl).toBeInTheDocument();
  });
});
