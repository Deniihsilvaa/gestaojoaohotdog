// src/components/formCaixa/CarregarCaixa.js
import React, { useState, useEffect } from "react";
import { ajaxRequest } from "../../services/Ajax";

const CarregarCaixa = ({ setRegistros, setCarregando }) => {
    

    useEffect(() => {
        carregarCaixa(); // Chama a função para carregar os dados ao montar o componente
    }, []);

    const carregarCaixa = () => {
        setCarregando(true); // Mostra o spinner ao iniciar o carregamento
        ajaxRequest({
            data: { qualFuncao: "carregarCaixa" },
            onSuccess: function (response) {
                if (Array.isArray(response)) {
                    setRegistros(response.slice()); // Atualiza o estado com os registros de caixa
                } else {
                    console.error("A resposta não contém um array de campos", response);
                }
            },
            onError: function (error) {
                console.error("Erro na requisição:", error);
            },
            onComplete: () => setCarregando(false) // Oculta o spinner após completar o carregamento
        });
    };

    return null; // Não renderiza nada, apenas faz a chamada da função
};

export default CarregarCaixa;
