import { Request, Response } from 'express';
import artistService from './artist-service';

class ArtistController {
  public async createArtist(req: Request, res: Response): Promise<void> {
    try {
      const artist = await artistService.createArtist(req.body);
      res.status(201).json(artist);
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'An unknown error occurred' });
      }
    }
  }

  public async getAllArtists(req: Request, res: Response): Promise<void> {
    try {
      const artists = await artistService.getAllArtists();
      res.status(200).json(artists);
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'An unknown error occurred' });
      }
    }
  }

  public async getArtistById(req: Request, res: Response): Promise<void> {
    try {
      const artist = await artistService.getArtistById(req.params.id);
      if (artist) {
        res.status(200).json(artist);
      } else {
        res.status(404).json({ message: 'Artist not found' });
      }
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'An unknown error occurred' });
      }
    }
  }

  public async updateArtist(req: Request, res: Response): Promise<void> {
    try {
      const artist = await artistService.updateArtist(req.params.id, req.body);
      if (artist) {
        res.status(200).json(artist);
      } else {
        res.status(404).json({ message: 'Artist not found' });
      }
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'An unknown error occurred' });
      }
    }
  }

  public async deleteArtist(req: Request, res: Response): Promise<void> {
    try {
      const artist = await artistService.deleteArtist(req.params.id);
      if (artist) {
        res.status(200).json({ message: 'Artist deleted successfully' });
      } else {
        res.status(404).json({ message: 'Artist not found' });
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

export default new ArtistController();
