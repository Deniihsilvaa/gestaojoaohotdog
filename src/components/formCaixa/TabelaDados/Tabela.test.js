// Tabela.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Tabela from './TabelaDados'; // Ajuste o caminho conforme necessário
import useExcluirDados from '../../FormContasPagar/Hooks/useEcluirDados';

// Mock da função useExcluirDados
jest.mock('../../FormContasPagar/Hooks/useEcluirDados', () => jest.fn());

describe('Tabela Component', () => {
    const registrosMock = [
        { id: 1, descricao: 'Teste 1', valor: 100, tipoDeCusto: 'Custo 1', data: '2023-01-01', tipo: 'Entrada', situacao: 'Ativo', dataRegistro: '2023-01-01' },
        { id: 2, descricao: 'Teste 2', valor: 200, tipoDeCusto: 'Custo 2', data: '2023-01-02', tipo: 'Saída', situacao: 'Ativo', dataRegistro: '2023-01-02' }
    ];

    beforeEach(() => {
        useExcluirDados.mockReturnValue([jest.fn()]); // Mock do hook
    });

    test('deve renderizar a tabela com registros', () => {
        render(<Tabela registros={registrosMock} updateDatas={jest.fn()} />);

        // Verificando se os registros estão renderizados
        expect(screen.getByText('Teste 1')).toBeInTheDocument();
        expect(screen.getByText('Teste 2')).toBeInTheDocument();
    });

    test('deve chamar a função de exclusão ao clicar no botão de excluir', async () => {
        const excluirMock = jest.fn();
        useExcluirDados.mockReturnValue([excluirMock]);

        render(<Tabela registros={registrosMock} updateDatas={jest.fn()} />);

        const botaoExcluir = screen.getAllByRole('button', { name: /x/i })[0]; // Botão de excluir do primeiro registro
        window.confirm = jest.fn(() => true); // Simulando a confirmação do usuário

        fireEvent.click(botaoExcluir);

        expect(excluirMock).toHaveBeenCalledWith({ id: 1 });
    });

    test('deve mostrar mensagem de alerta ao excluir registro com sucesso', async () => {
        const excluirMock = jest.fn(() => Promise.resolve({ situacao: true, mensagem: 'Registro excluído com sucesso.' }));
        useExcluirDados.mockReturnValue([excluirMock]);

        render(<Tabela registros={registrosMock} updateDatas={jest.fn()} />);

        const botaoExcluir = screen.getAllByRole('button', { name: /x/i })[0];
        window.confirm = jest.fn(() => true);

        fireEvent.click(botaoExcluir);

        expect(await screen.findByText('Registro excluído com sucesso.')).toBeInTheDocument();
    });

    test('deve mostrar mensagem de erro ao tentar excluir registro', async () => {
        const excluirMock = jest.fn(() => Promise.resolve({ situacao: false, mensagem: 'Erro ao excluir registro.' }));
        useExcluirDados.mockReturnValue([excluirMock]);

        render(<Tabela registros={registrosMock} updateDatas={jest.fn()} />);

        const botaoExcluir = screen.getAllByRole('button', { name: /x/i })[0];
        window.confirm = jest.fn(() => true);

        fireEvent.click(botaoExcluir);

        expect(await screen.findByText('Erro ao excluir registro.')).toBeInTheDocument();
    });
});
