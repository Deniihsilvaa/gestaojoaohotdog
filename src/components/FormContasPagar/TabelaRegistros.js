import React, { useState, useEffect } from 'react';
import DataTable from 'datatables.net-react';
import DT from 'datatables.net-dt';
import Alerta from '../Alert/Alerta';
import { formatarParaReal } from '../../utils/formatacao';
import useExcluirDados from '../FormContasPagar/Hooks/useEcluirDados';

DataTable.use(DT);

function TabelaRegistros({ registros,updateDatas }) {
    const [carregando, setCarregando] = useState(false);
    const { excluirDados } = useExcluirDados(); // Hook de exclusão
    const [alerta, setAlerta] = useState({ mensagem: "", tipo: "" });

    const carregardados = () => {
        setCarregando(true); // Mostra o spinner ao iniciar o carregamento

        // Simulação de carregamento de dados
        setTimeout(() => {
            setCarregando(false); // Dados carregados
        }, 1000);
    };

    const editarRegistro = (id) => {
        console.log('Editando registro', id);
    };

    const excluirRegistro = async (id) => {
        if (window.confirm('Tem certeza que deseja excluir este registro?')) {
            try {
                setCarregando(true); // Inicia o spinner de carregamento
                const response = await excluirDados({ id: id }); // Aguarda a execução da exclusão e captura o retorno

                // Verifica se a operação foi bem-sucedida
                if (response.situacao) {
                    setAlerta({ mensagem: response.mensagem, tipo: "success" });
                    carregardados();
                    updateDatas() // Recarrega os dados após a exclusão
                } else {
                    setAlerta({ mensagem: response.mensagem || "Erro ao excluir registro.", tipo: "danger" });
                }
            } catch (error) {
                console.error('Erro ao excluir registro:', error);
                setAlerta({ mensagem: "Erro ao excluir registro, tente novamente.", tipo: "danger" });
            } finally {
                setCarregando(false); // Sempre finaliza com o spinner desligado
            }
        }
    };

    useEffect(() => {
        carregardados();
    }, [registros]);

    useEffect(() => {
        if (alerta.mensagem) {
            const timer = setTimeout(() => {
                setAlerta({ mensagem: "", tipo: "" }); // Limpa o alerta após 3 segundos
            }, 3000);
            return () => clearTimeout(timer); // Limpa o timer se o componente for desmontado
        }
    }, [alerta.mensagem]);

    return (
        <div className="card row">
            {carregando && <Alerta mensagem="Carregando dados..." tipo="info" />}
            {alerta.mensagem && <Alerta mensagem={alerta.mensagem} tipo={alerta.tipo} />} {/* Exibe o alerta */}
            {!carregando && registros.length > 0 && (
                <DataTable
                    className="table table-hover table-bordered text-center"
                    options={{
                        destroy: true,
                        paging: true,
                        searching: true,
                        select: true,
                        ordering: true,
                        order: [[0, 'desc']],
                        lengthChange: true,
                        pageLength: 10,
                        lengthMenu: [[10, 25, 50, -1], [10, 25, 50, "All"]],
                        info: true,
                        columnDefs: [
                            { targets: 0, visible: true, orderable: true },
                            { targets: 1, orderable: false },
                            { targets: 2, orderable: false },
                            { targets: 3, orderable: true },
                            { targets: 4, orderable: true },
                            { targets: 5, orderable: false },
                            { targets: 6, orderable: false },
                            { targets: 7, orderable: true },
                            { targets: 8, orderable: false },
                        ],
                        responsive: true,
                        dom: 'Bfrtip',
                        buttons: ['copy', 'csv', 'excel']
                    }}
                >
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Descrição</th>
                            <th>Valor</th>
                            <th>Tipo de Custo</th>
                            <th>Data</th>
                            <th>Tipo</th>
                            <th>Situação</th>
                            <th>Data Registro</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {registros.map((registro) => (
                            <tr
                                key={registro.id}
                                className={registro.tipo === 'Entrada' ? 'table-primary' : 'table-danger'}
                            >
                                <td>{registro.id}</td>
                                <td>{registro.descricao}</td>
                                <td>{formatarParaReal(registro.valor)}</td>
                                <td>{registro.tipoDeCusto}</td>
                                <td>{registro.data}</td>
                                <td>{registro.tipo}</td>
                                <td>{registro.situacao}</td>
                                <td>{registro.dataRegistro}</td>
                                <td>
                                    <button className="btn btn-warning btn-sm me-2" onClick={() => editarRegistro(registro.id)}>Editar</button>
                                    <button className="btn btn-danger btn-sm" onClick={() => excluirRegistro(registro.id)}>Excluir</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </DataTable>
            )}
        </div>
    );
}

export default TabelaRegistros;
