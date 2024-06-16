import Artist, { IArtist } from './models/artist';

class ArtistService {
   async createArtist(artistData: IArtist): Promise<IArtist> {
    const artist = new Artist(artistData);
    return await artist.save();
  }

   async getAllArtists(): Promise<IArtist[]> {
    return await Artist.find();
  }

   async getArtistById(id: string): Promise<IArtist | null> {
    return await Artist.findById(id);
  }

   async updateArtist(id: string, artistData: Partial<IArtist>): Promise<IArtist | null> {
    return await Artist.findByIdAndUpdate(id, artistData, { new: true });
  }

   async deleteArtist(id: string): Promise<IArtist | null> {
    return await Artist.findByIdAndDelete(id);
  }
  
}

export default new ArtistService();
