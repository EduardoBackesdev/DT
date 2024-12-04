import { useDispatch, useSelector } from "react-redux"
import { hideModalAlterPersons } from "../../../../store/conterSlice"
import { RootState } from "../../../../store/store"
import { useQuery } from "@tanstack/react-query"
import { returnDataPersons } from "../../../../../apis/apisCalls"

export function AlterPersons(){
    const personId = useSelector((s:RootState)=> s.counter.personsId.id)
    const {data} = useQuery({
        queryKey: ['searchPersonsData'],
        queryFn: ()=> returnDataPersons(personId),
    }) 
    const dis = useDispatch()
    console.log(data)
    return (
        <div className="h-full w-full flex justify-center mt-10 fixed">
        <div className="anim h-[70%] w-[50%] bg-[#d48274] fixed rounded-2xl ">
            <div className="flex justify-end ">
                <div onClick={() => {
                    dis(hideModalAlterPersons())
                }} className="text-3xl cursor-pointer bg-red-600 w-[5%] flex justify-center rounded-tr-xl">
                    <h2>X</h2>
                </div>
            </div>
            <div className="h-[90%]">
                {/* <form className="h-[95%] overflow-auto" onSubmit={handleSubmit}>
                    <div className="w-full flex flex-col gap-2 p-3">
                        <div className="flex">
                            <h2>Nome</h2>
                            <input className="w-full rounded-lg" onChange={(e: any) => setNome(e.target.value)} type="text" required />
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
                            <input className="w-full rounded-xl" onChange={(e: any) => setEmail(e.target.value)} type="text" required />
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
                            <input className="w-full rounded-xl" onChange={(e: any) => setUsuario(e.target.value)} type="text" required />
                        </div>
                        <select onChange={(e: any) => { setTipo(e.target.value) }} required>
                            <option value="">SELECIONE O TIPO DE USUARIO</option>
                            <option value="ROLE_ADMIN">Administrador</option>
                            <option value="ROLE_USER">Usuario</option>
                        </select>
                        <div className="flex">
                            <h2>Senha:</h2>
                            <input minLength={8} className="w-full rounded-xl" onChange={(e: any) => setSenha(e.target.value)} type="password" required />   
                        </div>
                        {errorSenha &&
                        <div className="flex justify-center">
                            <h2 className="text-red-800">A senha precisa conter letras e números</h2>
                        </div>}
                    </div>
                    <div className="p-3">
                        <button className="bg-green-500 p-2 w-full rounded-xl">Salvar</button>
                    </div>
                </form> */}

            </div>
        </div>
    </div>

    )
}