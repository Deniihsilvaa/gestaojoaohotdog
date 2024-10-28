// src/components/formCaixa/Inputs/InputPesquisa.js
import React from 'react';

const InputPesquisa = ({ value, onChange }) => (
    <div className="col-md-4">
        <input
            type="text"
            className="form-control"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Pesquisar por Descrição"
        />
    </div>
);

export default InputPesquisa;
