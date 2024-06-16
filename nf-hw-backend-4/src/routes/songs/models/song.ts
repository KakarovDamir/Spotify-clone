import mongoose, { Document, Schema } from 'mongoose';

export interface ISong extends Document {
  title: string;
  artist: mongoose.Types.ObjectId;
  album: mongoose.Types.ObjectId;
  url: string;
  img: string;
  liked: boolean;
  playlists: mongoose.Types.ObjectId[];
}

const SongSchema: Schema = new Schema({
  title: { type: String, required: true },
  artist: { type: Schema.Types.ObjectId, ref: 'Artist', required: true },
  album: { type: Schema.Types.ObjectId, ref: 'Album', required: true },
  url: { type: String, required: true },
  img: { type: String, required: true },
  liked: { type: Boolean, default: false },
  playlists: [{ type: Schema.Types.ObjectId, ref: 'Playlist' }]
});

export default mongoose.model<ISong>('Song', SongSchema);
