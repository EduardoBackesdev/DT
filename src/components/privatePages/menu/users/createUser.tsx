import { useDispatch } from "react-redux"
import { hideModalUsers, showModalNotify, showModalNotifyError } from "../../../../store/conterSlice"
import InputMask from 'react-input-mask'
import { FormEvent, useState } from "react"
import { useMutation } from "@tanstack/react-query"
import { postCreateOrAttUser } from "../../../../../apis/apisCalls"

export function CreateUser(){
    const { mutate } = useMutation({
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
    const [nascimento, setNascimento] = useState()
    const [cpf, setCpf] = useState()
    const [usuario, setUsuario] = useState()
    const [senha, setSenha] = useState()
    const [email, setEmail] = useState()
    const res = {
        tipos: tipo,
        usuario: {
            cpf: cpf,
            dataNascimento: nascimento,
            email: email,
            id: 0,
            nome: nome,
            password: senha,
            telefone: telefone,
            username: usuario
        }
    };
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        mutate(res)
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
                <div>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <h2>Nome:</h2>
                            <input onChange={(e: any) => setNome(e.target.value)} type="text" required />
                            <h2>Telefone:</h2>
                            <InputMask
                                mask="(99) 99999-9999"  // Máscara para Telefone
                                onChange={(e: any) => setTelefone(e.target.value)}
                                className="placeholder:text-black w-full rounded-xl pl-3"
                                placeholder="(__) _____-____"
                                required
                            />
                            <h2>Email:</h2>
                            <input onChange={(e: any) => setEmail(e.target.value)} type="text" required />
                            <h2>Nascimento:</h2>
                            <InputMask
                                mask="99-99-9999"  // Máscara para Data
                                onChange={(e: any) => setNascimento(e.target.value)}
                                className="placeholder:text-black w-full rounded-xl pl-3"
                                placeholder="DD/MM/AAAA"
                            />
                            <h2>CPF:</h2>
                            <InputMask
                                mask="999.999.999-99"
                                onChange={(e: any) => setCpf(e.target.value)}
                                className="placeholder:text-black w-full rounded-xl pl-3"
                                placeholder="Digite o CPF"
                                required
                            />
                            <h2>Usuário:</h2>
                            <input onChange={(e: any) => setUsuario(e.target.value)} type="text" required />
                            <select onChange={(e: any) => { setTipo(e.target.value) }} required>
                                <option value="">Tipo Usuario</option>
                                <option value={["ROLE_ADMIN", "ROLE_USER"]}>Administrador</option>
                                <option value={["ROLE_USER"]}>Usuario</option>
                            </select>
                            <h2>Senha:</h2>
                            <input onChange={(e: any) => setSenha(e.target.value)} type="password" required />
                        </div>
                        <div>
                            <button className="bg-green-500 p-2 w-full">Salvar</button>
                        </div>
                    </form>

                </div>
            </div>
        </div>
    )
}