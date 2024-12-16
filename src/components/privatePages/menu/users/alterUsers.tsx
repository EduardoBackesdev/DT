import { useDispatch, useSelector } from "react-redux"
import { hideModalAlterUsers,  resetIdAlterUser, showModalNotify, showModalNotifyError } from "../../../../store/conterSlice"
import { useMutation, useQuery } from "@tanstack/react-query"
import { RootState } from "../../../../store/store"
import { getReturnDataUser, postCreateOrAttUser } from "../../../../../apis/apisCalls"
import InputMask from 'react-input-mask'
import { FormEvent, useState } from "react"
import { Loading } from "../../../loading/loading"

export function AlterUsers(){
    const dis = useDispatch()
    const [errorSenha, setErrorSenha] = useState(false)
    const regex = /^(?=.*[A-Za-z])(?=.*\d)/;
    const { mutate } = useMutation({
        mutationKey: ['userCreate'],
        mutationFn: (e: {}) => postCreateOrAttUser(e),
        onSuccess: () => {
            dis(showModalNotify())
        },
        onError: () => {
            dis(showModalNotifyError())
        }
    })
    const id = useSelector((s:RootState)=>s.counter.idAlterUser.id)
    const {data, isLoading} = useQuery({
        queryKey: ['alterUserID'],
        queryFn: ()=> getReturnDataUser(id)
    })
    const arr = [data]
    const [nome, setNome] = useState("")
    const [tipo, setTipo] = useState("")
    const [telefone, setTelefone] = useState("")
    const [nascimento, setNascimento] = useState("")
    const [cpf, setCpf] = useState("")
    const [usuario, setUsuario] = useState("")
    const [senha, setSenha] = useState("")
    const [email, setEmail] = useState("")
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (senha != ""){
            if (!regex.test(senha)){
                setErrorSenha(true)
                return
            }}
        const res = {
            tipos: tipo === "" ? data?.object?.tipos : tipo,
            usuario: {
                cpf: cpf === "" ? data?.object?.usuario?.cpf : cpf,
                dataNascimento: nascimento === "" ? data?.object.usuario?.dataNascimento : nascimento.split("-").reverse().join("-"),
                email: email === "" ? data?.object.usuario?.email : email,
                id: data.object.usuario?.id,
                nome: nome === "" ? data?.object.usuario?.nome : nome,
                password: senha === "" ? data?.object.usuario?.senha : senha,
                telefone: telefone === "" ? data?.object.usuario?.telefone : telefone,
                username: usuario === "" ? data?.object.usuario?.username : usuario 
            }
        }
        mutate(res)
        setErrorSenha(false)
    }
    return isLoading ? <Loading/> : (
        <div className="h-full w-full flex justify-center mt-10 fixed">
            <div className="anim h-[70%] w-[50%] bg-[#d48274] fixed rounded-2xl ">
                <div className="flex justify-end ">
                    <div onClick={() => {
                        dis(hideModalAlterUsers())
                        dis(resetIdAlterUser())
                    }} className="text-3xl cursor-pointer bg-red-600 w-[5%] flex justify-center rounded-tr-xl">
                        <h2>X</h2>
                    </div>
                </div>
                <div className="h-[90%]">
                        {arr.map((e:any)=>{
                            return (
                                <div className="h-[90%] overflow-auto">
                                    <form onSubmit={handleSubmit} className="h-[95%] overflow-auto" >
                                            <div className="w-full flex flex-col gap-2 p-3">
                                            <div className="flex gap-2">
                                                <h2 className="">Nome:</h2>
                                                <h2>{e.object.usuario.nome}</h2>
                                            </div>
                                            <div>       
                                                <input placeholder="Digite o novo nome" className="w-full rounded-lg pl-2" onChange={(e: any) => setNome(e.target.value)} type="text" />
                                            </div>
                                            <div className="flex gap-2">
                                            <h2 >Telefone:</h2>
                                            <h2>{e.object.usuario.telefone}</h2>
                                            </div>
                                            <div>
                                            <InputMask
                                                    mask="(99) 99999-9999"
                                                    onChange={(e: any) => setTelefone(e.target.value)}
                                                    className="placeholder:text-black w-full rounded-xl pl-3"
                                                    placeholder="(__) _____-____"
                                                />
                                            </div>
                                            <div className="flex gap-2">
                                                <h2>Email:</h2>
                                                <h2>{e.object.usuario.email}</h2>
                                            </div>
                                            <div>
                                                <input className="w-full rounded-xl pl-2" placeholder="Digite o novo email" onChange={(e: any) => setEmail(e.target.value)} type="text" />
                                            </div>
                                            <div className="flex gap-2">
                                                <h2>Nascimento:</h2>
                                                <h2>{e.object.usuario.dataNascimento.split("-").reverse().join("-")}</h2>
                                            </div>
                                            <div>
                                            <InputMask
                                                    mask="99-99-9999" 
                                                    onChange={(e: any) => setNascimento(e.target.value)}
                                                    className="placeholder:text-black w-full rounded-xl pl-3"
                                                    placeholder="DD/MM/AAAA"
                                                />
                                            </div>
                                            <div className="flex gap-2">
                                                <h2>CPF:</h2>
                                                <h2>{e.object.usuario.cpf}</h2>
                                            </div>
                                            <div>
                                            <InputMask
                                                    mask="999.999.999-99"
                                                    onChange={(e: any) => setCpf(e.target.value)}
                                                    className="placeholder:text-black w-full rounded-xl pl-3"
                                                    placeholder="Digite o novo CPF"
                                                />
                                            </div>
                                            <div className="flex gap-2">
                                                <h2>Usuário:</h2>
                                                <h2>{e.object.usuario.username}</h2>
                                            </div>
                                            <div>
                                                <input placeholder="Digite o novo nome de usuário" className="w-full rounded-xl pl-2" onChange={(e: any) => setUsuario(e.target.value)} type="text" />
                                            </div>
                                        <select onChange={(e: any) => { setTipo(e.target.value) }}>
                                                <option value="">SELECIONE O TIPO DE USUARIO</option>
                                                <option value="ROLE_ADMIN">Administrador</option>
                                                <option value="ROLE_USER">Usuario</option>
                                            </select>
                                            <div className="flex">
                                                <h2>Senha:</h2>
                                                <input minLength={8} className="w-full rounded-xl pl-2" onChange={(e: any) => setSenha(e.target.value)} type="password" />   
                                            </div>
                                        {errorSenha &&
                                            <div className="flex justify-center">
                                                <h2 className="text-red-800">A senha precisa conter letras e números</h2>
                                            </div>} 
                                        </div>
                                        <div className="p-3">
                                            <button className="bg-green-500 p-2 w-full rounded-xl">Salvar</button>
                                        </div>
                                    </form>
                        </div>)
                        })}
                </div>
            </div>
            
        </div>
    )
}