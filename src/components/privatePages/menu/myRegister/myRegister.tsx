import { useMutation, useQuery } from "@tanstack/react-query"
import { alterOwnPass, getReturnDataUser, postUserSave } from "../../../../../apis/apisCalls"
import { FormEvent, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { showModalNotify, showModalNotifyError } from "../../../../store/conterSlice"
import InputMask from 'react-input-mask'

export function MyRegister() {
    const [errorSenha, setErrorSenha] = useState(false)
    const regex = /^(?=.*[A-Za-z])(?=.*\d)/;
    const dis = useDispatch()
    const {mutate: alterPass} = useMutation({
        mutationKey: ['alterPassOwnUser'],
        mutationFn: (e:{})=> alterOwnPass(e),
        onSuccess: ()=>{
            dis(showModalNotify())
            refetch()
        },
        onError: ()=>{
            dis(showModalNotifyError())
        }
    })
    const {mutate:attUserMutate} = useMutation({
        mutationFn: (e:any)=>postUserSave(e),
        onSuccess: ()=>{
            dis(showModalNotify())
            refetch()
        },
        onError: ()=>{
            dis(showModalNotifyError())
        }
    })
    const [id, setId] = useState(localStorage.getItem('id'))
    const {data, isLoading, refetch} = useQuery({
        queryKey: ['myRegister'],
        queryFn: ()=> getReturnDataUser(Number(id))
    })
    const [email, setEmail] = useState("")
    const [cpf, setCpf] = useState("")
    const [nome, setNome] = useState("")
    const [nascimento, setNascimento] = useState("")
    const [username, setUsername] = useState("")
    const [pass, setPass] = useState("")
    const [telefone, setTelefone] = useState("")

    const attUser = {
          cpf: cpf === "" ? data?.object.usuario?.cpf : cpf,
          dataNascimento: nascimento === "" ? data?.object.usuario?.dataNascimento  : nascimento.split("-").reverse().join("-"),
          email: email === "" ?data?.object.usuario?.email : email,
          id: data?.object.usuario.id,
          nome: nome === "" ? data?.object.usuario?.nome : nome,
          password: pass === "" ? data?.object.usuario?.password : pass,
          telefone: telefone === "" ? data?.object.usuario?.telefone : telefone,
          username: username === "" ? data?.object.usuario?.username  : username
      };
    const attUserPass = {
        newPassword: pass,
        password: data?.object.usuario.password,
        username: data?.object.usuario.username
      };
    const arr = [data]
    const handleSubmitAttUser = (e: FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        attUserMutate(attUser)
    }
    const handleSubmitPass= (e: FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        if (!regex.test(pass)){
            setErrorSenha(true)
            return
        }
        alterPass(attUserPass)
        setErrorSenha(false)
    }
    return isLoading ? <h2>Carregando...</h2> : (
        <div className="w-full">
            <div className=" text-3xl font-bold text-[#666464]">
                <div className="flex justify-center text-3xl font-bold text-[#666464]">
                    <h2>Atualize seus dados cadastrais</h2>
                </div>
                <div className="flex justify-center">
                    <p className="text-lg">Preencha o formulário</p>
                    <div className="pl-2 text-2xl">
                    </div>
                </div>
            </div>
            <div className="p-3 flex justify-center">
                <form onSubmit={pass != "" ? handleSubmitPass  : handleSubmitAttUser} className="bg-[#d48274] w-[50%] p-3 rounded-xl flex flex-col gap-5">
                    {arr.map((e:any)=>{
                        return (
                            <div className="flex flex-col gap-4">
                                <div className="flex gap-3 ">
                                    <h2 className="font-bold">Nome: </h2><span>{e.object.usuario.nome}</span><input placeholder="Digite o novo nome" onChange={(e:any)=>{setNome(e.target.value)}} className="placeholder:text-black w-[50%] rounded-xl pl-3" type="text" />
                                </div>
                                <div className="flex gap-3">
                                    <h2 className="font-bold">Tipo: </h2><span>{e.object.tipos.includes("ROLE_ADMIN") ? "Administrador" : "Usuario"}</span>
                                </div>
                                <div className="flex gap-3">
                                    <h2 className="font-bold">CPF:</h2>
                                    <span>{e.object.usuario.cpf}</span>
                                    <InputMask
                                        mask="999.999.999-99"
                                        onChange={(e:any) => setCpf(e.target.value)}
                                        className="placeholder:text-black w-[50%] rounded-xl pl-3"
                                        placeholder="Digite o CPF"
                                        />                          
                                </div>
                                <div className="flex gap-3">
                                <h2 className="font-bold">Nascimento: </h2>
                                <span>{e.object.usuario.dataNascimento.split("-").reverse().join("-")}</span>
                                <InputMask
                                    mask="99-99-9999"
                                    onChange={(e:any) => setNascimento(e.target.value)}
                                    className="placeholder:text-black w-[50%] rounded-xl pl-3"
                                    placeholder="XX-XX-XXXX"
                                    />                       
                                </div>
                                <div className="flex gap-3">
                                <h2 className="font-bold">Telefone:</h2>  
                                <span>{e.object.usuario.telefone}</span>  
                                <InputMask
                                    mask="(99) 99999-9999"
                                    onChange={(e:any) => setTelefone(e.target.value)}
                                    className="placeholder:text-black w-[50%] rounded-xl pl-3"
                                    placeholder="(XX) XXXXX-XXXX"
                                    />                  
                                </div>
                                <div className="flex gap-3">
                                <h2 className="font-bold">Email:</h2> 
                                <span>{e.object.usuario.email}</span>
                                <InputMask
                                    mask=""
                                    onChange={(e:any) => setEmail(e.target.value)}
                                    className="placeholder:text-black w-[50%] rounded-xl pl-3"
                                    placeholder="usuario@email.com"
                                     />                   
                                </div>
                                <div className="flex gap-3">
                                <h2 className="font-bold">Username:</h2> 
                                <span>{e.object.usuario.username}</span>
                                <input placeholder="Digite o novo username" onChange={(e:any)=>{setUsername(e.target.value)}} className="placeholder:text-black w-full rounded-xl pl-3" type="text" />
                                </div>
                                <div className="flex gap-3">
                                    <h2 className="font-bold">Senha:</h2><input minLength={8} onChange={(e:any)=>{setPass(e.target.value)}} className="placeholder:text-black w-[50%] rounded-xl pl-3" placeholder="Digite a nova senha" type="password" />  
                                </div>
                                {errorSenha &&
                                <div className="flex justify-center">
                                    <h2 className="text-red-800">A senha precisa conter letras e números</h2>
                                </div>} 
                            </div>
                        )
                    })}
                    <button className="p-3 bg-green-500 rounded-xl font-bold">Salvar</button>
                </form>
            </div>

        </div>
    )
}