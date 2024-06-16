import mongoose, { Document, Schema } from 'mongoose';

export interface IPlaylist extends Document {
  title: string;
  img: string;
}

const PlaylistSchema: Schema = new Schema({
  title: { type: String, required: true },
  img: { type: String, required: true }
});

export default mongoose.model<IPlaylist>('Playlist', PlaylistSchema);
