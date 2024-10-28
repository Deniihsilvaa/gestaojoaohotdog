import React, { useState } from 'react';
import Alert from 'react-bootstrap/Alert';
import '../../styles/Alerta.css';
const Alerta = ({ mensagem, tipo = 'info' }) => {
  const [show, setShow] = useState(true); // Estado para controlar a visibilidade do alerta
  if (!mensagem || !show) return null; // Não renderiza se não houver mensagem ou se o alerta for fechado

  return (
      <div className='divAlerta'>
    <Alert variant={tipo} onClose={() => setShow(false)} dismissible>
      <Alert.Heading>Alerta</Alert.Heading>
      <p>{mensagem}</p>
    </Alert>
        </div>
  );
};

export default Alerta;
