import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import { NotFound } from '../components';

describe('Requisito 4 - testando o NotFound.js', () => {
  it(`Teste se página contém um heading 'h2' com o texto
  'Page requested not found 😭'.`, () => {
    renderWithRouter(<NotFound />);
    const notFoundH2 = screen.getByRole('heading', { name: /Page requested not found/i },
      { level: 2 });
    expect(notFoundH2).toBeInTheDocument();
  });

  it('Teste se página mostra a imagem', () => {
    renderWithRouter(<NotFound />);
    const imgNotFoundEl = screen
      .getByAltText(/Pikachu crying because the page requested was not found/i);
    expect(imgNotFoundEl).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
