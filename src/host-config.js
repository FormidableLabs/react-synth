// @flow
import type SynthContainer from './container';
import { createSynthInstance, Base } from './elements';

export type HostContext = any;
type Instance = any;
type TextInstance = any;
type TextElement = any;

// Create the actual "thing" described by the type and props of the element
// we're looking at. (It will be 'attached' to the thing represented by its
// parent element later on, in appendInitialChild/appendChild/insertBefore.)
export function createInstance(
  type: string,
  props: Object,
  rootContainerInstance: SynthContainer,
  hostContext: HostContext,
  internalInstanceHandle: Object
): Base {
  return createSynthInstance(type, props, rootContainerInstance, hostContext);
}

// In this context, the method name means 'append the child elements of
// parentInstance which are present as it is being mounted'.
export function appendInitialChild(parentInstance: Base, child: Base): void {
  parentInstance.appendChildBeforeMount(child);
}

// In this function, ReactDOM:
// - Sets up event listeners for e.g. onChange
//
// The return value of this function appears to indicate whether we should
// run commitMount or not, although I'm not completely sure what that means.
//
// (ReactDOM uses this behavior to decide whether or not to auto-focus a
// component, presumably after it's been mounted?)
export function finalizeInitialChildren(
  newElement: Base,
  type: string,
  props: Object,
  rootContainerInstance: SynthContainer
): boolean {
  return newElement.finalizeBeforeMount(type, props, rootContainerInstance);
}

export function appendChild(
  parentInstance: Base | SynthContainer,
  child: Base | TextElement
): void {
  parentInstance.appendChild(child);
}

export function insertBefore(
  parentInstance: Base | SynthContainer,
  child: Base | TextElement,
  beforeChild: Base | TextElement
): void {
  parentInstance.insertBefore(child, beforeChild);
}

export function removeChild(
  parentInstance: Base | SynthContainer,
  child: Base | TextElement
): void {
  child.finalizeBeforeRemoval();
  parentInstance.removeChild(child);
}

export function shouldSetTextContent(props: Object): boolean {
  return false;
}

export function resetTextContent(element: Base): void {
  // noop
}

export function createTextInstance(
  text: string,
  rootContainerInstance: SynthContainer,
  hostContext: Object,
  internalInstanceHandle: Object
): string {
  return text;
}

export function commitTextUpdate(
  textElement: TextInstance,
  oldText: string,
  newText: string
): void {
  // noop
}

// ----------------------------------------------------------------------

export function getRootHostContext(
  rootContainerInstance: HostContext
): SynthContainer {
  return rootContainerInstance;
}

export function getChildHostContext(
  parentHostContext: SynthContainer,
  type: string
): string {
  return '';
}

// ----------------------------------------------------------------------

// Before/after hooks to allow us to manipulate module-specific app state
// ReactDOM uses this to disable its event system before making changes to
// the DOM.
export function prepareForCommit(): void {}

// ReactDOM uses this to focus any input elements it just created.
export function commitMount(
  instance: Base,
  type: string,
  newProps: Object,
  internalInstanceHandle: Object
): void {
  instance.commitMount(newProps);
}

// In the ReactDOM fiber implementation this appears to be a diff of props
// that will be changing. ReactHardware says that 'diffing properties here
// allows the reconciler to reuse work', but I'm not sure what that
// actually entails.
//
// The return value is a diff of the oldProps/newProps which get passed to
// commitUpdate.
export function prepareUpdate(
  instance: Base,
  type: string,
  oldProps: Object,
  newProps: Object,
  rootContainerInstance: SynthContainer,
  hostContext: HostContext
): null | Array<any> {
  return instance.prepareUpdate(oldProps, newProps, rootContainerInstance);
}

// ReactHardware says 'update the props handle so that we know which props
// are the ones with current event handlers.'
//
// This appears to be the method which actually flushes a diff out to the
// render target.
//
// TODO: Dispatch to IonizeFiberComponent.updateProperties or suchlike
export function commitUpdate(
  instance: Base,
  updatePayload: Array<any>, // Provided by prepareUpdate
  type: string,
  oldProps: Object,
  newProps: Object,
  internalInstanceHandle: Object
): void {
  instance.commitUpdate(updatePayload, oldProps, newProps);
}

// The dual of prepareForCommit, this is where ReactDOM resets its event
// handlers and such.
export function resetAfterCommit(): void {}

// Lifted wholesale from ReactTestRendererFiber.
// TODO: See if there's something more appropriate to do here.
export function scheduleAnimationCallback(fn: Function): void {
  setTimeout(fn);
}

export function scheduleDeferredCallback(fn: Function): void {
  setTimeout(fn, 0, { timeRemaining: () => Infinity });
}

// TODO: Figure out what this does. ReactTestRenderer seems to use it to
//       convert nodes into a displayable form?
export function getPublicInstance(instance: Base): SynthContainer | Base {
  return instance.getPublicInstance();
}

export const useSyncScheduling = false;

export function shouldDeprioritizeSubtree(
  type: string,
  props: Object
): boolean {
  return false;
}
