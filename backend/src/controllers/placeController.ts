
import { Request, Response } from "express";
import { prisma } from "../config/prisma";
// Controller per ottenere tutti i luoghi associati a un viaggio specifico , 
// ordinati per id in ordine crescente
export const getPlacesByTrip = async (req: Request, res: Response) => {  
  try {
    const tripId = Number(req.params.tripId);

    const places = await prisma.place.findMany({
      where: { tripId },
      orderBy: { id: "asc" }
    });

    res.json(places);
  } catch (error) {
    res.status(500).json({ message: "Errore nel recupero dei luoghi" });
  }
};

// Controller per creare un nuovo luogo associato a un viaggio specifico 
// con validazione del nome obbligatorio e verifica dell'esistenza del viaggio

export const createPlace = async (req: Request, res: Response) => {
  try {
    const tripId = Number(req.params.tripId);
    const { name, description } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Il nome è obbligatorio" });
    }

    const trip = await prisma.trip.findUnique({  
      where: { id: tripId }
    });

    if (!trip) {
      return res.status(404).json({ message: "Viaggio non trovato" });
    }

    const place = await prisma.place.create({
      data: {
        name,
        description,
        tripId
      }
    });

    res.status(201).json(place);
  } catch (error) {
    res.status(500).json({ message: "Errore nella creazione del luogo" });
  }
};
// Controller per aggiornare lo stato di un luogo specifico con validazione dello stato 
// e verifica dell'esistenza del luogo
export const updatePlaceStatus = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const { status } = req.body;

    if (status !== "DA_VEDERE" && status !== "VISITATO") {
      return res.status(400).json({ message: "Stato non valido" });
    }

    const place = await prisma.place.findUnique({
      where: { id }
    });

    if (!place) {
      return res.status(404).json({ message: "Luogo non trovato" });
    }

    const updatedPlace = await prisma.place.update({
      where: { id },
      data: { status }
    });

    res.json(updatedPlace);
  } catch (error) {
    res.status(500).json({ message: "Errore nell'aggiornamento dello stato" });
  }
};
// Controller per eliminare un luogo specifico con verifica dell'esistenza del luogo e gestione degli errori
export const deletePlace = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    const place = await prisma.place.findUnique({
      where: { id }
    });

    if (!place) {
      return res.status(404).json({ message: "Luogo non trovato" });
    }

    await prisma.place.delete({
      where: { id }
    });

    res.json({ message: "Luogo eliminato con successo" });
  } catch (error) {
    res.status(500).json({ message: "Errore nell'eliminazione del luogo" });
  }
};