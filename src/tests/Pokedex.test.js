import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import data from '../data';

const MAGIC_NUMBER = 148;
let buttonNextPokemon;
let pokemonName;
beforeEach(() => {
  renderWithRouter(<App />);
  buttonNextPokemon = screen.getByRole('button', { name: /Próximo pokémon/i });
  pokemonName = screen.getByTestId('pokemon-name');
});

describe('Requisito 5 - testando o Pokedex.js', () => {
  it('Teste se página contém um heading `h2` com o texto `Encountered pokémons`', () => {
    const pokedexH2El = screen.getByRole('heading', { name: 'Encountered pokémons',
      level: 2 });
    expect(pokedexH2El).toBeInTheDocument();
  });
  it(`Teste se é exibido o próximo Pokémon da lista
  quando o botão 'Próximo pokémon' é clicado`, () => {
    userEvent.click(buttonNextPokemon);
    expect(screen.getByText('Charmander')).toBeInTheDocument();
  });
  it('O botão deve conter o texto "Próximo pokémon"', () => {
    expect(buttonNextPokemon).toHaveTextContent('Próximo pokémon');
  });
  it(`Os próximos Pokémons da lista devem ser mostrados,
  um a um, ao clicar sucessivamente no botão.`, () => {
    data.forEach((element) => {
      if (element.name === pokemonName) {
        expect(pokemonName).toBeInTheDocument();
        if (element.id === MAGIC_NUMBER) {
          userEvent.click(buttonNextPokemon);
          expect(pokemonName).toBe('Pikachu');
        } else {
          userEvent.click(buttonNextPokemon);
        }
      }
    });
  });
});
describe('Requisito 5 - testando o Pokedex.js', () => {
  it('Teste se é mostrado apenas um Pokémon por vez.', () => {
    userEvent.click(buttonNextPokemon);
    const imgPokemonEl = screen.getAllByRole('img');
    expect(imgPokemonEl).toHaveLength(1);
  });
  it('Teste se a Pokédex tem os botões de filtro', () => {
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
    const buttonAll = screen.getByRole('button', { name: 'All' });
    expect(buttonAll).toHaveTextContent('All');
    userEvent.click(buttonAll);
    data.forEach((element) => {
      expect(pokemonName).toHaveTextContent(element.name);
      userEvent.click(buttonNextPokemon);
    });
  });
  it('Ao carregar a página, o filtro selecionado deverá ser `All`', () => {
    expect(pokemonName).toHaveTextContent('Pikachu');
    userEvent.click(buttonNextPokemon);
    expect(pokemonName).toHaveTextContent('Charmander');
    userEvent.click(buttonNextPokemon);
    expect(pokemonName).toHaveTextContent('Caterpie');
  });
  it('Recupera todos os tests id e verifica quantos existem - stryker', () => {
    const buttons = screen.getAllByTestId('pokemon-type-button');
    const testId = 7;
    expect(buttons.length).toEqual(testId);
  });
});
