import Album, { IAlbum } from './models/album';

class AlbumService {
    async createAlbum(album: IAlbum): Promise<IAlbum> {
        const newAlbum = new Album(album);
        return await newAlbum.save();
  }

    async getAllAlbums(): Promise<IAlbum[]> {
        return await Album.find({});
  }

    async getAlbumById(_id: string): Promise<IAlbum | null> {
        return await Album.findById(_id);
  }

    async updateAlbum(_id: string, album: Partial<IAlbum>): Promise<IAlbum | null> {
        return await Album.findByIdAndUpdate(_id, album, { new: true });
  }

    async deleteAlbum(_id: string): Promise<IAlbum | null> {
        const album = await Album.findById(_id);
        if (!album) {
            return null;
        }
    await Album.deleteOne({ _id:_id });
    return album;
  }
}

export default new AlbumService();
