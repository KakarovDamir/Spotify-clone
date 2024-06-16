import { Router } from 'express';
import albumController from './album-controller';

const albumRouter: Router = Router();

albumRouter.post('/', albumController.createAlbum);
albumRouter.get('/', albumController.getAllAlbums);
albumRouter.get('/:id', albumController.getAlbumById);
albumRouter.put('/:id', albumController.updateAlbum);
albumRouter.delete('/:id', albumController.deleteAlbum);

export default albumRouter;
