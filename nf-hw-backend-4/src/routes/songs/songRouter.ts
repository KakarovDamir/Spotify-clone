import { Router } from 'express';
import multer from 'multer';
import SongController from './songController';

const upload = multer({ storage: multer.memoryStorage() });
const songRouter = Router();

songRouter.get('/', SongController.getAllSongs);
songRouter.post('/', upload.single('file'), SongController.createSong);
songRouter.put('/:id', SongController.updateSong);
songRouter.delete('/:id', SongController.deleteSong);
songRouter.get('/artists/:id', SongController.getSongsByArtist);
songRouter.get('/albums/:id', SongController.getSongsByAlbum);
songRouter.get('/playlists/:id', SongController.getSongsByPlaylist);



export default songRouter;
