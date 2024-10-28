import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Importando o Link do react-router-dom
import Logo from '../Logo/logo'; // Certifique-se de que o caminho está correto
import { logout } from '../../services/authService';
import { useNavigate } from 'react-router-dom';
function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(null); // Para controlar qual dropdown está aberto

  useEffect(() => {
    const closeDropdowns = (e) => {
      if (!e.target.closest('.dropdown')) {
        setDropdownOpen(null); // Fecha o dropdown quando clicar fora
      }
    };

    document.addEventListener('click', closeDropdowns);
    return () => {
      // Limpeza para evitar vazamento de memória
      document.removeEventListener('click', closeDropdowns);
    };
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleDropdownToggle = (index) => {
    setDropdownOpen(dropdownOpen === index ? null : index);
  };
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    console.log('Logout efetuado com sucesso!');
    navigate('/');

  };

  return (
    <nav className="navbar navbar-expand-lg shadow">
      <div className="container-fluid">
        <Link className="navbar-brand text-black" to="/">Home</Link>
        <button className="navbar-toggler" type="button" onClick={toggleMenu} aria-controls="navbarNavDropdown"
          aria-expanded={isOpen} aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className={`collapse navbar-collapse ${isOpen ? 'show' : ''}`} id="navbarNavDropdown">
          <ul className="navbar-nav">
            {/* Cadastro Dropdown */}
            <li className="nav-item dropdown">
              <button
                className="nav-link dropdown-toggle"
                onClick={() => handleDropdownToggle(0)}
                aria-expanded={dropdownOpen === 0}
              >
                Cadastro
              </button>
              <ul className={`dropdown-menu ${dropdownOpen === 0 ? 'show' : ''}`}>
                <li><Link className="dropdown-item" to="/clientes">Clientes</Link></li>
                <li><Link className="dropdown-item" to="/fornecedores">Fornecedores</Link></li>
                <li><Link className="dropdown-item" to="/produtos">Produtos</Link></li>
              </ul>
            </li>
            {/* Financeiro Dropdown */}
            <li className="nav-item dropdown">
              <button
                className="nav-link dropdown-toggle"
                onClick={() => handleDropdownToggle(1)}
                aria-expanded={dropdownOpen === 1}
              >
                Financeiro
              </button>
              <ul className={`dropdown-menu ${dropdownOpen === 1 ? 'show' : ''}`}>
                <li><Link className="dropdown-item" to="/caixa">Caixa</Link></li>
                <li><Link className="dropdown-item" to="/orcamentos">Orçamentos</Link></li>
                <li><Link className="dropdown-item" to="/faturamento">Faturamento</Link></li>
                <li><Link className="dropdown-item" to="/contasapagar">Contas a Pagar</Link></li>
                <li><Link className="dropdown-item" to="/contas-receber">Contas a Receber</Link></li>
              </ul>
            </li>
            {/* Suplementos Dropdown */}
            <li className="nav-item dropdown">
              <button
                className="nav-link dropdown-toggle"
                onClick={() => handleDropdownToggle(2)}
                aria-expanded={dropdownOpen === 2}
              >
                Suplementos
              </button>
              <ul className={`dropdown-menu ${dropdownOpen === 2 ? 'show' : ''}`}>
                <li><Link className="dropdown-item" to="/gestao-estoque">Gestão de Estoque</Link></li>
                <li><Link className="dropdown-item" to="/compras">Compras</Link></li>
              </ul>
            </li>
            {/* NFe Dropdown */}
            <li className="nav-item dropdown">
              <button
                className="nav-link dropdown-toggle"
                onClick={() => handleDropdownToggle(3)}
                aria-expanded={dropdownOpen === 3}
              >
                NFe
              </button>
              <ul className={`dropdown-menu ${dropdownOpen === 3 ? 'show' : ''}`}>
                <li><Link className="dropdown-item" to="/notas-entrada">Notas de Entrada</Link></li>
                <li><Link className="dropdown-item" to="/registro-requests">Registro de Requests</Link></li>
                <li><Link className="dropdown-item" to="/notas-saida">Notas de Saída</Link></li>
                <li><Link className="dropdown-item" to="/documentos-nfe">Documentos NFe</Link></li>
              </ul>
            </li>
          </ul>
        </div>
        
        <Link className="navbar-brand text-black" onClick={handleLogout}>Logaut</Link>
        <Logo /> {/* Ajuste para exibir o logo */}

      </div>
    </nav>
  );
}

export default Navbar;
