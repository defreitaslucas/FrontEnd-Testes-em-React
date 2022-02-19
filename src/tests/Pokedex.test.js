import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import data from '../data';

const MAGIC_NUMBER = 148;

describe('Requisito 5 - testando o Pokedex.js', () => {
  it('Teste se página contém um heading `h2` com o texto `Encountered pokémons`', () => {
    renderWithRouter(<App />);
    const pokedexH2El = screen.getByRole('heading', { name: 'Encountered pokémons',
      level: 2 });
    expect(pokedexH2El).toBeInTheDocument();
  });

  it(`Teste se é exibido o próximo Pokémon da lista quando o
  botão 'Próximo pokémon' é clicado.`, () => {
    renderWithRouter(<App />);
    const buttonProxEl = screen.getByRole('button', { name: 'Próximo pokémon' });
    expect(buttonProxEl).toBeInTheDocument();
    data.forEach((element) => {
      const pokemonName = screen.getByTestId('pokemon-name');
      if (element.name === pokemonName) {
        expect(pokemonName).toBeInTheDocument();
        if (element.id === MAGIC_NUMBER) {
          userEvent.click(buttonProxEl);
          expect(pokemonName).toBe('Pikachu');
        } else {
          userEvent.click(buttonProxEl);
        }
      }
    });
  });
  it('Teste se é mostrado apenas um Pokémon por vez.', () => {
    renderWithRouter(<App />);
    const buttonProxEl = screen.getByRole('button', { name: 'Próximo pokémon' });
    userEvent.click(buttonProxEl);

    const imgPokemonEl = screen.getAllByRole('img');
    expect(imgPokemonEl).toHaveLength(1);
  });

  it('Teste se a Pokédex tem os botões de filtro', () => {
    renderWithRouter(<App />);
    const typePokemons = ['Electric',
      'Fire',
      'Bug',
      'Poison',
      'Psychic',
      'Normal',
      'Dragon'];
    typePokemons.forEach((type) => {
      const typeButton = screen.getByRole('button', { name: type });
      expect(typeButton).toBeInTheDocument();
      userEvent.click(typeButton);
      const pokemonTypeScreen = screen.getByTestId('pokemon-type');
      userEvent.click(pokemonTypeScreen);
      expect(pokemonTypeScreen).toHaveTextContent(type);
    });
    const buttonAll = screen.getByRole('button', { name: 'All' });
    expect(buttonAll).toBeVisible();
  });

  it('Teste se a Pokédex contém um botão para resetar o filtro', () => {
    renderWithRouter(<App />);
    const buttonAll = screen.getByRole('button', { name: 'All' });
    expect(buttonAll).toHaveTextContent('All');

    userEvent.click(buttonAll);
    data.forEach((element) => {
      const pokemonName = screen.getByTestId('pokemon-name');
      const buttonNext = screen.getByRole('button', { name: 'Próximo pokémon' });
      expect(pokemonName).toHaveTextContent(element.name);
      userEvent.click(buttonNext);
    });
  });

  it('Ao carregar a página, o filtro selecionado deverá ser `All`', () => {
    renderWithRouter(<App />);
    const pokemon = screen.getByTestId('pokemon-name');
    expect(pokemon).toHaveTextContent('Pikachu');
    const buttonNext = screen.getByRole('button', { name: 'Próximo pokémon' });
    userEvent.click(buttonNext);
    expect(pokemon).toHaveTextContent('Charmander');
    userEvent.click(buttonNext);
    expect(pokemon).toHaveTextContent('Caterpie');
  });
});
