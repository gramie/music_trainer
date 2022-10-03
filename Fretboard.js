class Fretboard {
    constructor(scaleData, notes) {
        this.scaleData = scaleData;
        this.notes = notes;
    }

    getFingerings(key, kind, shape) {
        const fingering = this.fingerings[kind][shape];
        
    }

    getNoteFromFretboard(key, string, fret) {
        const note = this.notes[string][fret];
        return { octave: note[0], note: note.substr(1) };
    }
}