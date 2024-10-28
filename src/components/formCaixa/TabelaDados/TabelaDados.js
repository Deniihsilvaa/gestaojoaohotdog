// src/components/formCaixa/TabelaDados/TabelaDados.js
import React, { useState, useEffect } from 'react';
import DataTable from 'datatables.net-react';
import DT from 'datatables.net-dt';
import LinhaTabela from '././LinhaTabela'; // Importando o novo componente

DataTable.use(DT);

function Tabela({ registros: initialRegistros, updateStats }) {
    const [registros, setRegistros] = useState(initialRegistros); // Estado para os registros
    const [carregando, setCarregando] = useState(true); // Inicializa como true

    const atualizarRegistros = (id) => {
        setRegistros((prevRegistros) => {
            const novosRegistros = prevRegistros.filter(registro => registro.id !== id);
            updateStats(); // Atualiza as estatísticas
            return novosRegistros;
        });
    };

    useEffect(() => {
        setRegistros(initialRegistros); // Atualiza registros quando os props mudam
    }, [initialRegistros]);

    useEffect(() => {
        setCarregando(initialRegistros.length === 0); // Carregando se não há registros
    }, [initialRegistros]);

    return (
        <div className="table-responsive-md">
            {carregando ? (
                <p>Carregando dados...</p>
            ) : registros.length > 0 ? (
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
                        lengthMenu: [[10, 25, 50, -1], [10, 25, 50, "Todos"]],
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
                        buttons: ['copy', 'csv', 'excel'],
                        search: { caseInsensitive: true },
                        select: { style: 'multi' },
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
                            <LinhaTabela 
                                key={registro.id} 
                                registro={registro}
                                updateDatas={atualizarRegistros} // Atualiza registros
                                updateStats={updateStats} // Passando também para LinhaTabela se necessário
                                
                            />
                        ))}
                    </tbody>
                </DataTable>
            ) : (
                <p>Nenhum registro encontrado.</p>
            )}
        </div>
    );
}

export default Tabela;
