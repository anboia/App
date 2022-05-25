import _ from 'underscore';
import React from 'react';

const composerRef = React.createRef();
let focusCallback = null;

// Creates a fake input element, that will allow keyboard shows up on iOS browser.
const fakeInput = document.createElement('input');
fakeInput.setAttribute('type', 'text');
fakeInput.setAttribute('readonly', 'readonly');
fakeInput.style.position = 'absolute';
fakeInput.style.opacity = 0;
fakeInput.style.height = 0;
fakeInput.style.fontSize = '16px'; // disable auto zoom
document.body.prepend(fakeInput);

/**
 * Initiate focus. Should be called on click event handler
 * in order to focus on iOS browser
 *
 */
function startFocus() {
    fakeInput.focus();
}

/**
 * Register a callback to be called when focus is requested.
 * Typical uses of this would be call the focus on the ReportActionComposer.
 *
 * @param {Function} callback callback to register
 */
function onComposerFocus(callback) {
    focusCallback = callback;
}

/**
 * Request focus on the ReportActionComposer
 *
 */
function focus() {
    if (!_.isFunction(focusCallback)) {
        return;
    }

    focusCallback();
}

/**
 * Clear the registered focus callback
 *
 */
function clear() {
    focusCallback = null;
}

/**
 * Exposes the current focus state of the report action composer.
 * @return {Boolean} isFocused
 */
function isFocused() {
    return composerRef.current && composerRef.current.isFocused();
}

export default {
    composerRef,
    startFocus,
    onComposerFocus,
    focus,
    clear,
    isFocused,
};
