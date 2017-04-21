import React from 'react';
import ReactSynth from '../src';
import timbre from 'timbre';
import WebMidi from 'webmidi';
import MIDIUtils from 'midiutils';

const cutoff = timbre('sin', { freq: '1000ms', mul: 200, add: 500 }).kr();

/*const Synth = () => [
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
];*/

const freq = timbre('param', { value: 800 });
/*
const Synth = () => (
  <eff effect="reverb" room={0.8} mix={0.15}>
    <eff effect="biquad" type="lowpass" freq={800} Q={20}>
      <eff effect="phaser">
        <eff effect="dist" cutoff={300} post={0} pre={4 0}>
          <env a={0} d={200} s={0.5} r={20}>
            <osc wave="saw" freq={freq} mul={0.2} phase={0} />
            <osc wave="sin" freq={freq} mul={0.1} phase={0} />
          </env>
        </eff>
      </eff>
    </eff>
  </eff>
);*/

const Synth = () => (
  <eff effect="highpass">
    <env a={0} d={200} s={0.5} r={20}>
      <osc wave="saw" freq={freq} mul={0.2} fb={0.75} />
    </env>
  </eff>
);

let lastFreq = null;

const playNote = (note: number, velocity: number, synthManager: Object) => {
  const synths = synthManager.getSynths();
  Object.keys(synths).forEach(key => {
    synths[key].poly = 1;
    const f = MIDIUtils.noteNumberToFrequency(note);
    if (lastFreq) {
      freq.linTo(f, '200ms');
    } else {
      freq.setAt(f);
      synths[key].noteOn(note, velocity);
      lastFreq = f;
    }
  });
};

const stopNote = (note: number, synthManager: Object) => {
  const synths = synthManager.getSynths();
  Object.keys(synths).forEach(key => {
    synths[key].noteOff(note);
  });
  lastFreq = null;
};

const setupMidi = (synthManager: Object) => {
  WebMidi.enable(err => {
    if (err) {
      console.log('WebMidi could not be enabled.', err);
    } else {
      console.log(WebMidi.inputs);
      const input = WebMidi.inputs[0];
      input.addListener('noteon', 2, e => {
        playNote(e.note.number, e.rawVelocity, synthManager);
      });
      input.addListener('noteoff', 2, e => {
        stopNote(e.note.number, synthManager);
      });
    }
  });
};

ReactSynth.render(<Synth />, setupMidi);
