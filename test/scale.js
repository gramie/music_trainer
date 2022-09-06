const scale = new Scale();

QUnit.module('scale', function() {
    QUnit.test('something', function(assert) {
        assert.deepEqual(scale.getNotes('C', 'major'), ['C', 'D', 'E', 'F', 'G', 'A', 'B']);
        assert.deepEqual(scale.getNotes('F', 'major'), ['F', 'G', 'A', 'B♭', 'C', 'D', 'E']);
        assert.deepEqual(scale.getNotes('G', 'major'), ['G', 'A', 'B', 'C', 'D', 'E', 'F#']);
        assert.deepEqual(scale.getNotes('G', 'minor'), ['G', 'A', 'B♭', 'C', 'D', 'E♭', 'F']);
        assert.deepEqual(scale.getNotes('A♭', 'minor'), ['G', 'A', 'B', 'C', 'D', 'E', 'F#']);
        assert.deepEqual(scale.getNotes('G', 'major'), ['G', 'A', 'B', 'C', 'D', 'E', 'F#']);
    });
});