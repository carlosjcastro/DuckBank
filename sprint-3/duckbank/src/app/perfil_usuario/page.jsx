'use client'
import Image from "next/image";
import { useState } from "react";

import pfp from "../assets/pages/perfil/profilepic.jpeg"

export default function PerfilUsuario(){
   
    const [Nombre, setNombre] = useState("Usuario De Prueba");
    const [Mail, setMail] = useState("mailprueba@gmail.com");
    const [DNI, setDNI] = useState("44123123");
    const [B1txt, setb1txt] = useState("Editar Nombre");
    const [B2txt, setb2txt] = useState("Editar Mail");
    const [B3txt, setb3txt] = useState("Editar DNI");
    const  [b1,setb1]= useState (true)
    const  [b2,setb2]= useState (true)
    const  [b3,setb3]= useState (true)

    const handlename = () => {
        setb1 (!b1)
        if (b1===true)
            setb1txt("Confirmar")
        else{
            setb1txt("Editar Nombre")
        }
        return b1
         
    }
    const handlemail = () => {
        setb2 (!b2)
        if (b2===true)
            setb2txt("Confirmar")
        else{
            setb2txt("Editar Mail")
        }
        return b2
         
    }
    const handledni = () => {
        setb3 (!b3)
        if (b3===true)
            setb3txt("Confirmar")
        else{
            setb3txt("Editar Nombre")
        }
        return b3
         
    }
    
  
    return (
     
            <div className="w-full lg:w+1/2 flex items-center justify-center ">
              <div className="  bg-slate-300 p-10 rounded-2xl border-4 border-black">
              <h1 className="text-2xl lg:text-3xl font-semibold text-left">
                  Datos de tu cuenta: 
                </h1>
                <Image 
                src={pfp}
                height={200}
                width={200}
                className="rounded-full mt-4"
                   
                />
                <button
                    className="mb-5 ml-20 bg-[#88492b] rounded-xl w-1/5 text-white active:scale-[.98] active:duration-75 transition-all hover:scale-[1.05]"
                   
                    > Editar </button>
                
      
               
      
                <div className="mt-8">
                  <div>
                    <label className="text-lg font-medium">Nombre :</label>
                    <button
                    className="mb-5 ml-20 bg-[#88492b] rounded-xl w-1/5 text-white active:scale-[.98] active:duration-75 transition-all hover:scale-[1.05]"
                   onClick={handlename}
                    > {B1txt}</button>
                    <input
                      className={`w-full border-2 rounded-2xl p-4 mt-1 mb-5 `}
                      type="text"
                      readOnly={b1}  
                      value={Nombre}
                      onChange={(e) => setNombre(e.target.value)}
                    />
                    
                  </div>
      
                  <div>
                    <label className="text-lg font-medium">Contraseña:</label>
                    <button
                    className="mb-5 ml-20 bg-[#88492b] rounded-xl w-1/5 text-white active:scale-[.98] active:duration-75 transition-all hover:scale-[1.05]"
                    onClick={handlemail}
                    > {B2txt}</button>
                    <input
                      className={`w-full border-2 rounded-2xl p-4 mt-1 mb-5`}
                      type="email"
                      readOnly={b2}
                      value={Mail}
                      onChange={(e) => setMail(e.target.value)}
                    />
                    
                  </div>
                  <div>
                    <label className="text-lg font-medium">DNI:</label>
                    <button
                    className="mb-5 ml-20 bg-[#88492b] rounded-xl w-1/5 text-white active:scale-[.98] active:duration-75 transition-all hover:scale-[1.05]"
                    onClick={handledni}
                    > {B3txt}</button>
                    <input
                      className={`w-full border-2 rounded-2xl p-4 mt-1 `}
                    
                      value={DNI}
                      onChange={(e) => setDNI(e.target.value)}
                      readOnly={b3}
                    
                    />
                    
                  </div>
      

                  
                </div>
              </div>
            </div>
    );

}