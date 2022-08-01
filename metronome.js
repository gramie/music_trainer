class Metronome {
    constructor() {
        const sprite = {
            cymbal: [0, 1000],
            snare: [1000, 2000]
        };

        this.metronome = new Howl({
            src: ['metronome.ogg'],
            sprite: sprite,
        });

        this.ticks = [];

    }

    start(beatCount, bpm) {
        this.stop();
        this.ticks = ['cymbal'];
        for (let i = 1; i < beatCount; i++) {
            this.ticks.push('snare');
        }

        const self = this;

        const playFunction = function() {
            const sound = self.ticks.shift();
            self.metronome.play(sound);
            self.ticks.push(sound);
        }

        playFunction();
        this.interval = setInterval(playFunction, bpm);
    }

    stop() {
        clearInterval(this.interval);
    }
}
