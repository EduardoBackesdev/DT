import axios from "./axiosConfig";

// Função para login
export async function postLogin(dados:any){
   const data = await axios.post("https://demometaway.vps-kinghost.net:8485/api/auth/login", dados)
   return data.data
}

// Função que retorna a lista de contatos da pessoa
export async function getContacts(dados:any){
   const data = await axios.get("https://demometaway.vps-kinghost.net:8485/api/contato/listar/" + dados)
   return data.data
}

// Funcao que retorna a lista de contatos favoritos
export async function getFavorites(){
   const data = await axios.get("https://demometaway.vps-kinghost.net:8485/api/favorito/pesquisar")
   return data.data
}

// Função para retorna a foto da pessoa
export async function getDownloadPhoto(dados: any){
   const data = await axios.get("https://demometaway.vps-kinghost.net:8485/api/foto/download/" + dados)
   return data.data
}

// Função para retornar pesquisa de contato
export async function postSearchAllContacts(dados:any){
   const data = await axios.post("https://demometaway.vps-kinghost.net:8485/api/contato/pesquisar", dados)
   return data.data
}

// Função para remover o cadastro do contato
export async function deleteContact(dados:any){
   const data = await axios.delete("https://demometaway.vps-kinghost.net:8485/api/contato/remover/" + dados)
   return data.data
}

// Função para criar ou atualizar dados de contato (FAVORITO)
export async function postCreateAttFav(dados:any){
   const data = await axios.post("https://demometaway.vps-kinghost.net:8485/api/favorito/salvar", dados)
   return data.data
}

// Função para criar ou atualizar dados de contato (CONTATO)
export async function postCreateAtt(dados:any){
   const data = await axios.post("https://demometaway.vps-kinghost.net:8485/api/contato/salvar", dados)
   return data.data
}

// Função para retornar os detalhes do usuario
export async function getReturnDataUser(dado: number){
   const data = await axios.get("https://demometaway.vps-kinghost.net:8485/api/usuario/buscar/" + dado)
   return data.data
}

// Função para criar ou atualizar o cadastro
export async function postUserSave(dados: any) {
   const data = await axios.put("https://demometaway.vps-kinghost.net:8485/api/usuario/atualizar", dados)
   return data.data
}

// Função para 