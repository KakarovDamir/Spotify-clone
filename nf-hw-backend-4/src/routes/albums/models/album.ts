import mongoose, { Document, Schema } from 'mongoose';

export interface IAlbum extends Document {
  title: string;
  artist: string;
  img: string;
}

const AlbumSchema: Schema = new Schema({
  title: { type: String, required: true },
  artist: { type: String, required: true },
  img: { type: String, required: true }
});

export default mongoose.model<IAlbum>('Album', AlbumSchema);
