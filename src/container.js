// @flow

import SynthManager from './synth-manager';
import { Base } from './elements';

type TextElement = any;

export default class SynthContainer {
  synthManager: SynthManager;

  constructor(synthManager: SynthManager) {
    this.synthManager = synthManager;
  }

  appendChild(child: Base): void {
    this.synthManager.addSynth(child);
  }

  insertBefore(child: Base): void {}

  removeChild(child: Base): void {
    this.synthManager.removeSynth(child.id);
  }

  updateTree() {
    this.synthManager.rebuild();
  }
}
