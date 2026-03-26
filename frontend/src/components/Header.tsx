import type { ParentProps } from "../types/ParentType"

export const Header = ({children}:ParentProps) => {
    return(
        <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
            <h1>Gestione Negozio</h1>
            <div style={{ marginBottom: '20px' }}>
            {children}
            </div>
        </div>
    )
}