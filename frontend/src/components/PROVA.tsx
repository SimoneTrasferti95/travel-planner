import React, { useState } from 'react';
import axios from 'axios';
import type { Prodotto } from '../types/ProductType';

const api = axios.create({
    baseURL: 'http://localhost:7799/db/prodotti',
    timeout: 30000,
    headers: {'Content-Type': 'application/json'}
});


export const Prova = () =>{
  const [prodotti, setProdotti] = useState<Prodotto[]>([]);
  const [modalActive, setModalActive] = useState<'aggiungi' | 'modifica' | 'elimina' | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Prodotto | null>(null);

  // 1. CARICA PRODOTTI (GET)
  const caricaProdotti = async () => {
    try {
      const res = await api.get<Prodotto[]>('/all');
      setProdotti(res.data);
    } catch (err) {
      console.log("Errore nel caricamento prodotti", err)
      alert("Errore nel caricamento prodotti");
    }
  };

  // 2. AGGIUNGI PRODOTTO (POST)
  const aggiungiProdotto = async (nuovo: Prodotto) => {
    try {
      await api.post('/add', nuovo);
      setModalActive(null);
      alert("Prodotto inserito! Clicca 'Carica prodotti' per aggiornare la lista.");
    } catch (err) {
        console.log("Errore nell'inserimento", err)
      alert("Errore nell'inserimento");
    }
  };

  // 3. AGGIORNA PREZZO (PUT)
  const aggiornaPrezzo = async (id: number, nuovoPrezzo: number) => {
    try {
      await api.put(`/${id}`, { prezzo: nuovoPrezzo });
      setModalActive(null);
      alert("Prezzo modificato! Clicca 'Carica prodotti' per aggiornare la lista.");
    } catch (err) {
        console.log("Errore nell'aggiornamento", err)
      alert("Errore nell'aggiornamento");
    }
  };

  // 4. ELIMINA PRODOTTO (DELETE)
  const eliminaProdotto = async (id: number) => {
    try {
      await api.delete(`/delete/${id}`);
      setModalActive(null);
      alert("Prodotto eliminato! Clicca 'Carica prodotti' per aggiornare la lista.");
    } catch (err) {
        console.log("Errore nell'eliminazione", err)
      alert("Errore nell'eliminazione");
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>Catalogo Prodotti</h1>
      
      {/* HEADER */}
      <div style={{ marginBottom: '20px' }}>
        <button onClick={() => setModalActive('aggiungi')}>Aggiungi prodotto</button>
        <button onClick={caricaProdotti} style={{ marginLeft: '10px' }}>Carica prodotti</button>
      </div>

      {/* GRIGLIA PRODOTTI */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px' }}>
        {prodotti.map(p => (
          <div key={p.id} style={{ border: '1px solid #ddd', padding: '15px', borderRadius: '8px', boxShadow: '2px 2px 5px #eee' }}>
            <h3>{p.nome}</h3>
            <p>{p.descrizione || <i>Nessuna descrizione</i>}</p>
            <p><strong>Prezzo: €{p.prezzo}</strong></p>
            <p style={{ fontSize: '0.8rem', color: '#666' }}>Creato: {p.orario_creazione ? new Date(p.orario_creazione).toLocaleDateString() : '-'}</p>
            <hr />
            <button onClick={() => { setSelectedProduct(p); setModalActive('modifica'); }}>Modifica prezzo</button>
            <button onClick={() => { setSelectedProduct(p); setModalActive('elimina'); }} style={{ marginLeft: '5px', color: 'red' }}>Elimina</button>
          </div>
        ))}
      </div>

      {/* RENDER MODALI */}
      {modalActive === 'aggiungi' && (
        <ModalWrapper title="Nuovo Prodotto" onClose={() => setModalActive(null)}>
          <FormAggiungi onSave={aggiungiProdotto} onCancel={() => setModalActive(null)} />
        </ModalWrapper>
      )}

      {modalActive === 'modifica' && selectedProduct && (
        <ModalWrapper title="Modifica Prezzo" onClose={() => setModalActive(null)}>
          <FormModifica prodotto={selectedProduct} onSave={aggiornaPrezzo} onCancel={() => setModalActive(null)} />
        </ModalWrapper>
      )}

      {modalActive === 'elimina' && selectedProduct && (
        <ModalWrapper title="Conferma Eliminazione" onClose={() => setModalActive(null)}>
          <p>Vuoi davvero eliminare <strong>{selectedProduct.nome}</strong>?</p>
          <button onClick={() => eliminaProdotto(selectedProduct.id!)} style={{ backgroundColor: 'red', color: 'white' }}>Sì, elimina</button>
          <button onClick={() => setModalActive(null)} style={{ marginLeft: '10px' }}>Annulla</button>
        </ModalWrapper>
      )}
    </div>
  );
};

// --- SOTTO-COMPONENTI INTERNI ---

const ModalWrapper: React.FC<{ title: string; children: React.ReactNode; onClose: () => void }> = ({ title, children, onClose }) => (
  <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}>
    <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', minWidth: '300px' }}>
      <h2>{title}</h2>
      <div style={{ margin: '20px 0' }}>{children}</div>
      <button onClick={onClose}>Chiudi</button>
    </div>
  </div>
);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const FormAggiungi: React.FC<{ onSave: (p: Prodotto) => void; onCancel: () => void }> = ({ onSave, onCancel }) => {
  const [data, setData] = useState({ nome: '', prezzo: 0, descrizione: '' });
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      <input placeholder="Nome" onChange={e => setData({...data, nome: e.target.value})} />
      <input type="number" placeholder="Prezzo" onChange={e => setData({...data, prezzo: Number(e.target.value)})} />
      <textarea placeholder="Descrizione" onChange={e => setData({...data, descrizione: e.target.value})} />
      <button onClick={() => onSave(data)}>Salva</button>
    </div>
  );
};

const FormModifica: React.FC<{ prodotto: Prodotto; onSave: (id: number, p: number) => void; onCancel: () => void }> = ({ prodotto, onSave }) => {
  const [prezzo, setPrezzo] = useState(prodotto.prezzo);
  return (
    <div>
      <p>Prodotto: {prodotto.nome}</p>
      <input type="number" value={prezzo} onChange={e => setPrezzo(Number(e.target.value))} style={{ marginBottom: '10px', display: 'block' }} />
      <button onClick={() => onSave(prodotto.id!, prezzo)}>Aggiorna Prezzo</button>
    </div>
  );
};