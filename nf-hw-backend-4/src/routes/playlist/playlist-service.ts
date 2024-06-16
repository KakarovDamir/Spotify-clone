import Album, { IPlaylist } from './models/playlist';

class PLaylistService {
    async createPLaylist(album: IPlaylist): Promise<IPlaylist> {
        const newAlbum = new Album(album);
        return await newAlbum.save();
  }

    async getAllPLaylists(): Promise<IPlaylist[]> {
        return await Album.find({});
  }

    async getPLaylistById(_id: string): Promise<IPlaylist | null> {
        return await Album.findById(_id);
  }

    async updatePLaylist(_id: string, album: Partial<IPlaylist>): Promise<IPlaylist | null> {
        return await Album.findByIdAndUpdate(_id, album, { new: true });
  }

    async deletePLaylist(_id: string): Promise<IPlaylist | null> {
        const album = await Album.findById(_id);
        if (!album) {
            return null;
        }
    await Album.deleteOne({ _id:_id });
    return album;
  }
}

export default new PLaylistService();
