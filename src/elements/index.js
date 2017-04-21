import type SynthContainer from '../container';
import type { HostContext } from '../host-config';

import Base from './base';
import Osc from './osc';
import Env from './env';
import Eff from './eff';
import Pluck from './pluck';

type TextElement = any;

export { Base, Osc, Env, Eff, Pluck };

export function createSynthInstance(
  type: string,
  props: Object,
  container: SynthContainer,
  context: HostContext
): Base {
  switch (type) {
    case 'osc': {
      return new Osc(props, container);
    }
    case 'env': {
      return new Env(props, container);
    }
    case 'eff': {
      return new Eff(props, container);
    }
    case 'pluck': {
      return new Pluck(props, container);
    }
    default: {
      return new Base(type, props, container);
    }
  }
}
