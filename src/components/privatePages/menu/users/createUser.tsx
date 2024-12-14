import { useDispatch } from "react-redux"
import { hideModalUsers, showModalNotify, showModalNotifyError } from "../../../../store/conterSlice"
import InputMask from 'react-input-mask'
import { FormEvent, useState } from "react"
import { useMutation } from "@tanstack/react-query"
import { postCreateOrAttUser } from "../../../../../apis/apisCalls"

export function CreateUser(){
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
    const dis = useDispatch()
    const [nome, setNome] = useState()
    const [tipo, setTipo] = useState()
    const [telefone, setTelefone] = useState()
    const [nascimento, setNascimento] = useState("")
    const [cpf, setCpf] = useState()
    const [usuario, setUsuario] = useState()
    const [senha, setSenha] = useState("")
    const [email, setEmail] = useState()
    const res = {
        tipos: [tipo],
        usuario: {
            cpf: cpf,
            dataNascimento: nascimento.split("-").reverse().join("-"),
            email: email,
            id: 1,
            nome: nome,
            password: senha,
            telefone: telefone,
            username: usuario
        }
    };
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!regex.test(senha)){
            setErrorSenha(true)
            return
        }
        mutate(res)
        setErrorSenha(false)
    }
    return (
        <div className="h-full w-full flex justify-center mt-10 fixed">
            <div className="anim h-[70%] w-[50%] bg-[#d48274] fixed rounded-2xl ">
                <div className="flex justify-end ">
                    <div onClick={() => {
                        dis(hideModalUsers())
                    }} className="text-3xl cursor-pointer bg-red-600 w-[5%] flex justify-center rounded-tr-xl">
                        <h2>X</h2>
                    </div>
                </div>
                <div className="h-[81%]">
                    <div className="flex justify-center font-bold">
                        Criar Usuário
                    </div>
                    <form className="h-[95%] overflow-auto" onSubmit={handleSubmit}>
                        <div className="w-full flex flex-col gap-2 p-3">
                            <div className="flex">
                                <h2>Nome</h2>
                                <input placeholder="Digite o novo nome" className="w-full rounded-lg pl-3 placeholder:text-black" onChange={(e: any) => setNome(e.target.value)} type="text" required />
                            </div>
                            <div className="flex">
                            <h2 >Telefone:</h2>
                                <InputMask
                                    mask="(99) 99999-9999"
                                    onChange={(e: any) => setTelefone(e.target.value)}
                                    className="placeholder:text-black w-full rounded-xl pl-3"
                                    placeholder="(__) _____-____"
                                    required
                                />
                            </div>
                            <div className="flex ">
                                <h2>Email:</h2>
                                <input placeholder="Digite o novo email" className="w-full rounded-xl pl-3 placeholder:text-black" onChange={(e: any) => setEmail(e.target.value)} type="text" required />
                            </div>
                            <div className="flex">
                                <h2>Nascimento:</h2>
                                <InputMask
                                    mask="99-99-9999" 
                                    onChange={(e: any) => setNascimento(e.target.value)}
                                    className="placeholder:text-black w-full rounded-xl pl-3"
                                    placeholder="DD/MM/AAAA"
                                />
                            </div>
                            <div className="flex">
                                <h2>CPF:</h2>
                                <InputMask
                                    mask="999.999.999-99"
                                    onChange={(e: any) => setCpf(e.target.value)}
                                    className="placeholder:text-black w-full rounded-xl pl-3"
                                    placeholder="Digite o CPF"
                                    required
                                />
                            </div>
                            <div className="flex">
                                <h2>Usuário:</h2>
                                <input placeholder="Digite o usuário" className="w-full rounded-xl placeholder:text-black pl-3" onChange={(e: any) => setUsuario(e.target.value)} type="text" required />
                            </div>
                            <select onChange={(e: any) => { setTipo(e.target.value) }} required>
                                <option value="">SELECIONE O TIPO DE USUARIO</option>
                                <option value="ROLE_ADMIN">Administrador</option>
                                <option value="ROLE_USER">Usuario</option>
                            </select>
                            <div className="flex">
                                <h2>Senha:</h2>
                                <input placeholder="Digite a senha"  minLength={8} className="w-full rounded-xl pl-3 placeholder:text-black" onChange={(e: any) => setSenha(e.target.value)} type="password" required />   
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

                </div>
            </div>
        </div>
    )
}