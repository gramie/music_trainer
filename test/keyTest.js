
QUnit.module('key', function() {
    QUnit.test('key test', function(assert) {
        const key = new Key();
        assert.deepEqual(key.getNotes(),  ['C', 'D', 'E', 'F', 'G', 'A', 'B']);

        const key1 = new Key('A♭');
        assert.deepEqual(key1.getNotes(), ['A♭', 'B♭', 'C', 'D♭', 'E♭', 'F', 'G']);

        const keySharp = new Key('C');
        const sharps = ['A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A'];
        for (let noteIdx = 0; noteIdx < sharps.length -1; noteIdx++) {
            const note = sharps[noteIdx];
            assert.equal(keySharp.makeSharp(note), sharps[noteIdx +1]);
            // Don't use the key that we know has flats
            if (note !== 'F') {
                assert.equal(keySharp.keyHasFlats(note), false);
            }
        }

        const keyFlat = new Key('B♭');
        const flats = ['C', 'D♭', 'D', 'E♭', 'E', 'F', 'G♭', 'G', 'A♭', 'A', 'B♭', 'B'];
        for (let noteIdx = 1; noteIdx < flats.length; noteIdx++) {
            const note = flats[noteIdx];
            assert.equal(keyFlat.makeFlat(note), flats[noteIdx -1]);
        }
    });
});