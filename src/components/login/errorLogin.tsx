import { useDispatch } from "react-redux"
import { hideLoginError } from "../../store/conterSlice"

export function ErrorLogin(){
    const dis = useDispatch()
    return(
        <div className="h-full w-full flex justify-center mt-10 fixed z-40">
            <div className="anim h-[40%] w-[50%] bg-[#0e0d0d75] fixed rounded-2xl">
                <div className="w-full h-full flex items-center justify-center">
                    <div className="flex flex-col gap-6">
                        <div className="flex justify-center text-2xl w-full text-white">
                            <h2>Ops, usuário ou senha inválidos</h2>
                        </div>
                        <div className="flex justify-center text-2xl w-full">
                            <button onClick={()=>{dis(hideLoginError())}} className="bg-red-500 p-2 w-full rounded-xl">Ok</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}