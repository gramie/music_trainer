class Keyboard {
    constructor(keyboardContainer, noteSymbols) {
        this.noteSymbols = noteSymbols;
        keyboardContainer.html(this.renderKeyboard(keyboardContainer));
        this.playback = new MusicPlayback(noteSymbols);
    }

    render(keyboard) { 
        keyboard.html(this.renderKeyboard());
    }

    keyDown(key) {
        const keyID = key.attr('id').substr(5).replace('_', '#');
        if (keyID) {
            const keys = this.playback.getNotes(keyID, this.getChord(), this.getInversion());
            const broken = $('#broken-chord').is(':checked');
            let delay = 0;
            for (const singleKey of keys) {
                this.playKey(singleKey, delay);
                delay+= broken ? 250 : 0;
            }
        }
    };

    renderKeyboard() {
        let result = '';
        
        let whiteNoteCount = 0;
        for (const note in this.noteSymbols) {
            const n = this.noteSymbols[note];
            const keyID = 'note-' + n;
            
            if (n.length === 2) {
                // This is a white key
                result += '<div id="' + keyID + '" class="key white"><div class="caption">' + n.substr(1) + '</div></div>';
                whiteNoteCount++;
            } else {
                // This is a black key
                const offset = whiteNoteCount *4.12 -1.12; // Empirically-derived formula to position black keys
                result += '<div id="' + keyID.replace('#', '_') + '" class="key black" style="left:' + offset + 'em;"><div class="caption">' + n.substr(1) + '</div></div>';
            }				
        }
        
        return result;
    }
    

    playKey(keyID, delay) {
        if (!keyID) {
            return;
        }

        setTimeout(this.playSingleNote, delay, this, keyID);
    }

    playSingleNote(self, keyID) {
        self.playback.playNote(keyID);

        // In case this note is already playing, this is the only way to interrupt the
        // CSS transition and start it again
        const key = $('#note-' + keyID.replace('#', '_'));
        key.removeClass('down');
        key.addClass('notransition');
        key[0].offsetHeight;
        key.removeClass('notransition');
        key.addClass('down');
    }

    getChord() {
        if ($('#play-chord').is(':checked')) {
            const chordTypeControl = $('.chord-type:checked');
            if (chordTypeControl.length === 1) {
                return chordTypeControl.val();
            }
        }
        return '';
    }

    getInversion() {
        const chordInversionControl = $('.chord-inversion:checked');
        if (chordInversionControl.length === 1) {
            return chordInversionControl.val();
        }
        return '';
    }
        
}