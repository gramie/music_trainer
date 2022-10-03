class Instrument {
    constructor() {
        this.fingerings = {};
        this.notes = {};
    }

    getFingerings() {

    }

    getNotes() {

    }

    getFingerings(scale) {
        return Object.keys(this.fingerings);
    }

    getPatterns(scale) {
        return Object.keys(this.fingerings[scale]);
    }

    getNotesFromPattern(key, scale, pattern) {
        const result = [];

        const fingering = this.fingerings[scale][pattern];
        const root = fingering.root
        for (const item in fingering.notes) {
            const parts = item.split('-');
            result.push({ 
                string: parts[0],
                fret: parts[1],
                finger: (parts[1] == 0) ? 0 : parts[2]
            });
        }

        return result;
    }

    getOffset(note) {
        const notes = this.getNotes();
        for (const stringIdx in notes) {
            const idx = notes[stringIdx].indexOf(note);
            if (idx > -1) {
                return idx;
            }
        }

        return 0;
    }
}

class BassGuitar extends Instrument {
    constructor() {
        this.fingerings =  {
            "major" : {
                "cage": {
                    "root": "1F",
                    "notes" : [
                        "1-1-2", "1-3-4", 
                        "2-0-1", "2-1-2", "2-3-4",
                        "3-0-1", "3-2-3", "3-3-4",
                        "4-0-1", "4-2-3", "4-3-4", "4-5-1", "4-7-3", "4-9-3", "4-10-4"
                    ]
                },
                "linear": {
                    "root": "1E",
                    "notes": [
                        "1-0-1", "1-2-1", "1-4-3", "1-5-1", "1-7-3", "1-9-1", "1-10-3", "1-12-4", "1-14-1", "1-16-3", "1-17-4"
                    ]
                }
            },
            "minor" : {
                "cage": {

                },
                "linear" : {

                }
            }
        };
    }

    getNotes() {
        return [
            ['1E', '1F', '1F#', '1G', '1G#', '1A', '1B♭', '1B', '2C', '2C#', '2D', '2E♭',
             '2E', '2F', '2F#', '2G', '2G#', '2A', '2B♭', '2B', '3C', '2C#', '2D', '2E♭'],
            ['1A', '1B♭', '1B', '2C', '2C#', '2D', '2E♭', '2E', '2F', '2F#', '2G', '2G#', 
             '2A', '2B♭', '2B', '3C', '3C#', '3D', '3E♭', '3E', '3F', '3F#', '3G', '3G#'],
            ['2D', '2E♭', '2E', '2F', '2F#', '2G', '2G#', '2A', '2B♭', '2B', '3C', '3C#', 
             '3D', '3E♭', '3E', '3F', '3F#', '3G', '3G#', '3A', '3B♭', '3B', '4C', '4C#'],
            ['2G', '2G#', '2A', '2B♭', '2B', '3C', '3C#', '3D', '3E♭', '3E', '3F', '3F#', 
             '3G', '3G#', '3A', '3B♭', '3B', '4C', '4C#', '4D', '4E♭', '4E', '4F', '4F#']
        ];
    }
}

