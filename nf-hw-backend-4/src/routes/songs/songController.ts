import { Request, Response } from 'express';
import SongService from './songService';
import multer from 'multer';

const storage = multer.memoryStorage();
const upload = multer({ storage });

class SongController {
  async getAllSongs(req: Request, res: Response): Promise<void> {
    try {
      const songs = await SongService.getAllSongs();
      res.json(songs);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching songs', error });
    }
  }

  async createSong(req: Request, res: Response): Promise<void> {
    try {
      const { title, artist, album, img, liked, playlists } = req.body;
      const file = (req.file as Express.Multer.File).buffer;
      const originalName = (req.file as Express.Multer.File).originalname;

      if (!file || !originalName) {
        res.status(400).json({ message: 'No file uploaded' });
        return;
      }

      const song = await SongService.createSong(title, artist, album, img, file, originalName, liked, playlists);
      res.status(201).json(song);
    } catch (error) {
      res.status(500).json({ message: 'Error creating song', error });
    }
  }

  async updateSong(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const { title, artist, album, img, liked, playlists } = req.body;

      const song = await SongService.updateSong(id, title, artist, album, img, liked, playlists);
      if (!song) {
        res.status(404).json({ message: 'Song not found' });
        return;
      }

      res.json(song);
    } catch (error) {
      res.status(500).json({ message: 'Error updating song', error });
    }
  }

  async deleteSong(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const song = await SongService.deleteSong(id);

      if (!song) {
        res.status(404).json({ message: 'Song not found' });
        return;
      }

      res.status(200).json({ message: 'Song deleted' });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting song', error });
    }
  }

  async getSongsByArtist(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const songs = await SongService.getSongsByArtist(id);
      res.json(songs);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching songs by artist', error });
    }
  }

  async getSongsByAlbum(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const songs = await SongService.getSongsByAlbum(id);
      res.json(songs);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching songs by album', error });
    }
  }

  async getSongsByPlaylist(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const songs = await SongService.getSongsByPlaylist(id);
      res.json(songs);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching songs by playlist', error });
    }
  }
}

export default new SongController();
