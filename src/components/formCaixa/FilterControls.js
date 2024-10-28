// src/components/caixa/FilterControls.js
import React from 'react';
import InputDate from '../formCaixa/Inputs/InputDate';
import SelectTipo from '../formCaixa/Inputs/SelectTipo';
import InputPesquisa from '../formCaixa/Inputs/InputPesquisa';

function FilterControls({ filtroData, setFiltroData, filtroTipo, setFiltroTipo, pesquisa, setPesquisa }) {
    return (
        <div className="row mb-3">
            <InputDate value={filtroData} onChange={setFiltroData} />
            <SelectTipo value={filtroTipo} onChange={setFiltroTipo} />
            <InputPesquisa value={pesquisa} onChange={setPesquisa} />
        </div>
    );
}

export default FilterControls;
