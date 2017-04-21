// @flow

// Types
import type { Element, Component } from 'react';
import type { FiberRoot } from 'react-dom/lib/ReactFiberRoot';

// External
import reactFiberReconciler from 'react-dom/lib/ReactFiberReconciler';

// Internal
import * as hostConfig from './host-config';
import SynthManager from './synth-manager';
import SynthContainer from './container';

const renderer = reactFiberReconciler(hostConfig);

export const ReactSynth: {|
  root: ?FiberRoot,
  renderSubtreeIntoContainer: Function,
  render: Function,
|} = {
  root: null,
  synthManger: null,
  renderSubtreeIntoContainer(
    parentComponent: ?Component<any, any, any>,
    element: Element<any>,
    callback: ?Function
  ) {
    if (this.root) {
      renderer.updateContainer(
        element,
        this.root,
        parentComponent,
        callback.bind(null, this.synthManager)
      );
    } else {
      this.synthManager = new SynthManager();
      const container = new SynthContainer(this.synthManager);
      this.root = renderer.createContainer(container);
      renderer.updateContainer(
        element,
        this.root,
        parentComponent,
        callback.bind(null, this.synthManager)
      );
    }
  },
  render(element: Element<any>, callback: ?Function) {
    return this.renderSubtreeIntoContainer(null, element, callback);
  },
};
