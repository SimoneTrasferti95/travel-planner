import dayjs from "dayjs"
import type { Product } from "../types/ProductType"
import type { ParentProps } from "../types/ParentType"

export const Card = ({id, nome, descrizione, prezzo, orario_creazione=dayjs().toDate()}: Product) => {
    
    return(
        <div key={id}>
            <h1>{nome}</h1>
            <h3>{prezzo}</h3> 
            <h5>{descrizione}</h5>
            <h5>{dayjs(orario_creazione).format('DD/MM/YYYY HH:mm')}</h5>
        </div>
    )
}

export const CardConteiner = ({children}:ParentProps) => {
    return(
     <div style={{ border:'2px solid white', borderRadius:'20px', padding:'5px'}}>
        {children}
    </div>
    )
}