import {Audio} from "./audio";
import {Players} from "tone";


export class AudioPlayers {
    constructor() {
        this._audio = new Audio();
        this._players = new Players(this._audio.buffers);
    }

    startPlayer(note) {
        const player = this._players.player(note).toDestination();
        player.start();
    }

    stopPlayer(note) {
        const player = this._players.player(note).toDestination();
        player.stop();
    }
}