// Home.js
import React from 'react';
import Logo from '../components/Logo/logo';
import styled from '@emotion/styled';
import '../styles/Login/Login.css';
import { useNavigate } from 'react-router-dom';
// Definindo um componente estilizado
const Container = styled.div`
  /* Adicione aqui os estilos que você deseja */
  display: flex;
  justify-content: space-between;
  padding: 2rem; /* Exemplo de estilo */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Exemplo de sombra */
`;

function Login() {
  const navigate = useNavigate();
const bttLogin = () => {
  navigate('/home');
}
  return (
    <Container>
      <div className='card w-100'>

    <div className='card-body campLogin'>
    <h1><Logo />Erro! pagina não encontrada </h1>
    <button type="button" className="btn btn-primary" onClick={bttLogin}>Voltar</button>
    </div>

      </div>
    </Container>
  );
}

export default Login;
