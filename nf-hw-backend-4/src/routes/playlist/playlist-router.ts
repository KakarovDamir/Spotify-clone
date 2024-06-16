import { Router } from 'express';
import playlistController from './playlist-controller';

const PlaylistRouter: Router = Router();

PlaylistRouter.post('/', playlistController.createPLaylist);
PlaylistRouter.get('/', playlistController.getAllPLaylists);
PlaylistRouter.get('/:id', playlistController.getPLaylistById);
PlaylistRouter.put('/:id', playlistController.updatePLaylist);
PlaylistRouter.delete('/:id', playlistController.deletePLaylist);

export default PlaylistRouter;
