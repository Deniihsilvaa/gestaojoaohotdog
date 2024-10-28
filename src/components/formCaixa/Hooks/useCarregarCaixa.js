import { useState } from 'react';
import { ajaxRequest } from '../../../services/Ajax'; // Certifique-se de importar o ajaxRequest corretamente

const useCarregarCaixa = () => {
    const [carregando, setCarregando] = useState(false);

    const carregardados = (setRegistros,indexID) => {
        setCarregando(true);
        ajaxRequest({
            data: { qualFuncao: "carregarCaixa"},
            onSuccess: function (response) {
                if (Array.isArray(response)) {
                    setRegistros(response.slice()); // Atualiza o estado com os registros de caixa
                    
                } else {
                    console.error("A resposta não contém um array de campos");
                }
            },
            onError: function (error) {
                console.error("Erro na requisição:", error);
            },
            onComplete: () => setCarregando(false) // Oculta o spinner após completar o carregamento
        });
    };

    return { carregardados, carregando };
};

export default useCarregarCaixa;
