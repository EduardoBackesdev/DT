import { FaUser } from "react-icons/fa";

export function Users() {
    return (
        <div className="w-full">
            <div className=" text-3xl font-bold text-[#666464]">
                <div className="flex justify-center text-3xl font-bold text-[#666464]">
                    <h2>Lista de usuários</h2>
                </div>
                <div className="flex justify-center gap-3">
                    <p className="text-lg">Clique para criar novo usuário</p>
                    <FaUser className="cursor-pointer text-2xl text-green-500" />
                </div>
            </div>
        </div>
    )
}