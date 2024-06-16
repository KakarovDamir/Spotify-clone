import { Router } from 'express';
import artistController from './artist-controller';

const artistRouter = Router();

artistRouter.post('/', artistController.createArtist);
artistRouter.get('/', artistController.getAllArtists);
artistRouter.get('/:id', artistController.getArtistById);
artistRouter.put('/:id', artistController.updateArtist);
artistRouter.delete('/:id', artistController.deleteArtist);

export default artistRouter;
