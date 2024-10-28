// src/hooks/editarDados.js
import { useState } from 'react';
import { ajaxRequest } from '../../../services/Ajax'; // Certifique-se de importar o ajaxRequest corretamente

const useEditarDados = () => {
    const [carregando, setCarregando] = useState(false); // Estado para controlar carregamento
    const [mensagem, setMensagem] = useState(''); // Estado para armazenar a mensagem de sucesso ou erro

    const editandoDados = async (indexID) => {
        setCarregando(true); // Inicia o carregamento

        try {
            const response = await ajaxRequest({
                data: { qualFuncao: "editarCaixa", dados: "Saída", id: indexID || "" },
            });

            // Verifica se a operação foi bem-sucedida
            if (response.situacao) {
                setMensagem("Dados atualizados com sucesso!");
            } else {
                setMensagem(`Erro: ${response.mensagem}`);
            }
        } catch (error) {
            console.error("Erro na requisição:", error);
            setMensagem("Ocorreu um erro ao tentar editar os dados.");
        } finally {
            setCarregando(false); // Finaliza o carregamento
        }
    };

    return { editandoDados, carregando, mensagem };
};

export default useEditarDados;
