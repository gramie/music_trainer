class MusicPlayback {
    constructor(noteSymbols) {
        this.noteSymbols = noteSymbols;
        this.playingKeys = {};

        const sprite = {};
        for (const note in noteSymbols) {
            sprite[noteSymbols[note]] = [2000 * note, 2000];
        }

        const playback = this;

        this.sound = new Howl({
            src: ['two_octaves.ogg'],
            sprite: sprite,
            onend: function(param) {
                const key = playback.playingKeys[param];
                // See if the key is being played anywhere else, if not the key is up
                const keysDown = playback.countKeysDown(playback, key);
                if (keysDown == 1) {
                    $('#note-' + key.replace('#', '_')).removeClass('down');
                }
                delete playback.playingKeys[param];
            }
        });
    }


    getNotes(root, chordType, inversion) {
        const result = [root];
        if (!chordType) {
            return result;
        }
        
        const noteIdx = noteSymbols.indexOf(root);
        switch (chordType) {
            case 'major':
                result.push(noteSymbols[noteIdx +4]);
                result.push(noteSymbols[noteIdx +7]);
                break;
            case 'minor':
                result.push(noteSymbols[noteIdx +3]);
                result.push(noteSymbols[noteIdx +7]);
                break;
            case 'diminished':
                result.push(noteSymbols[noteIdx +3]);
                result.push(noteSymbols[noteIdx +6]);
                break;
            case 'augmented':
                result.push(noteSymbols[noteIdx +3]);
                result.push(noteSymbols[noteIdx +8]);
                break;
            case 'major-7':
                result.push(noteSymbols[noteIdx +4]);
                result.push(noteSymbols[noteIdx +7]);
                result.push(noteSymbols[noteIdx +11]);
                break;
            case 'minor-7':
                result.push(noteSymbols[noteIdx +4]);
                result.push(noteSymbols[noteIdx +7]);
                result.push(noteSymbols[noteIdx +10]);
                break;
        }


        let lastNote = '';
        let octave = '';
        switch (inversion) {
            case 'second':
                lastNote = result.pop();
                octave = lastNote[0] -1;
                result.unshift(octave + lastNote.substr(1));
                break;
            case 'third':
                lastNote = result.pop();
                octave = lastNote[0] -1;
                result.unshift(octave + lastNote.substr(1));

                lastNote = result.pop();
                octave = lastNote[0] -1;
                result.unshift(octave + lastNote.substr(1));
        }
        return result;
    }

    playNote(keyID) {
        this.playingKeys[this.sound.play(keyID)] = keyID;
    }

    countKeysDown(playback, keyID) {
        let result = 0;
        for (const key of Object.keys(playback.playingKeys)) {
            if (this.playingKeys[key] === keyID) {
                result++;
            }
        }
        
        return result;
    }


}