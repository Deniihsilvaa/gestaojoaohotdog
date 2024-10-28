// localStorage.js
const SearchLocal = (funcao, name, dados) => {
    let mensagem = "";

    switch (funcao) {
        case 'Salvar':
            localStorage.setItem(name, JSON.stringify(dados));
            mensagem = `Os dados foram salvos com sucesso sob o nome "${name}".`;
            break;

        case 'Excluir':
            localStorage.removeItem(name);
            mensagem = `Os dados sob o nome "${name}" foram excluídos com sucesso.`;
            break;

        case 'Retorna':
            const dadosRetornados = localStorage.getItem(name);
            mensagem = dadosRetornados ? `Dados retornados: ${dadosRetornados}` : `Nenhum dado encontrado sob o nome "${name}".`;
            break;

        default:
            mensagem = "Operação inválida. Use 'Salvar', 'Excluir' ou 'Retorna'.";
            break;
    }

    return mensagem;
};

export default SearchLocal;
