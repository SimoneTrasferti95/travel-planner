import { Request, Response } from "express";
import { prisma } from "../config/prisma";
// Controller per gestire i viaggi , inclusi la creazione, la lettura, l'eliminazione 
// e la gestione dei luoghi associati a ciascun viaggio.
export const getTrips = async (_req: Request, res: Response) => {
  try {
    const trips = await prisma.trip.findMany({
      orderBy: { startDate: "asc" }
    });

    res.json(trips);
  } catch (error) {
    res.status(500).json({ message: "Errore nel recupero dei viaggi" });
  }
};
// Controller per ottenere un viaggio specifico con i suoi luoghi associati 
// con validazione dell'id e gestione degli errori
export const getTripById = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    const trip = await prisma.trip.findUnique({
      where: { id },
      include: { places: true }
    });

    if (!trip) {
      return res.status(404).json({ message: "Viaggio non trovato" });
    }

    res.json(trip);
  } catch (error) {
    res.status(500).json({ message: "Errore nel recupero del viaggio" });
  }
};

// Controller per creare un nuovo viaggio con validazione dei campi obbligatori e gestione degli errori
export const createTrip = async (req: Request, res: Response) => {
  try {
    const { name, startDate, endDate } = req.body;

    if (!name || !startDate || !endDate) {
      return res.status(400).json({ message: "Tutti i campi sono obbligatori" });
    }

    const trip = await prisma.trip.create({
      data: {
        name,
        startDate: new Date(startDate),
        endDate: new Date(endDate)
      }
    });

    res.status(201).json(trip);
  } catch (error) {
    res.status(500).json({ message: "Errore nella creazione del viaggio" });
  }
};
// Controller per eliminare un viaggio specifico con verifica dell'esistenza del viaggio 
// e gestione degli errori
export const deleteTrip = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    const trip = await prisma.trip.findUnique({
      where: { id }
    });

    if (!trip) {
      return res.status(404).json({ message: "Viaggio non trovato" });
    }

    await prisma.trip.delete({
      where: { id }
    });

    res.json({ message: "Viaggio eliminato con successo" });
  } catch (error) {
    res.status(500).json({ message: "Errore nell'eliminazione del viaggio" });
  }
};