const urlAjax = "https://script.google.com/macros/s/AKfycbxLPOwcdZ0cnnvzlBct0bJhJOKZTkfM-AI5avuer6tNs4TosQHy3DUU4roRD0Z934sY/exec";

// Função genérica para fazer requisições AJAX
export function ajaxRequest({ url = urlAjax, method = "POST", data = {}, onSuccess, onError }) {
  return new Promise((resolve, reject) => {
    fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams(data),
    })
      .then((response) => response.json())
      .then((data) => {
        if (onSuccess) {
          onSuccess(data); // Chama a função de sucesso com os dados retornados
        }
        resolve(data); // Resolve a promessa com os dados retornados
      })
      .catch((error) => {
        if (onError) {
          onError(error); // Chama a função de erro se houver
        }
        reject(error); // Rejeita a promessa se ocorrer um erro
      });
  });
}