class Scale {
    constructor() {
        this.notes = ['C', 'C#', 'D', 'E♭', 'E', 'F', 'F#', 'G', 'G#', 'A', 'B♭', 'B'];

        this.scales = new Map([
            ['C', 'C D E F G A B'],
            ['C#', 'C# D# E# F# G# A# B#'],
            ['D', 'D E F# G A B C#'],
            ['E♭', 'E♭ F G A♭ B♭ C D'],
            ['E', 'E F# G# A B C# D#'],
            ['F', 'F G A B♭ C D E'],
            ['F#', 'F# G# A# B C# D# E#'],
            ['G', 'G A B C D E F#'],
            ['A♭', 'A♭ B♭ C D♭ E♭ F G'],
            ['A', 'A B C# D E F# G#'],
            ['B♭', 'B♭ C D E♭ F G, A'],
            ['B', 'B C# D# E F# G# A#'],
        ]);

    }

    getAvailableKeys() {
        return this.scales.keys;
    }

    makeSharp(root, note) {
        const noteNames = 'ABCDEFGA';
        if (this.isFlat(note)) {
            return note[0];
        }
        if (this.isSharp(note) || note === 'B' || note === 'E') {
            const idx = noteNames.indexOf(note[0]);
            return noteNames[idx +1];
        }
        return note + '#';
    }

    makeFlat(root, note) {
        const noteNames = 'ABCDEFGA';
        if (this.isSharp(note)) {
            return note[0];
        }
        if (this.isFlat(note) || note === 'C' || note === 'D') {
            const idx = noteNames.indexOf(note[0], 1);
            return noteNames[idx -1];
        }
        return note + '♭';
    }

    isSharp(note) {
        return note.length === 2 && note[1] === '#';gi
    }

    isFlat(note) {
        return note.length === 2 && note[1] === '♭';
    }

    keyUsesFlats(root) {
        return (root === 'F' || this.isFlat(root));
    }

    render() {
        let result = '';
        for (const note of this.scales.keys()) {
            result += `<div class="scale-note" data-note="${note}">${note}</div>`;
        }

        return result;
    }

    getNotes(root, type) {
        const result = [];

        const doubleOctave = [...this.notes, ...this.notes];
        const startOfOctave = doubleOctave.indexOf(root);
        const octave = doubleOctave.slice(startOfOctave, startOfOctave + 12);
        const offsets = this.getScaleOffsets(type);
        for (let offset of offsets) {
            result.push(octave[offset]);
        }

        console.log("Got notes for " + root + " " + type, result);
        if (this.keyUsesFlats(root)) {
            this.correctSharpsFlats(root, type, result);
        }
        return result;
    }

    /**
     * Any flat scale should only have flats
     * The F scale also has flats
     * Otherwise leave any sharps alone
     * @param {string} root 
     * @param {Array} notesOfScale 
     */
    correctSharpsFlats(root, type, notesOfScale) {
        if ((root.length === 2 && root[1] === '♭') || root === 'F' || type === 'minor') {
            console.log("Correcting " + root + ", " + type, notesOfScale);
            const notes = 'ABCDEFGA';
            for (const noteIdx in notesOfScale) {
                const note = notesOfScale[noteIdx];
                if (note.length === 2 && note[1] === '#') {
                    const idx = notes.indexOf(note[0]);
                    notesOfScale[noteIdx] = notes[idx+1] + '♭';
                }
            }
            console.log("Finished correcting", notesOfScale);
        }
    }

    getScaleOffsets(type) {
        const offsets = {
            'major' : [0, 2, 4, 5, 7, 9, 11],
            'minor' : [0, 2, 3, 5, 7, 8, 10],
            'pentatonic-major': [0, 2, 4, 7, 9],
            'pentatonic-minor': [0, 4, 5, 7, 11],
            'blues': [0, 3, 5, 6, 7, 10],
            'chromatic': [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
        }
        return offsets[type];
    }
}

