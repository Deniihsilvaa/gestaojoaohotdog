// src/components/formCaixa/StatsCards.js
import React from 'react';
import { formatarParaReal } from "../../../utils/formatacao";
function StatsCards({ totalEntrada, totalSaida, diferenca }) {
    const classStyle = diferenca > 0 ? 'text-success' : 'text-danger';
    const classStyleCard = '#72BEFC';
    return (
        <div className="row">
            <div className="col">
                <div className="card">
                    <div className={"card-body"} style={{backgroundColor: classStyleCard}}>
                        <h5>Total Entrada: {formatarParaReal(totalEntrada)}</h5>
                    </div>
                </div>
            </div>
            <div className="col">
                <div className="card">
                <div className={"card-body"} style={{backgroundColor: classStyleCard}}>
                        <h5>Total Saída: {formatarParaReal(totalSaida)}</h5>
                    </div>
                </div>
            </div>
            <div className="col">
                <div className="card">
                    <div className={`card-body ${classStyle}`}>
                        <h5>Diferença: {formatarParaReal(diferenca)}</h5>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default StatsCards;
