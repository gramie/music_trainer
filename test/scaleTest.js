QUnit.module('key', function() {
    QUnit.test('C major test', function(assert) {
        const scale = new Scale('C', 'major');
        assert.deepEqual(scale.notes, ['C', 'D', 'E', 'F', 'G', 'A', 'B']);
    });

    QUnit.test('C minor test', function(assert) {
            const scale = new Scale('C', 'minor');
        assert.deepEqual(scale.notes, ['C', 'D', 'E♭', 'F', 'G', 'A♭', 'B♭']);
    });

    QUnit.test('D minor test', function(assert) {
        const scale = new Scale('D', 'minor');
        assert.deepEqual(scale.notes, ['D', 'E', 'F', 'G', 'A', 'B♭', 'C']);
    });

    QUnit.test('A minor test', function(assert) {
        const scale = new Scale('A', 'minor');
        assert.deepEqual(scale.notes, ['A', 'B', 'C', 'D', 'E', 'F', 'G']);
    });

    QUnit.test('B♭ major test', function(assert) {
        const scale = new Scale('B♭', 'major');
        assert.deepEqual(scale.notes, ['B♭', 'C', 'D', 'E♭', 'F', 'G', 'A']);
    });


    QUnit.test('B♭ minor test', function(assert) {
        const scale = new Scale('B♭', 'minor');
        assert.deepEqual(scale.notes, ['B♭', 'C', 'D♭', 'E♭', 'F', 'G♭', 'A♭']);
    });

    QUnit.test('B♭ pentatonic major test', function(assert) {
        const scale = new Scale('B♭', 'pentatonic-major');
        assert.deepEqual(scale.notes, ['B♭', 'C', 'D', 'F', 'G']);
    });

    QUnit.test('F# pentatonic major test', function(assert) {
        const scale = new Scale('F#', 'pentatonic-major');
        assert.deepEqual(scale.notes, ['F#', 'G#', 'A#', 'C#', 'D#']);
    });

    QUnit.test('A pentatonic minor test', function(assert) {
        const scale = new Scale('A', 'pentatonic-minor');
        assert.deepEqual(scale.notes, ['A', 'C', 'D', 'E', 'G']);
    });

    QUnit.test('C Blues test', function(assert) {
        const scale = new Scale('C', 'blues');
        assert.deepEqual(scale.notes, ['C', 'E♭', 'F', 'G♭', 'G', 'B♭']);
    });

});
