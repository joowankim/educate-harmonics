import Notes from "./notes";
import {resolve} from "path";
import {ToneAudioBuffer} from "tone";

export class Audio {
    constructor() {
        this._buffers = {};
        for (let i = 0, len = Notes.notes.length; i < len; i++) {
            let n = Notes.notes[i];
            this._buffers[n] = new ToneAudioBuffer(resolve(__dirname, './educate-harmonics/piano-mp3/' + n + '.mp3'));
        }
    }

    get buffers() {
        return this._buffers;
    }
}
