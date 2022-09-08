class Key {
    constructor(root = null) {
        this.root = root;
        this.signatures = {
            'C' : ['C', 'D', 'E', 'F', 'G', 'A', 'B'],
            'G' : ['G', 'A', 'B', 'C', 'D', 'E', 'F#'],
            'D' : ['D', 'E', 'F#', 'G', 'A', 'B', 'C#'],
            'A' : ['A', 'B', 'C#', 'D', 'E', 'F#', 'G#'],
            'E' : ['E', 'F#', 'G#', 'A', 'B', 'C#', 'D#'],
            'B' : [ 'B', 'C#', 'D#', 'E', 'F#', 'G#', 'A#'],
            'F#' : ['F#', 'G#', 'A#', 'B', 'C#', 'D#', 'E#'],
            'C#' : ['C#', 'D#', 'E#', 'F#', 'G#', 'A#', 'B#'],
            'F' : ['F', 'G', 'A', 'B♭', 'C', 'D', 'E', ],
            'B♭' : ['B♭', 'C', 'D', 'E♭', 'F', 'G', 'A'],
            'E♭' : ['F', 'G', 'A♭', 'B♭', 'C', 'D', 'E♭'],
            'A♭' : ['A♭', 'B♭', 'C', 'D♭', 'E♭', 'F', 'G'],
            'D♭' : ['D♭', 'E♭', 'F', 'G♭', 'A♭', 'B♭', 'C'],
            'G♭' : ['G♭', 'A♭', 'B♭', 'C♭', 'D♭', 'E♭', 'F'],
            'C♭' : ['C♭', 'D♭', 'E♭', 'F♭', 'G♭', 'A♭', 'B♭'],
        };

        const equivalents = {
            'A#' : 'B♭',
            
        }

        this.sharps = ['A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A'];
        this.flats = ['B', 'C', 'D♭', 'D', 'E♭', 'E', 'F', 'G♭', 'G', 'A♭', 'A', 'B♭', 'B'];


        if (!root) {
            root = 'C';
        }
        this.notes = this.signatures[root];
    }

    makeSharp(note) {
        const accidentals = this.keyHasFlats(this.root) ? this.flats : this.sharps;
        
        return accidentals[accidentals.indexOf(note) +1];
    }

    makeFlat(note) {
        let result = note;

        const notes = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
        const currentIdx = notes.indexOf(note[0]);
        if (note.length === 1) {
            if (note === 'C' || note === 'F') {
                result = notes[currentIdx -1];
            } else {
                result = note + '♭';
            }
        }
        if (note[1] === '#') {
            result = note[0];
        } else if (note[1] === '♭') {
            result = notes[currentIdx -1];
        }

        return result;
    }

    getKeys() {
        return Object.keys(this.signatures);
    }

    getNotes() {
        return this.notes;
    }

    keyHasFlats(key) {
        const flatKeys = ['F', 'B♭', 'E♭', 'A♭', 'D♭', 'G♭', 'C♭', 'F♭']; 
        return flatKeys.indexOf(key) > -1;
    }
}