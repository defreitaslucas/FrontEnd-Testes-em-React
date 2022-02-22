import React from 'react';
import { screen } from '@testing-library/react';

import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import { PokemonDetails } from '../components';
import data from '../data';

beforeEach(() => {
  renderWithRouter(
    <PokemonDetails
      pokemons={ data }
      isPokemonFavoriteById
      match={ { params: { id: '25' } } }
      // Essa função é declarada como props, por isso tive que repassar ela aqui com uma arrow function.
      onUpdateFavoritePokemons={ () => {} }
    />,
  );
});

describe(`Requisito 7 - testando o Pokemon.js - 
Teste se as informações detalhadas do Pokémon selecionado são mostradas na tela.`, () => {
  it(`A página deve conter um texto <name> Details,
   onde <name> é o nome do Pokémon.`, () => {
    const { name } = data[0];
    const pokemonDetails = screen.getByText(`${name} Details`);
    expect(pokemonDetails).toBeInTheDocument();
  });
  it(`Não deve existir o link de navegação para os detalhes do Pokémon
  selecionado.`, () => {
    const moreDetails = screen.queryByRole('link', { name: /more details/i });
    expect(moreDetails).not.toBeInTheDocument();
  });
  it('A seção de detalhes deve conter um heading h2 com o texto Summary', () => {
    const summary = screen.getByRole('heading', { name: 'Summary', level: 2 });
    expect(summary).toBeInTheDocument();
  });
  it(`A seção de detalhes deve conter um parágrafo com o resumo do Pokémon 
  específico sendo visualizado.`, () => {
    const resumo = screen.getByText(/This intelligent Pokémon roasts/i);
    expect(resumo).toBeInTheDocument();
  });
});

describe(`Teste se existe na página uma seção com os mapas contendo as 
localizações do pokémon`, () => {
  it(`Na seção de detalhes deverá existir um heading h2 com o texto Game 
  Locations of <name>; onde <name> é o nome do Pokémon exibido`, () => {
    const { name } = data[0];
    const gameLocation = screen
      .getByRole('heading', { name: `Game Locations of ${name}` });
    expect(gameLocation).toBeInTheDocument();
  });
  it('Todas as localizações do Pokémon devem ser mostradas na seção de detalhes', () => {
    const locationPokemon1 = screen.getByText(/Kanto Viridian Forest/i);
    const locationPokemon2 = screen.getByText(/Kanto Power Plant/i);
    expect(locationPokemon1 && locationPokemon2).toBeInTheDocument();
  });
  it(`Devem ser exibidos, o nome da localização e uma imagem do mapa em cada 
  localização`, () => {
    const img = screen.getAllByRole('img', { name: /Pikachu location/i });
    expect(img.length).toEqual(2);
  });
  it('A imagem da localização deve ter um atributo src com a URL da localização', () => {
    const { name } = data[0];
    const locationImg = screen.getAllByAltText(`${name} location`);
    expect(locationImg[0]).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
    expect(locationImg[1]).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');
  });
  it(`A imagem da localização deve ter um atributo alt com o texto <name> location, 
  onde <name> é o nome do Pokémon;`, () => {
    const { name } = data[0];
    const locationAltText = screen.getAllByAltText(`${name} location`);
    locationAltText.map((elemento) => (expect(elemento.alt).toBe('Pikachu location')));
  });
});

describe(`Teste se o usuário pode favoritar um pokémon através da 
página de detalhes.`, () => {
  it('A página deve exibir um checkbox que permite favoritar o Pokémon', () => {
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeInTheDocument();
  });
  it(`Cliques alternados no checkbox devem adicionar e remover respectivamente o 
  Pokémon da lista de favoritos`, async () => {
    const checkbox = screen.getByRole('checkbox', { checked: false });
    userEvent.click(checkbox);
    expect(checkbox.checked).toEqual(true);
    userEvent.click(checkbox);
    expect(checkbox.checked).toEqual(false);
  });
  it('O label do checkbox deve conter o texto Pokémon favoritado?', () => {
    const labelcheckbox = screen.getByText(/Pokémon favoritado?/i);
    expect(labelcheckbox).toBeInTheDocument();
    expect(labelcheckbox).toHaveTextContent('Pokémon favoritado?');
  });
});
