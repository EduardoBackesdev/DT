import { useDispatch } from "react-redux"
import { hideModalUsers } from "../../../../store/conterSlice"

export function CreateUser(){
    const dis = useDispatch()
    return (
<div className="h-full w-full flex justify-center mt-10 fixed">
            <div className="anim h-[70%] w-[50%] bg-[#d48274] fixed rounded-2xl ">
                <div className="flex justify-end ">
                    <div  onClick={()=>{
                        dis(hideModalUsers())
                }} className="text-3xl cursor-pointer bg-red-600 w-[5%] flex justify-center rounded-tr-xl">
                        <h2>X</h2>
                    </div>
                </div>
               
            </div>
        </div>
    )
}