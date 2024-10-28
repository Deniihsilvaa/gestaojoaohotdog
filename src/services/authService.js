// src/services/authService.js
export const login = async (username, password) => {
    // Simulação de uma chamada ao backend para autenticar
    const mockUser = { username: 'adm', password: '123' };

    if (username === mockUser.username && password === mockUser.password) {
        // Simulação de retorno de um token JWT
        const authToken = "fake-jwt-token";
        localStorage.setItem('authToken', authToken);
        return { success: true };
    } else {
        return { success: false, message: 'Usuário ou senha incorretos' };
    }
};

export const logout = () => {
    localStorage.removeItem('authToken');
};

export const isAuthenticated = () => {
    return !!localStorage.getItem('authToken');
};
