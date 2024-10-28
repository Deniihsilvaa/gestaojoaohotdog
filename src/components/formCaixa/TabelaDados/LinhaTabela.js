// src/components/formCaixa/TabelaDados/LinhaTabela.js
import React from 'react';
import { formatarParaReal } from '../../../utils/formatacao';
import useExcluirDados from '../../formCaixa/Hooks/useDeletedate'; // Verifique o caminho do import

const LinhaTabela = ({ registro, updateDatas }) => { // Adicione updateDatas como prop
    const { excluirDados } = useExcluirDados(); // Use o nome correto da função aqui
    const [carregando, setCarregando] = React.useState(false);

    const excluirRegistro = async (id) => {
        if (window.confirm('Tem certeza que deseja excluir este registro?')) {
            try {
                setCarregando(true); // Inicia o spinner de carregamento
                const response = await excluirDados({ id }); // Chame a função correta

                // Verifica se a operação foi bem-sucedida
                if (response.situacao) {
                    updateDatas(id); // Chame a função para atualizar os registros
                    console.log('Registro excluído com sucesso:', response.mensagem);
                } else {
                    // Realizar ações em caso de falha na exclusão
                    console.error('Falha ao excluir registro:', response.mensagem);
                }
            } catch (error) {
                console.error('Erro ao excluir registro:', error);
            } finally {
                setCarregando(false); // Sempre finaliza com o spinner desligado
            }
        }
    };

    return (
        <tr key={registro.id} className={registro.tipo === 'Entrada' ? 'table-primary' : 'table-danger'}>
            <td>{registro.id}</td>
            <td>{registro.descricao}</td>
            <td>{formatarParaReal(registro.valor)}</td>
            <td>{registro.tipoDeCusto}</td>
            <td>{registro.data}</td>
            <td>{registro.tipo}</td>
            <td>{registro.situacao}</td>
            <td>{registro.dataRegistro}</td>
            <td>
                <button className="btn btn-warning btn-sm me-2" onClick={() => console.log(`Editando registro ${registro.id}`)}>
                    <i className="bi bi-pencil"></i>
                </button>
                <button className="btn btn-danger btn-sm" onClick={() => excluirRegistro(registro.id)}>
                    <i className="bi bi-x"></i>
                </button>
            </td>
        </tr>
    );
};

export default LinhaTabela;
