import { useDispatch } from "react-redux"
import { hideModalNotify, hideModalNotifyError } from "../../store/conterSlice"

export function ErrorNotify(){
    const dis = useDispatch()
    return (
        <div className=" h-full flex justify-center">
            <div className="anim h-[40%] w-[50%] bg-[#d48274] fixed rounded-2xl">
                <div className="w-full h-full flex items-center justify-center">
                    <div className="flex flex-col gap-6">
                        <div className="flex justify-center text-2xl w-full">
                            <h2>Ops, algo deu errado, tente novamente mais tarde!</h2>
                        </div>
                        <div className="flex justify-center text-2xl w-full">
                            <button onClick={()=>{dis(hideModalNotifyError())}} className="bg-red-500 p-2 w-full rounded-xl">Ok</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}