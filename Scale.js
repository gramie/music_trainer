class Scale {
    constructor(root, type) {
        this.key = new Key(root);
        this.notes = this.getScaleNotes(this.key.notes, type);
    }

    render() {
        let result = '';
        for (const note of this.scales.keys()) {
            result += `<div class="scale-note" data-note="${note}">${note}</div>`;
        }

        return result;
    }

    getNotes(key, type) {
        const result = [];

        const keyNotes = key.notes;


        const offsets = this.getScaleOffsets(type);
        for (let offset of offsets) {
            result.push(key.notes[offset]);
        }

        return result;
    }

    getScaleNotes(notes, type) {
        const result = [...notes];
        console.log(type);
        switch (type) {
            case 'minor':
                this.makeMinor(result);
                break;
            case 'pentatonic-major':
                result.splice(6, 1);
                result.splice(3, 1);
                break;
            case 'pentatonic-minor':
                this.makeMinor(result);
                result.splice(5, 1);
                result.splice(1, 1);
                break;
            case 'blues':
                this.makeMinor(result);
                result.splice(1, 1);
                result.splice(3, 0, this.key.makeFlat(result[3]));
                result.splice(5, 1);
                break;
            default:
                break;
        }

        return result;
    }

    makeMinor(notes) {
        notes[2] = this.key.makeFlat(notes[2]);
        notes[5] = this.key.makeFlat(notes[5]);
        notes[6] = this.key.makeFlat(notes[6]);
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

