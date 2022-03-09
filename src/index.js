import {Instrument} from 'piano-chart'
import {altNames} from "./notes";
import {AudioPlayers} from "./players";
import {context} from "tone";


let piano;
let audioPlayers;
const octave = 4;

const noteMap = {
    "a": "C",
    "w": "C#",
    "s": "D",
    "e": "D#",
    "d": "E",
    "f": "F",
    "t": "F#",
    "g": "G",
    "y": "G#",
    "h": "A",
    "u": "B#",
    "j": "B",
};

document.addEventListener("DOMContentLoaded", function () {
    audioPlayers = new AudioPlayers();
    context.resume().then(() => console.log("resumed"));
    piano = new Instrument(document.getElementById('pianoContainer'),
        {
            showNoteNames: "onpress",
            // startOctave: 3,
            // endOctave: 5,
            // highlightedNotes: ["D", "E", "F#", "G", "Ab", "B", "C#"],
            // specialHighlightedNotes: [{ note: "D", accidental: 'bb' }],
            // showOctaveNumbers: true,
            // keyPressStyle: "vivid",
            // vividKeyPressColor: "#f33"
        });
    piano.create();
    piano.addKeyMouseDownListener((note) => {
        pressDown(note);
    });
    piano.addKeyMouseUpListener((note) => {
        pressOff(note);
    });
});

document.addEventListener("keydown", function(evt) {
    if (evt.repeat) {
        return;
    }
    if (!(evt.key in noteMap)) {
        return;
    }
    const note = `${noteMap[evt.key]}${octave}`;
    pressDown(note);
});

document.addEventListener("keyup", function(evt) {
    if (!(evt.key in noteMap)) {
        return;
    }
    const note = `${noteMap[evt.key]}${octave}`;
    pressOff(note);
});

function pressDown(note) {
    piano.keyDown(note);
    if (note in altNames) {
        note = altNames[note];
    }
    audioPlayers.startPlayer(note);
}

function pressOff(note) {
    piano.keyUp(note);
    if (note in altNames) {
        note = altNames[note];
    }
    audioPlayers.stopPlayer(note);
}
