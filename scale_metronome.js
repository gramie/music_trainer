class ScaleMetronome {
    constructor(soundEndCallback) {
        this.noteLetters = ['1E', '1F', '1F#', '1G', '1G#', '1A', '1A#', '1B', '2C', '2C#', '2D', '2D#', '2E', '2F', '2F#', '2G', '2G#',
                            '2A', '2A#', '2B', '3C', '3C#', '3D', '3D#', '3E', '3F', '3F#', '3G', '3G#', '3A', '3A#', '3B', '4C', '4C#', 
                            '4D', '4D#', '4E'];

        const sprite = {};
        for (let i = 0; i < this.noteLetters.length; i++) {
            let note = this.noteLetters[i];
            if (note.length === 3) {
                // This is a sharp note, we also want to have a sound for the flat version
                // i.e. G# and A♭
                sprite[this.getFlat(note)] = [i * 1000, 1000];
            }
            sprite[note] = [i * 1000, 1000];
        }

        const self = this;
        this.player = new Howl({
            src: ['Bass_notes.ogg'],
            sprite: sprite,
            onend: function(soundID) {
                const noteID = self.noteQueue[soundID];
                delete(self.noteQueue[soundID]);
                soundEndCallback(noteID);
            },
        });

        this.noteQueue = {};
    }

    getStringNotes(rootNote) {

        const root = this.noteLetters.indexOf(rootNote);
        const result = this.noteLetters.slice(root, root +22);

        return result;
    }

    playNote(note, ID) {
        const soundID = this.player.play(note); 
        this.noteQueue[soundID] = ID;
    }

    getSharp(note) {
        if (note.length === 2) {
            return note;
        }

        const letters = 'CDEFGABC';
        const octave = note[0];
        const noteIndex = letters.lastIndexOf(note[1]);
        const newNote = letters[noteIndex -1];

        return octave + newNote + '#';
    }

    getFlat(note) {
        if (note.length === 2) {
            return note;
        }

        const letters = 'CDEFGABC';
        const octave = note[0];
        const noteIndex = letters.indexOf(note[1]);
        const newNote = letters[noteIndex +1];

        return octave + newNote + '♭';
    }

    getScale(scale, root) {
        let result = [];
        result = scale.positions.split(' ');
    
        if (root === 'F' || root.length === 3 && root[2] === '♭') {
            result = positions.map(a => this.getFlat(a));
        }
        
        return result;
    }

}