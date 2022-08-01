class BassFretboard {
    constructor(audioFile) {

    }

    render() {
        let result = '';
        const strings = ['G', 'D', 'A', 'E', 'X'];
        for (const string of strings) {
            result += '<div class="string">';
            for (let fret = 0; fret < 23; fret++) {
                result += '<div id="fret-' + string + '-' + fret + '" class="fret"></div>';
            }
            result += '</div>';
        }
        return result;
    }

    setFingerMarker(string, fret, value, isOctave) {
        const selector = '#bass-fretboard #fret-' + string + '-' + fret;
        const classText = isOctave 
            ? 'finger-marker octave'
            : 'finger-marker';
        const note = this.getNoteFromFretboard(string, fret);
        const contents = value == '' 
            ? '' 
            : `<div id="marker-${string}-${fret}" 
                    class="${classText}"
                    data-string="${string}"
                    data-fret="${fret}"
                    data-note="${note}">
                    ${value}
                </div>`;
        $(selector).html(contents);
    }


    getPattern(scaleType, root, form, fingering = 'default') {
        const scale = this.getScale(scaleType);

        const scaleForm = scale[form];
        const rootOffset = scaleForm.offsets.split(' ').indexOf(root);
        const scalePositions = scaleForm.positions.split(' ');
        const fingeringToUse = scaleForm.fingers[rootOffset]
            ? rootOffset : fingering;
        const fingers = scaleForm.fingers[fingeringToUse].split(' ');

        const scaleNotes = [];
        for (let i = 0; i < scalePositions.length; i++) {
            const parts = scalePositions[i].split('-');
            scaleNotes.push({
                string: parts[0],
                fretIndex: parseInt(parts[1]) + rootOffset,
                finger: fingers[i]
            })
        }

        const validScaleNotes = scaleNotes.filter(a => a.fretIndex > -1 && a.fretIndex < 23);

        return validScaleNotes;
    }

    getScaleNames() {
        const scales = this.getScales();
        return Object.keys(scales);
    }

    getScales() {
        return {
            'major': {
                cage: {
                    offsets: 'F F# G A♭ A B♭ B C C# D E♭ E',
                    positions: 'E-1 E-3 A-0 A-1 A-3 D-0 D-2 D-3 G-0 G-2 G-3 G-5 G-7 G-9 G-10',
                    fingers: {
                        default: '2 4 0 2 4 0 3 4 0 3 4 1 3 3 4',
                        0: '1 3 0 1 3 0 2 3 0 2 3 1 3 3 4',
                    }
                },
                linear: {
                    offsets : 'E F F# G G# A B♭ C C# D E♭',
                    positions: 'E-0 E-2 E-4 E-5 E-7 E-9 E-11 E-12 E-14 E-16 E-17 E-19 E-21',
                    fingers: {
                        default: '0 1 3 4 1 1 3 4 1 3 4 1 3',
                    }
                }
            },
            'minor': {
                cage: {
                    offsets: 'E F F# G A♭ A B♭ B C C# D E♭',
                    positions: 'E-0 E-2 E-3 A-0 A-2 A-3 D-0 D-2 D-4 D-5 G-2 G-4 G-5 G-7 G-9',
                    fingers: {
                        default: '0 3 4 0 3 4 0 1 3 4 1 3 4 2 4',
                    }
                },
                linear: {

                }
            },
            'pentatonic-major': {
                cage: {
                    offsets: 'E F F# G A♭ A B♭ B C C# D E♭',
                    positions: 'E-0 E-2 E-4 A-2 A-4 D-2 D-4 D-6 G-4 G-6 G-9',
                    fingers: {
                        default: '0 1 3 1 3 1 1 3 1 1 4',
                    }
                },
                linear: {
                    offsets: 'E F F# G A♭ A B♭ B C C# D E♭',
                    positions: 'E-0 E-2 E-4 4-7 E-9 E-11',
                    fingers: {
                        default: '0 4 1 4 1 4',
                    }
                }
            },
            'pentatonic-minor': {
                cage: {
                    offsets: 'E F F# G A♭ A B♭ B C C# D E♭',
                    positions: 'E-0 E-3 A-0 A-2 D-0 D-2 D-5 G-2 G-4 G-7 G-9',
                    fingers: {
                        default: '1 4 1 3 1 1 4 1 3 1 3',
                    }
                },
                linear: {

                }
            },
            'blues': {
                cage: {
                    offsets: 'E F F# G A♭ A B♭ B C C# D E♭',
                    positions: 'E-2 A-0 A-2 A-3 A-4 D-2 D-4 G-2 G-4 G-5 G-6 G-9 G-11',
                    fingers: {
                        default: '3 0 1 2 3 1 3 1 1 2 3 1 3',
                    }
                },
            },
            'chromatic': {
                cage: {
                    offsets: 'G A♭ A B♭ B C C# D E♭ F F#',
                    positions: 'E-3 E-4 E-5 E-6 A-2 A-3 A-4 A-5 D-1 D-3 D-3 D-4 G-0 G-1 G-2 G-3',
                    fingers: {
                        default: '1 2 3 4 1 2 3 4 1 2 3 4 0 1 2 3',
                    }
                },
            },
        };
    }

    getScale(scaleType) {
        const scales = this.getScales();
        return scales[scaleType];
    }

    getNoteFromFretboard(string, fret) {
        const stringNotes = this.getStringNotes(string);
        return stringNotes[fret];
    }

    getStringNotes(string) {
        const notes = {
            E: ['1E', '1F', '1F#', '1G', '1G#', '1A', '1B♭', '1B', '2C', '2C#', '2D', '2E♭',
                '2E', '2F', '2F#', '2G', '2G#', '2A', '2B♭', '2B', '3C', '2C#', '2D', '2E♭'],
            A: ['1A', '1B♭', '1B', '2C', '2C#', '2D', '2E♭', '2E', '2F', '2F#', '2G', '2G#', 
                '2A', '2B♭', '2B', '3C', '3C#', '3D', '3E♭', '3E', '3F', '3F#', '3G', '3G#'],
            D: ['2D', '2E♭', '2E', '2F', '2F#', '2G', '2G#', '2A', '2B♭', '2B', '3C', '3C#', 
                '3D', '3E♭', '3E', '3F', '3F#', '3G', '3G#', '3A', '3B♭', '3B', '4C', '4C#'],
            G: ['2G', '2G#', '2A', '2B♭', '2B', '3C', '3C#', '3D', '3E♭', '3E', '3F', '3F#', 
                '3G', '3G#', '3A', '3B♭', '3B', '4C', '4C#', '4D', '4E♭', '4E', '4F', '4F#']
        }
        return notes[string];
    }

}