// Home.js
import React from 'react';
import Logo from '../components/Logo/logo';
import InputsLogin from '../components/Login/inputs';
import styled from '@emotion/styled';
import '../styles/Login/Login.css';
// Definindo um componente estilizado
const Container = styled.div`
  /* Adicione aqui os estilos que você deseja */
  display: flex;
  justify-content: space-between;
  padding: 2rem; /* Exemplo de estilo */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Exemplo de sombra */
`;

function Login() {
  return (
    <Container>
      <div className='card w-100'>

    <div className='card-body campLogin'>
    <h1><Logo /></h1>
    <InputsLogin />
    </div>

      </div>
    </Container>
  );
}

export default Login;
