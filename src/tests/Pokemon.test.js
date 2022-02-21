import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import { Pokemon } from '../components';
import data from '../data';

let historyNav;

beforeEach(() => {
  const { history } = renderWithRouter(
    <Pokemon pokemon={ data[0] } showDetailsLink isFavorite />,
  );
  historyNav = history;
});

describe('Requisito 6 - testando o Pokemon.js', () => {
  it('O nome correto do Pokémon deve ser mostrado na tela.', () => {
    const pokemonName = screen.getByText('Pikachu');
    expect(pokemonName).toBeInTheDocument();
  });

  it('O tipo correto do pokémon deve ser mostrado na tela.', () => {
    const pokemonType = screen.getByText('Electric');
    expect(pokemonType).toBeInTheDocument();
  });

  it(`O peso médio do pokémon deve ser exibido com um texto no formato 
  Average weight: <value> <measurementUnit>;
    onde <value> e <measurementUnit> são, respectivamente,
   o peso médio do pokémon e sua unidade de medida.`, () => {
    const { averageWeight: { measurementUnit, value } } = data[0];
    const string = `Average weight: ${value} ${measurementUnit}`;
    const peso = screen.getByText(string);
    expect(peso).toBeInTheDocument();
  });

  it(`A imagem do Pokémon deve ser exibida. Ela deve conter um atributo src com a
  URL da imagem e um atributo alt com o texto <name> sprite, 
  onde <name> é o nome do pokémon;`, () => {
    const { image, name } = data[0];
    const imageAltText = `${name} sprite`;
    const imagePokemon = screen.getByAltText(imageAltText);
    expect(imagePokemon).toBeInTheDocument();
    expect(imagePokemon).toHaveAttribute('src', `${image}`);
    expect(imagePokemon.alt).toBe('Pikachu sprite');
  });
});
describe('Teste o componente Pokemon.js', () => {
  it(`Teste se o card do Pokémon indicado na Pokédex contém um link
    de navegação para exibir detalhes deste Pokémon.
    O link deve possuir a URL /pokemons/<id>,
    onde <id> é o id do Pokémon exibido;`, () => {
    const details = screen.getByRole('link', { name: /More details/i });
    const { id } = data[0];
    expect(details.href).toContain(`/pokemons/${id}`);
  });

  // it(`Teste se ao clicar no link de navegação do Pokémon,
  // é feito o redirecionamento da aplicação para a página de detalhes de Pokémon`, () => {
  //   const details = screen.getByRole('link', { name: /More details/i });
  //   userEvent.click(details);
  //   const { pathname } = historyNav.location;
  //   const { id, name } = data[0];
  //   expect(pathname).toBe(`/pokemons/${id}`);
  // });

  it(`Teste também se a URL exibida no navegador muda para /pokemon/<id>,
  onde <id> é o id do Pokémon cujos detalhes se deseja ver`, () => {
    const details = screen.getByRole('link', { name: /More details/i });
    userEvent.click(details);
    const { pathname } = historyNav.location;
    const { id } = data[0];
    expect(pathname).toBe(`/pokemons/${id}`);
  });

  it(`Teste se existe um ícone de estrela nos Pokémons favoritados.
  O ícone deve ser uma imagem com o atributo src 
  contendo o caminho /star-icon.svg`, () => {
    const { name } = data[0];
    const favoritePokemon = screen.getByAltText(`${name} is marked as favorite`);
    expect(favoritePokemon).toHaveAttribute('src', '/star-icon.svg');
    expect(favoritePokemon.alt).toEqual(`${name} is marked as favorite`);
  });
});
