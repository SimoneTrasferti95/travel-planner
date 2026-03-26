import { useState } from "react";
import type { Product } from "../types/ProductType";


// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const FormAggiungi : React.FC<{ onSave: (p: Product) => void; onCancel: () => void }> = ({ onSave, onCancel }) => {
    const [data, setData] = useState({ nome: '', prezzo: 0, descrizione: '' });

   return(
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px'}}>
            <label style={{color:'black'}}>Nome</label>
            <input placeholder="Nome" onChange={e => setData({...data, nome: e.target.value})} />
            <label style={{color:'black'}}>Prezzo</label>
            <input type="number" step="0.01" placeholder="Prezzo" onChange={e => setData({...data, prezzo: Number(e.target.value)})} />
            <label style={{color:'black'}}>Descrizione</label>
            <textarea placeholder="Descrizione" onChange={e => setData({...data, descrizione: e.target.value})} />
            <button onClick={() => onSave(data)}>Crea Prodotto</button>
        </div>
        
    )
}

export const FormModifica: React.FC<{ prodotto: Product; onSave: (id: number, p: number) => void; onCancel: () => void }> = ({ prodotto, onSave }) => {
  const [prezzo, setPrezzo] = useState(prodotto.prezzo);
  return (
    <div>
      <p>Prodotto: {prodotto.nome}</p>
      <input type="number" value={prezzo} onChange={e => setPrezzo(Number(e.target.value))} style={{ marginBottom: '10px', display: 'block' }} />
      <button onClick={() => onSave(prodotto.id!, prezzo)}>Aggiorna Prezzo</button>
    </div>
  );
};

