// @flow

import type SynthContainer from '../container';
import type { HostContext } from '../host-config';

type TextElement = any;

export default class BaseElement {
  constructor(props: Object, rootContainer: SynthContainer) {}

  appendChildBeforeMount(child: BaseElement | TextElement): void {}

  finalizeBeforeMount(
    type: string,
    props: Object,
    rootContainerInstance: SynthContainer
  ): boolean {
    return false;
  }

  finalizeBeforeRemoval(): void {}

  commitMount(newProps: Object): void {}

  getPublicInstance(): mixed {
    return this;
  }

  prepareUpdate(
    oldProps: Object,
    newProps: Object,
    rootContainerInstance: SynthContainer
  ): null | Array<mixed> {
    return null;
  }

  commitUpdate(
    updatePayload: Array<mixed>,
    oldProps: Object,
    newProps: Object
  ): void {}

  appendChild(child: BaseElement): void {}

  insertBefore(
    parentInstance: BaseElement,
    child: BaseElement,
    beforeChild: BaseElement
  ): void {}

  removeChild(child: BaseElement): void {}
}
