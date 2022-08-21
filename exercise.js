class Exercise {
    constructor() {
        this.notes = [];
        this.scale = {};
    }

    load(scale, notes) {
        this.scale = scale;
        this.notes = notes;
    }

    getPattern(key) {


    }

    addNote(note, fingering, position = null) {
        const newNote =  { note: note, fingering : fingering };
        if (position) {
            this.notes.splice(position, 0, newNote);
        } else {
            this.notes.push(newNote);
        }
    }

    removeNote(position) {
        this.notes.splice(position, 1);
    }
}