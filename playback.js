const noteSymbols = ['3c', '3c#', '3d', '3d#', '3e', '3f', '3f#', '3g', '3g#', '4a', '4a#', '4b', '4c', '4c#', '4d', '4d#', '4e', '4f', '4f#', '4g', '4g#', '5a', '5a#', '5b'];

const sprite = {};
for (const note in noteSymbols) {
    sprite[noteSymbols[note]] = [2000 * note, 2000];
}

const sound = new Howl({
    src: ['two_octaves.ogg'],
    sprite: sprite,
    onend: function(param) {
        const key = playingKeys[param];
        // See if the key is being printed anywhere else, if not the key is up
        const keysDown = countKeysDown(key);
        if (keysDown == 1) {
            $('#note-' + key.replace('#', '_')).removeClass('down');
        }
        delete playingKeys[param];
    }
});

function play() {
    sound.play();
}

function stop() {
    sound.stop();
}

function getNotes(root, chordType, inversion) {
    const result = [root];
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

function playNotes() {
    for (const note of $('#notes-to-play').val().toLowerCase().split(' ')) {
        const noteIdx = noteSymbols.indexOf(note);
        if (noteIdx > -1) {
            console.log(sound.play(noteSymbols[noteIdx]));
            console.log(sound.play(noteSymbols[noteIdx +4]));
            console.log(sound.play(noteSymbols[noteIdx +7]));
        }
    }
}

function renderKeyboard(notes) {
    let result = '';
    
    let whiteNoteCount = 0;
    for (const note in noteSymbols) {
        const n = noteSymbols[note];
        const keyID = 'note-' + n;
        
        if (n.length === 2) {
            // This is a white key
            result += '<div id="' + keyID + '" class="key white"><div class="caption">' + n.substr(1) + '</div></div>';
            whiteNoteCount++;
        } else {
            const offset = whiteNoteCount *4.12 -1.12;
            result += '<div id="' + keyID.replace('#', '_') + '" class="key black" style="left:' + offset + 'em;"><div class="caption">' + n.substr(1) + '</div></div>';
        }				
    }
    
    return result;
}

function pressKey(keyID) {
    
}
