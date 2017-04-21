import React from 'react';
import ReactSynth from '../src';
import midi from 'midi';
import timbre from 'timbre';

const cutoff = timbre('sin', { freq: '200ms', mul: 200, add: 500 }).kr();

const Synth = () => [
  <eff effect="reverb" mix={0.15}>
    <eff effect="lpf" cutoff={cutoff} Q={20}>
      <eff effect="phaser">
        <env a={0} d={200} s={0.5} r={20}>
          <osc wave="saw" freq={opts => opts.freq / 2} mul={0.25} />
          <osc wave="pulse" freq={opts => opts.freq / 4} mul={0.25} />
        </env>
      </eff>
    </eff>
  </eff>,
];

// const Synth = () => (
//   <env a={0} d={200} s={0.5} r={20}><osc wave="wavc(0200080f)" /></env>
// );

const playNote = (note: number, velocity: number, synthManager: Object) => {
  const synths = synthManager.getSynths();
  Object.keys(synths).forEach(key => {
    synths[key].noteOn(note, velocity);
  });
};

const stopNote = (note: number, synthManager: Object) => {
  const synths = synthManager.getSynths();
  Object.keys(synths).forEach(key => {
    synths[key].noteOff(note);
  });
};

const setupMidi = (synthManager: Object) => {
  const input = new midi.input();
  const count = input.getPortCount();

  if (count > 0) {
    input.getPortName(0);

    input.on('message', (deltaTime, [status, note, velocity]) => {
      if (velocity !== 0) {
        playNote(note, velocity, synthManager);
      } else {
        stopNote(note, synthManager);
      }
    });

    input.openPort(0);
    input.ignoreTypes(false, false, false);
  } else {
    console.error('No Midi controller attached!');
    process.exit();
  }
};

ReactSynth.render(<Synth />, setupMidi);
