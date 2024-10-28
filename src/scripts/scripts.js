function Caixa() {
    const [registros, setRegistros] = useState([]);
    const [filtroData, setFiltroData] = useState('');
    const [filtroTipo, setFiltroTipo] = useState('');
    const [pesquisa, setPesquisa] = useState('');
    const [pagina, setPagina] = useState(1);
    const [carregando, setCarregando] = useState(false);


    // Efeito para carregar os registros ao montar o componente
    useEffect(() => {
        carregarCaixa();
    }, []);
    useState(() => {
        const modal = modalRef.current;
        console.log('abrindo modal');
        if (modal) {
            const myModal = new Modal(modal);
            myModal.show();
        }
    })
    // Função para carregar dados do caixa
    const carregarCaixa = () => {
        setCarregando(true); // Mostra o spinner ao iniciar o carregamento
        ajaxRequest({
            data: { qualFuncao: "carregarCaixa" },
            onSuccess: function (response) {
                if (Array.isArray(response)) {
                    setRegistros(response.slice()); // Atualiza o estado com os registros de caixa
                } else {
                    console.error("A resposta não contém um array de campos", response);
                }
            },
            onError: function (error) {
                console.error("Erro na requisição:", error);
            },
            onComplete: () => setCarregando(false) // Oculta o spinner após completar o carregamento
        });
    };

    // Filtra os registros de acordo com os critérios
    const filtrarRegistros = () => {
        return registros.filter((registro) => {
            const dataMatch = filtroData ? registro.data === filtroData : true;
            const tipoMatch = filtroTipo ? registro.tipo === filtroTipo : true;
            const pesquisaMatch = pesquisa ? registro.descricao.toLowerCase().includes(pesquisa.toLowerCase()) : true;
            return dataMatch && tipoMatch && pesquisaMatch;
        }).slice((pagina - 1) * 10, pagina * 10);
    };

    // Calcula total de entradas e saídas
    const calcularTotal = (tipo) => {
        return registros
            .filter(registro => registro.tipo === tipo)
            .reduce((total, registro) => total + registro.valor, 0);
    };

    // Calcula a diferença entre entradas e saídas
    const calcularTotalDiferenca = () => {
        const totalEntradas = calcularTotal('Entrada');
        const totalSaidas = calcularTotal('Saida');
        return totalEntradas - totalSaidas;
    };

    // Obtém a classe para o total de diferença
    const obterClasseDiferenca = () => {
        const totalDiferenca = calcularTotalDiferenca();
        return totalDiferenca < 0 ? 'bg-danger' : totalDiferenca > 0 ? 'bg-success' : 'bg-warning';
    };

    // Corpo do modal com o formulário
    const modalBody = <FormRegistros />;
    const footerBody = (
        <div className="d-flex justify-content-end">
            <h6>Denilson Silva</h6>
        </div>
    );

    return (
        <div className="container mt-5">
            <Spinner show={carregando} />
            <div className="d-flex justify-content-between mb-3">
                <h2>Registros de Caixa</h2>
                <ModalComponent
                    title="Registros Financeiros"
                    body={modalBody}
                    footer={footerBody}
                    id="createRecordModal"
                    onHide={Caixa}
                >
                    Novo Registro
                </ModalComponent>
            </div>

            <div className="row d-flex justify-content-between mb-3">
                <Card title="Entradas" total={calcularTotal('Entrada')} bgClass="bg-success" />
                <Card title="Saídas" total={calcularTotal('Saida')} bgClass="bg-info" />
                <Card title="Total" total={calcularTotalDiferenca()} bgClass={obterClasseDiferenca()} />
            </div>

            <div className="row mb-3">
                <InputDate value={filtroData} onChange={setFiltroData} />
                <SelectTipo value={filtroTipo} onChange={setFiltroTipo} />
                <InputPesquisa value={pesquisa} onChange={setPesquisa} />
            </div>

            <Tabela registros={filtrarRegistros()} />

            {/* Paginação */}
            <div className="d-flex justify-content-between">
                <button className="btn btn-secondary" onClick={() => setPagina(prev => Math.max(prev - 1, 1))} disabled={pagina === 1}>
                    Anterior
                </button>
                <span>Página {pagina}</span>
                <button className="btn btn-secondary" onClick={() => setPagina(prev => prev + 1)} disabled={filtrarRegistros().length < 10}>
                    Próxima
                </button>
            </div>
        </div>
    );
}

export default Caixa;