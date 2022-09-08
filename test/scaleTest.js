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
        assert.deepEqual(scale.notes, ['B♭', 'C', 'D', 'F', 'G♭']);
    });
});
