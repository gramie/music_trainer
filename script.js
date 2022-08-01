Synth.setSampleRate(20000);
const octaveKeys = [
    '2A', '2A#', '2B', '3C', '3C#', '3D', '3D#', '3E', '3F', '3F#', '3G', '3G#',
    '3A', '3A#', '3B', '4C', '4C#', '4D', '4D#', '4E', '4F', '4F#', '4G', '4G#',
];
const sounds = {};

function renderKeyboard() {
    const whiteKeys = octaveKeys.filter(a => a.length === 2);
    let result = '';
    for (let i = 0; i < whiteKeys.length; i++) {
        const noteSymbol = whiteKeys[i];
        const octave = noteSymbol[0];
        const note = noteSymbol.substring(1);
        result += `<div class="key white-key" data-octave="${octave}" data-note="${note}" ><span class="key-symbol">${note}</span></div>`;
    }

    let whiteKeyCount = 0;
    for (let i = 0; i < octaveKeys.length; i++) {
        const noteSymbol = octaveKeys[i];
        const octave = noteSymbol[0];
        const note = noteSymbol.substring(1);
        if (note.length == 2) {
            const position = 'left: ' + (whiteKeyCount * 4 -1) * 1.06 + 'em;';
            result += `<div class="key black-key" data-octave="${octave}" data-note="${note}" style="${position}"><span class="key-symbol"></span></div>`;
        } else {
            whiteKeyCount++;
        }
    }

    return result;
}

function generateNoteData(keys) {
    const piano = Synth.createInstrument('piano');
    for (const key of keys) {
        const keyControl = $(key);
        const octave = keyControl.data('octave');
        const note = keyControl.data('note');
        keyControl.data('audio', piano.generate(note, octave, 2));
    } 
}

function playNote(key) {
    const keyControl = $(key);
    const src = keyControl.data('audio');
    container = new Audio(src);
    container.addEventListener('ended', function() { container = null; });
    container.addEventListener('loadeddata', function(e) { e.target.play(); });
    container.autoplay = false;
    container.setAttribute('type', 'audio/wav');
    container.load();
    return container;
}

function playChord(key) {
    playNote(key);
    const thirdKey = $($(key).next()).next();
    playNote(thirdKey);
}