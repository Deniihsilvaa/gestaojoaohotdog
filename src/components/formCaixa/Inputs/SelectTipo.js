// src/components/formCaixa/Inputs/SelectTipo.js
import React from 'react';

const SelectTipo = ({ value, onChange }) => (
    <div className="col-md-4">
        <select
            className="form-control"
            value={value}
            onChange={(e) => onChange(e.target.value)}
        >
            <option value="">Todos os Tipos</option>
            <option value="Entrada">Entrada</option>
            <option value="Saída">Saída</option>
        </select>
    </div>
);

export default SelectTipo;
