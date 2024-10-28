// src/components/caixa/__tests__/PaginationControls.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import PaginationControls from '../PaginationControls';

test('Renderiza corretamente os controles de paginação', () => {
    const setPagina = jest.fn();
    const filtrarRegistros = () => Array(10).fill({});

    render(
        <PaginationControls 
            pagina={1} 
            setPagina={setPagina} 
            filtrarRegistros={filtrarRegistros}
        />
    );

    // Verifica se os botões de navegação estão presentes
    expect(screen.getByText(/Anterior/i)).toBeInTheDocument();
    expect(screen.getByText(/Próxima/i)).toBeInTheDocument();

    // Simula clique no botão "Próxima"
    fireEvent.click(screen.getByText(/Próxima/i));
    expect(setPagina).toHaveBeenCalledWith(2);

    // Simula clique no botão "Anterior" e verifica se não é chamado
    fireEvent.click(screen.getByText(/Anterior/i));
    expect(setPagina).toHaveBeenCalledWith(1);
});
