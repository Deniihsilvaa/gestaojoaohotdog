// Home.js
import React from 'react';
import Logo from '../components/Logo/logo';
import Alerta from '../components/Alert/Alerta';
function Home() {
  return (
    <div className='container'>
      <h1>Pagina inicial</h1>
      <Logo />
      <Alerta  mensagem="Pagina inicial" tipo="success" />
    </div>
  );
}


export default Home;
