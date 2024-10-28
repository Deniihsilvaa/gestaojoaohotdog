// src/components/caixa/PaginationControls.js
import React from 'react';

function PaginationControls({ pagina, setPagina, filtrarRegistros }) {
    return (
        <div className="d-flex justify-content-between">
            <button className="btn btn-secondary" onClick={() => setPagina(prev => Math.max(prev - 1, 1))} disabled={pagina === 1}>
                Anterior
            </button>
            <span>Página {pagina}</span>
            <button className="btn btn-secondary" onClick={() => setPagina(prev => prev + 1)} disabled={filtrarRegistros().length < 10}>
                Próxima
            </button>
        </div>
    );
}

export default PaginationControls;
