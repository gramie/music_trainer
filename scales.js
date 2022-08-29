class Scale {
    constructor() {
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
        const result = this.scales.get(root).split(' ');
        switch(type) {
            case 'minor':
                result[2] = this.makeFlat(root, result[2]);
                result[5] = this.makeFlat(root, result[5]);
                result[6] = this.makeFlat(root, result[6]);
                break;
            case 'pentatonic-major':
                result.splice(6, 1);
                result.splice(3, 1);
                break;
            case 'pentatonic-minor':
                result.splice(5, 1);
                result.splice(1, 1);
                break;
            case 'blues':
                result[2] = this.makeFlat(root, result[2]);
                result[6] = this.makeFlat(root, result[6]);
                result.splice(4, 0, this.makeSharp(root, result[3]));
                result.splice(6, 1);
                result.splice(1, 1);
                break;
            case 'chromatic':
                result.splice(6, 0, this.makeSharp(root, result[5]));
                result.splice(5, 0, this.makeSharp(root, result[4]));
                result.splice(4, 0, this.makeSharp(root, result[3]));
                result.splice(2, 0, this.makeSharp(root, result[1]));
                result.splice(1, 0, this.makeSharp(root, result[0]));
                break;
            default:
                break;
        }
        return result;
    }
}