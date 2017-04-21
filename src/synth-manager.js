import timbre from 'timbre';

export default class Synth {
  synths: Array<any>;

  constructor(): Object {
    this.synths = {};
  }

  getSynths() {
    return this.synths;
  }

  addSynth(child) {
    const synth = timbre('SynthDef').play();

    const synthHook = {
      effects: [],
      registerEffect: effect => {
        synthHook.effects.push(effect);
      },
    };

    child.getEntity({ freq: 0 }, synthHook);

    synth.def = opts => {
      const s = child.getEntity(opts, synthHook);
      return s.on('ended', opts.doneAction).bang();
    };

    let master = synth;

    synthHook.effects.forEach(eff => {
      master = timbre(eff.type, eff.options, master).play();
    });

    this.synths[child.id] = synth;
  }

  removeSynth(id) {
    delete this.synths[id];
  }
}
