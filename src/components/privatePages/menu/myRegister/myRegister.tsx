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
        },
        onError: ()=>{
            dis(showModalNotifyError())
        }
    })
    const {mutate:attUserMutate} = useMutation({
        mutationFn: (e:any)=>postUserSave(e),
        onSuccess: ()=>{
            dis(showModalNotify())
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
    const [email, setEmail] = useState(data?.object.usuario.email)
    const [cpf, setCpf] = useState(data?.object.usuario.cpf)
    const [nome, setNome] = useState(data?.object.usuario.nome)
    const [nascimento, setNascimento] = useState(data?.object.usuario.dataNascimento)
    const [username, setUsername] = useState(data?.object.usuario.username)
    const [pass, setPass] = useState(data?.object.usuario.password)
    const [telefone, setTelefone] = useState(data?.object.usuario.telefone)

    const attUser = {
          cpf: cpf,
          dataNascimento: nascimento.split("-").reverse().join("-"),
          email: email,
          id: data?.object.usuario.id,
          nome: nome,
          password: pass,
          telefone: telefone,
          username: username
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
        refetch()
    }
    const handleSubmitPass= (e: FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        if (!regex.test(pass)){
            setErrorSenha(true)
            return
        }
        alterPass(attUserPass)
        setErrorSenha(false)
        refetch()
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
            <div className="p-3">
                <form onSubmit={data?.object.usuario.password != pass ? handleSubmitPass  : handleSubmitAttUser} className="bg-[#d48274] p-3 rounded-xl flex flex-col gap-5">
                    {arr.map((e:any)=>{
                        console.log(arr)
                        return (
                            <div className="flex flex-col gap-4">
                                <div className="flex gap-3">
                                    <h2>Nome:</h2><input onChange={(e:any)=>{setNome(e.target.value)}} className="placeholder:text-black w-full rounded-xl pl-3" placeholder={e.object.usuario.nome} type="text" />
                                </div>
                                <div className="flex gap-3">
                                    <h2>Tipo:</h2><input disabled className="placeholder:text-black w-full rounded-xl pl-3" value={e.object.tipos.includes("ROLE_ADMIN") ? "Administrador" : "Usuario"} type="text" />
                                </div>
                                <div className="flex gap-3">
                                    <h2>CPF:</h2>
                                    <InputMask
                                        mask="999.999.999-99"
                                        value={cpf}
                                        onChange={(e:any) => setCpf(e.target.value)}
                                        className="placeholder:text-black w-full rounded-xl pl-3"
                                        placeholder="Digite o CPF"
                                        />                          
                                </div>
                                <div className="flex gap-3">
                                <InputMask
                                    mask="99-99-9999"
                                    onChange={(e:any) => setNascimento(e.target.value)}
                                    className="placeholder:text-black w-full rounded-xl pl-3"
                                    placeholder={nascimento.split("-").reverse().join("-")}
                                    />                       
                                </div>
                                <div className="flex gap-3">
                                <InputMask
                                    mask="(99) 99999-9999"
                                    value={telefone}
                                    onChange={(e:any) => setTelefone(e.target.value)}
                                    className="placeholder:text-black w-full rounded-xl pl-3"
                                    placeholder="(XX) XXXXX-XXXX"
                                    />                  
                                </div>
                                <div className="flex gap-3">
                                <InputMask
                                    mask="*******@*******.***"
                                    value={email}
                                    onChange={(e:any) => setEmail(e.target.value)}
                                    className="placeholder:text-black w-full rounded-xl pl-3"
                                    placeholder="usuario@email.com"
                                     />                   
                                </div>
                                <div className="flex gap-3">
                                    <h2>Username:</h2><input onChange={(e:any)=>{setUsername(e.target.value)}} className="placeholder:text-black w-full rounded-xl pl-3" placeholder={e.object.usuario.username} type="text" />
                                </div>
                                <div className="flex gap-3">
                                    <h2>Senha:</h2><input minLength={8} onChange={(e:any)=>{setPass(e.target.value)}} className="placeholder:text-black w-full rounded-xl pl-3" placeholder="Digite a nova senha" type="password" />
                                    
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