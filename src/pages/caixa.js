// src/pages/caixa.js
import React, { useState, useEffect } from 'react';
import ModalComponent from '../components/ModalComponent/ModalComponent';
import Spinner from "../components/Spinner/spinner";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import FormRegistros from "../components/formCaixa/Modal/RegistrosModal";
import TabelaDados from '../components/formCaixa/TabelaDados/TabelaDados';
import useCarregarDados from '../components/formCaixa/Hooks/useCarregarCaixa';
import FilterControls from '../components/formCaixa/FilterControls';
import StatsCards from '../components/formCaixa/Card/StatsCards';
import PaginationControls from '../components/formCaixa/PaginationControls';
import Alerta from '../components/Alert/Alerta';
function Caixa() {
    const [registros, setRegistros] = useState([]);
    const [stats, setStats] = useState({}); // Estado para estatísticas
    const [filtroData, setFiltroData] = useState('');
    const [filtroTipo, setFiltroTipo] = useState('');
    const [pesquisa, setPesquisa] = useState('');
    const [pagina, setPagina] = useState(1);
    const [carregando, setCarregando] = useState(false);
    const { carregardados } = useCarregarDados();
    const [alerta, setAlerta] = useState({ mensagem: '', tipo: '' });
    useEffect(() => {
        carregardados(setRegistros);
    }, []);
    

    const updateData = () => {

        carregardados(setRegistros);
        // Atualiza o estado de alerta
        
    };
    

    const atualizarStats = () => {
        const totalEntrada = calcularTotal('Entrada');
        const totalSaida = calcularTotal('Saída');   
        // Atualiza as estatísticas
        setStats({
            totalEntrada,
            totalSaida,
            diferenca: totalEntrada - totalSaida,
        });
    };
    

    useEffect(() => {
        atualizarStats(); // Atualiza as estatísticas quando os registros mudam
    }, []);

    const filtrarRegistros = () => {
        return registros.filter((registro) => {
            const dataMatch = filtroData ? registro.data === filtroData : true;
            const tipoMatch = filtroTipo ? registro.tipo === filtroTipo : true;
            const pesquisaMatch = pesquisa ? registro.descricao.toLowerCase().includes(pesquisa.toLowerCase()) : true;
            return dataMatch && tipoMatch && pesquisaMatch;
        }).slice((pagina - 1) * 10, pagina * 10);
    };

    const calcularTotal = (tipo) => registros.filter(registro => registro.tipo === tipo).reduce((total, registro) => total + registro.valor, 0);

    return (
        <div className="container mt-5">
            {/* Spinner deve ser exibido apenas quando estiver carregando */}
            <Spinner show={carregando} />
    
            {/* Exibe o alerta apenas se houver uma mensagem */}
            {alerta.mensagem && (
                <Alerta mensagem={alerta.mensagem} tipo={alerta.tipo}/>
            )}
    
            <div className="d-flex justify-content-between mb-3">
                <h2>Registros de Caixa</h2>
                <ModalComponent
                    title="Registros Financeiros"
                    body={<FormRegistros updateData={updateData} />}
                    footer={<div className="d-flex justify-content-end"><h6>Denilson Silva</h6></div>}
                    id="createRecordModal"
                    onHide={() => console.log('fechando modal')}
                >
                    Novo Registro
                </ModalComponent>
            </div>
    
            <StatsCards 
                totalEntrada={calcularTotal('Entrada')} // Passando totalEntrada
                totalSaida={calcularTotal('Saída')} // Passando totalSaida
                diferenca={calcularTotal('Entrada') - calcularTotal('Saída')} // Passando a diferença
            />
    
            <FilterControls
                filtroData={filtroData}
                setFiltroData={setFiltroData}
                filtroTipo={filtroTipo}
                setFiltroTipo={setFiltroTipo}
                pesquisa={pesquisa}
                setPesquisa={setPesquisa}
            />
    
            <TabelaDados 
                registros={filtrarRegistros()} 
                updateStats={updateData} // Passando a função para atualizar estatísticas
            />
    
            <PaginationControls 
                pagina={pagina}
                setPagina={setPagina}
                filtrarRegistros={filtrarRegistros}
            />
        </div>
    );
    
}

export default Caixa;
