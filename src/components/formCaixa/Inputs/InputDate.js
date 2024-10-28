// src/components/formCaixa/Inputs/InputDate.js
import React from 'react';

const InputDate = ({ value, onChange }) => (
    <div className="col-md-4">
        <input
            type="date"
            className="form-control"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Filtrar por Data"
        />
    </div>
);

export default InputDate;
