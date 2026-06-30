import axios, { AxiosInstance } from "axios"

// 1. Criamos uma instância isolada.
// Isso evita sujar o escopo global do Axios caso você precise se conectar a outra API no futuro.
export const apiClient: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000",
  timeout: 10000, // 10 segundos de limite. Se a API travar, o Axios corta a requisição.
  headers: {
    "Content-Type": "application/json"
  }
})

// 2. Interceptor de Requisição (Request)
// Funciona como um Middleware: tudo o que sai do front passa por aqui antes de ir para a internet.
apiClient.interceptors.request.use(
  (config) => {
    // Excelente lugar para capturar um Token de autenticação do localStorage/Cookies
    // e injetar automaticamente no Header Authorization.
    const token =
      typeof window !== "undefined" ? localStorage.getItem("token") : null

    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 3. Interceptor de Resposta (Response)
// Intercepta o dado que chegou do NestJS antes dele chegar no seu Repositório.
apiClient.interceptors.response.use(
  (response) => response, // Se der status 2xx, passa direto sem alterar nada
  (error) => {
    // Se o backend der erro (4xx ou 5xx), nós centralizamos o tratamento aqui
    if (error.response) {
      // Exemplo: Se o NestJS retornar 401 (Não autorizado), podemos deslogar o usuário direto
      if (error.response.status === 401) {
        console.warn("Usuário não autorizado! Redirecionando...")
      }
    }
    return Promise.reject(error)
  }
)
