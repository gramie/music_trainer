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

}

