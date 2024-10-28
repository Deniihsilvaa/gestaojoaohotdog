// src/hooks/useDeletedate.js
import { useState } from 'react';
import { ajaxRequest } from '../../../services/Ajax'; // Certifique-se de importar o ajaxRequest corretamente

const useDeletedate = () => {
    const [carregando, setCarregando] = useState(false); // Estado para controlar carregamento
    const [mensagem, setMensagem] = useState(''); // Estado para armazenar a mensagem de sucesso ou erro

    // Função para excluir dados
    const excluirDados = async (indexID) => {
        setCarregando(true); // Inicia o carregamento
        setMensagem(''); // Reseta a mensagem anterior
        const dadosID = JSON.stringify(indexID);
        
        try {
            const response = await ajaxRequest({
                data: { qualFuncao: "excluirRegistroPorId", id: dadosID },
            });

            // Retorne a resposta para que o componente que usa o hook possa acessar
            return response;
        } catch (error) {
            console.error("Erro ao excluir dados:", error);
            setMensagem("Ocorreu um erro ao tentar excluir os dados.");
            return { situacao: false, mensagem: "Erro ao excluir dados." }; // Retorne um objeto de erro
        } finally {
            setCarregando(false); // Finaliza o carregamento
        }
    };

    return { excluirDados, carregando, mensagem };
};

export default useDeletedate;
