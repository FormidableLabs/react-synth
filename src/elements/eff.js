// @flow
import uuidV4 from 'uuid/v4';
import timbre from 'timbre';

import Base from './base';
import type SynthContainer from '../container';

const baseProps = { room: 0.9, damp: 0.2, mix: 0.45 };

export default class Env extends Base {
  entity: Object;
  id: string;
  internalChildren: Object;
  type: string;
  options: Object;
  constructor(props: Object, rootContainer: SynthContainer) {
    super(props, rootContainer);
    const { effect, ...rest } = props;
    this.type = effect || 'reverb';
    this.options = { ...baseProps, ...rest };
    this.id = uuidV4();
    this.internalChildren = {};
    this.entity = null;
  }

  getEntity(opts, synth) {
    const children = Object.keys(this.internalChildren).map(key =>
      this.internalChildren[key].getEntity(opts, synth));

    synth.registerEffect({
      type: this.type,
      options: this.getOptions(opts),
    });

    return children[0];
  }

  getOptions(opts) {
    const options = {};
    Object.keys(this.options).forEach(o => {
      if (typeof this.options[o] === 'function') {
        options[o] = this.options[o](opts);
      } else if (o !== 'children') {
        options[o] = this.options[o];
      }
    });
    return options;
  }

  appendChildBeforeMount(child: Base): void {
    this.internalChildren[child.id] = child;
    // noop
  }

  finalizeBeforeMount(type: string, props: Object): boolean {
    // noop
    return true;
  }

  commitMount(newProps: Object): void {
    // noop
  }

  finalizeBeforeRemoval(): void {
    // noop
  }

  getPublicInstance(): any {
    return this.entity;
  }

  prepareUpdate(
    oldProps: Object,
    newProps: Object,
    rootContainerInstance: SynthContainer
  ): null | Array<mixed> {
    return [];
  }

  commitUpdate(
    updatePayload: Array<mixed>,
    oldProps: Object,
    newProps: Object
  ): void {
    // noop
  }

  appendChild(child: Base): void {
    this.internalChildren[child.id] = child;
  }

  insertBefore(child: Base, beforeChild: Base): void {}

  removeChild(child: Base): void {
    delete this.internalChildren[child.id];
  }
}
