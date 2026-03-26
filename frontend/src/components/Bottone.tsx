import type { ButtonType } from "../types/ButtonType"

export const Bottone = ({title, onClick} : ButtonType) =>{
    return(
        <button style={{ marginLeft: '10px' }} onClick = {onClick}> {title} </button>
    )
}