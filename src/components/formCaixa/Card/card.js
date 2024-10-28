import React from "react";
import { formatarParaReal } from "../../../utils/formatacao";

const Card = ({ title, total, bgClass,icon }) => (
    console.log(title, total, bgClass,icon),
    <div className="col-md-3">
        <div className={`card w-55`}>
            <div className={`card-body ${bgClass}`}>
                <h5 className="card-title">{title}  <i className={icon ?? ''} ></i></h5>
                <p className="card-text"> {formatarParaReal(total)} </p>                
            </div>
        </div>
    </div>
);

export default Card;


