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
                result[2] = this.key.makeFlat(result[2]);
                result[5] = this.key.makeFlat(result[5]);
                result[6] = this.key.makeFlat(result[6]);
                break;
            case 'pentatonic-major':
                console.log('getting pentatonic major');
                console.log(result);
                result.splice(6, 1);
                result.splice(3, 1);
                console.log(result);
                break;
            case 'pentatonic-minor':
                result.splice(5, 1);
                result.splice(1, 1);
                break;
            case 'blues':
                result[1] = this.key.makeSharp(result[1]);
                result[6] = this.key.makeFlat(result[6]);
                result.splice(6, 1, this.key.makeFlat(result[6]));
                result.splice(2, 1);
                break;
            default:
                break;
        }

        return result;
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

