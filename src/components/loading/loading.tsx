export function Loading(){
    return (
        <div className="fixed w-full backdrop-blur-sm bg-[#00000065] flex items-center justify-center h-screen">
            <div className="flex">
                <svg className="animate-spin h-8  w-8 mr-3" viewBox="0 0 50 50">
                <circle 
                        cx="25" 
                        cy="25" 
                        r="20" 
                        fill="none" 
                        stroke="black" 
                        strokeWidth="4" 
                        strokeDasharray="125" 
                        strokeDashoffset="31" 
                    />
                </svg>
                <h2 className="font-bold">Carregando...</h2>
            </div>
        </div>
    )
}