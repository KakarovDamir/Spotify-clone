import { Request, Response } from 'express';
import albumService from './playlist-service';

class PLaylistController {
  public async createPLaylist(req: Request, res: Response): Promise<void> {
    try {
      const album = await albumService.createPLaylist(req.body);
      res.status(201).json(album);
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'An unknown error occurred' });
      }
    }
  }

  public async getAllPLaylists(req: Request, res: Response): Promise<void> {
    try {
      const albums = await albumService.getAllPLaylists();
      res.status(200).json(albums);
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'An unknown error occurred' });
      }
    }
  }

  public async getPLaylistById(req: Request, res: Response): Promise<void> {
    try {
      const album = await albumService.getPLaylistById(req.params.id);
      if (album) {
        res.status(200).json(album);
      } else {
        res.status(404).json({ message: 'Album not found' });
      }
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'An unknown error occurred' });
      }
    }
  }

  public async updatePLaylist(req: Request, res: Response): Promise<void> {
    try {
      const album = await albumService.updatePLaylist(req.params.id, req.body);
      if (album) {
        res.status(200).json(album);
      } else {
        res.status(404).json({ message: 'Album not found' });
      }
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'An unknown error occurred' });
      }
    }
  }

  public async deletePLaylist(req: Request, res: Response): Promise<void> {
    try {
      const album = await albumService.deletePLaylist(req.params.id);
      if (album) {
        res.status(200).json({ message: 'Album deleted successfully' });
      } else {
        res.status(404).json({ message: 'Album not found' });
      }
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'An unknown error occurred' });
      }
    }
  }
}

export default new PLaylistController();
