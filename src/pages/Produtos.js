import React, { useEffect, useState } from 'react';
import Spinner from "../components/Spinner/spinner";

const Produtos = () => {
  const [carregando, setCarregando] = useState(false);

  useEffect(() => {
    // Simular uma requisição para buscar produtos
    setCarregando(true);
    setTimeout(() => {
      setCarregando(false);
    }, 2000); // Tempo de carregamento simulado
  }, []);

  return (
    <div className='container'>
      <Spinner show={carregando} />
      <h1>Página de Produtos</h1>
      <p>Esta é a página onde você pode gerenciar seus produtos.</p>
      {/* Adicione o conteúdo e layout que deseja para a página de produtos aqui */}
    </div>
  );
};

export default Produtos;
