import { useState } from "react";
import type { Product } from "../types/ProductType";
import { addNewProduct, changePrize, deleteProduct, getAllProducts } from "../api/products.Api";
import { Header } from "../components/Header";
import { Card, CardConteiner } from "../components/Card";
import { ModalWrapper } from "../components/Modal";
import { FormAggiungi, FormModifica } from "../components/Form";
import { Bottone } from "../components/Bottone";




export const MainPage = () =>{

    const [prodotti, setProdotti] = useState<Product[]>([])
    const [modalActive, setModalActive] = useState<'aggiungi' | 'modifica' | 'elimina' | null>(null);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    
        const caricaProdotti= async () =>{
            try {
              const res = await getAllProducts();
              setProdotti(res);
            } catch (err) {
              console.log("Errore nel caricamento prodotti", err)
              alert("Errore nel caricamento prodotti");}
            }
    
        const aggiungiProdotto = async (nuovo: Product) => {
            try {
              await addNewProduct(nuovo);
              setModalActive(null);
              alert("Prodotto inserito! Clicca 'Carica prodotti' per aggiornare la lista.");
            } catch (err) {
                console.log("Errore nell'inserimento", err)
              alert("Errore nell'inserimento");
            }
          };

        const aggiornaPrezzo = async (id: number, nuovoPrezzo: number) => {
            try {
            await changePrize(id, nuovoPrezzo);
            setModalActive(null);
            alert("Prezzo modificato! Clicca 'Carica prodotti' per aggiornare la lista.");
            } catch (err) {
                console.log("Errore nell'aggiornamento", err)
            alert("Errore nell'aggiornamento");
            }
        };

        const eliminaProdotto = async (id: number) => {
            try {
            await deleteProduct(id);
            setModalActive(null);
            alert("Prodotto eliminato! Clicca 'Carica prodotti' per aggiornare la lista.");
            } catch (err) {
                console.log("Errore nell'eliminazione", err)
            alert("Errore nell'eliminazione");
            }
        };

    console.log(prodotti.length)
    return(
        <>
        <Header>
            <Bottone onClick={() => setModalActive('aggiungi')} title="Inserisci Prodotto"/>
            <Bottone onClick={caricaProdotti} title="Carica Prodotti"/>
        </Header>

        <div style={{ display: 'grid',gridTemplateColumns: 'repeat(3, 1fr)',   gap: '20px' }}>
        
        {prodotti.map(p => (
            <CardConteiner>
                <Card id={p.id} nome={p.nome} prezzo={p.prezzo} descrizione={p.descrizione} orario_creazione={p.orario_creazione}/>
                <Bottone onClick={() => { setSelectedProduct(p); setModalActive('modifica'); }} title="Modifica Prezzo"/>
                <Bottone style={{ marginLeft: '5px', backgroundColor: 'red', color: 'white' }} onClick={() => { setSelectedProduct(p); setModalActive('elimina'); }} title="Elimina Prodotto"/>
            </CardConteiner>
        ))}
        </div>
        
        {modalActive === 'aggiungi' && (
        <ModalWrapper title="Nuovo Prodotto" onClose={() => setModalActive(null)} open={false}>
          <FormAggiungi onSave={aggiungiProdotto} onCancel={() => setModalActive(null)} />
        </ModalWrapper>
        )}

        {modalActive === 'modifica' && selectedProduct && (
        <ModalWrapper title="Modifica Prezzo" onClose={() => setModalActive(null)} open={false}>
          <FormModifica prodotto={selectedProduct} onSave={aggiornaPrezzo} onCancel={() => setModalActive(null)} />
        </ModalWrapper>
      )}

      {modalActive === 'elimina' && selectedProduct && (
        <ModalWrapper title="Conferma Eliminazione" onClose={() => setModalActive(null)} open={false}>
          <p>Vuoi davvero eliminare <strong>{selectedProduct.nome}</strong>?</p>
          <button onClick={() => eliminaProdotto(selectedProduct.id!)} style={{ backgroundColor: 'red', color: 'white' }}>Sì, elimina</button>
          <button onClick={() => setModalActive(null)} style={{ marginLeft: '10px' }}>Annulla</button>
        </ModalWrapper>
      )}
    
    </>
    )
}