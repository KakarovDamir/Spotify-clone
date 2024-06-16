import Song, { ISong } from './models/song';
import { uploadFile, deleteFile } from '../../middlewares/s3-middlewares';
import mongoose from 'mongoose';

class SongService {
  async getAllSongs(): Promise<ISong[]> {
    return await Song.find();
  }

  async createSong(title: string, artist: mongoose.Types.ObjectId, album: mongoose.Types.ObjectId, img: string, file: Buffer, originalName: string, liked: boolean, playlists: mongoose.Types.ObjectId[]): Promise<ISong> {
    const Bucket = 'nf-hw-songs';
    const Key = `${originalName}`;
    // await uploadFile(Bucket, Key, file);

    const song = new Song({
      title,
      artist,
      album,
      url: `https://your-cloudfront-url/${Key}`,
      img,
      liked,
      playlists
    });

    return await song.save();
  }

  async updateSong(id: string, title: string, artist: mongoose.Types.ObjectId, album: mongoose.Types.ObjectId, img: string, liked: boolean, playlists: mongoose.Types.ObjectId[]): Promise<ISong | null> {
    return await Song.findByIdAndUpdate(id, { title, artist, album, img, liked, playlists }, { new: true }).populate('artist album playlists');
  }

  async deleteSong(id: string): Promise<ISong | null> {
    const song = await Song.findById(id);
    if (!song) {
      return null;
    }

    const Key = song.url.split('/').pop();
    await deleteFile('nf-hw-songs', Key!);

    await Song.deleteOne({ _id: id });
    return song;
  }

  async getSongsByArtist(artistId: string): Promise<ISong[]> {
    return await Song.find({ artist: artistId });
  }

  async getSongsByAlbum(albumId: string): Promise<ISong[]> {
    return await Song.find({ album: albumId });
  }

  async getSongsByPlaylist(playlistId: string): Promise<ISong[]> {
    return await Song.find({ playlists: playlistId });
  }
}

export default new SongService();
