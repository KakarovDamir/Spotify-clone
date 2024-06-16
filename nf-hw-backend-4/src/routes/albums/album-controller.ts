import { Request, Response } from 'express';
import albumService from './album-service';

class AlbumController {
  public async createAlbum(req: Request, res: Response): Promise<void> {
    try {
      const album = await albumService.createAlbum(req.body);
      res.status(201).json(album);
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'An unknown error occurred' });
      }
    }
  }

  public async getAllAlbums(req: Request, res: Response): Promise<void> {
    try {
      const albums = await albumService.getAllAlbums();
      res.status(200).json(albums);
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'An unknown error occurred' });
      }
    }
  }

  public async getAlbumById(req: Request, res: Response): Promise<void> {
    try {
      const album = await albumService.getAlbumById(req.params.id);
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

  public async updateAlbum(req: Request, res: Response): Promise<void> {
    try {
      const album = await albumService.updateAlbum(req.params.id, req.body);
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

  public async deleteAlbum(req: Request, res: Response): Promise<void> {
    try {
      const album = await albumService.deleteAlbum(req.params.id);
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

export default new AlbumController();
