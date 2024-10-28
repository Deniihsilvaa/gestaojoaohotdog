import React, { useState, useEffect } from 'react';
import FormRegistrosCotasPagar from '../components/FormContasPagar/contasapagar';
import TabelaRegistros from '../components/FormContasPagar/TabelaRegistros';
import useCarregarDados from '../components/FormContasPagar/Hooks/useCarregarDados'; // Importação corrigida

function ContasAPagar() {
    const [registros, setRegistros] = useState([]); 
    const { carregardados, carregando } = useCarregarDados(); 
    
    // Efeito para carregar os registros ao montar o componente
    useEffect(() => {
        carregardados(setRegistros); // Passando a função setRegistros
    }, []);


    const updateData = () => {
        console.log('Atualizando dados...');
        carregardados(setRegistros) // Passando a função setRegistros;

    };

    return ( //retorno do ContasAPagar
        <div className='card'>
            <h1 className='card-header'>Contas a Pagar</h1>
            <div className='card-body'>
                {carregando && <p>Carregando dados...</p>} {/* Exibindo mensagem de carregamento */}
                <div className='card row'>
                    <FormRegistrosCotasPagar setRegistros={registros} updateData={updateData}/>
                </div>
                <TabelaRegistros registros={registros}  />
            </div>
        </div>
    );
}

export default ContasAPagar;
