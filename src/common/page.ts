import { extensionLog } from '@common/utils'

export function addButton(where, text, cb) {
    const button = $('<button/>').text(text).on('click', cb);
    $(where).after(button);
}

/**
 * injectScript - Inject internal script to available access to the `window`
 *
 * @param  {type} filename name of the internal script.
 * @param  {type} tag The tag as string, where the script will be append (default: 'body').
 * @see    {@link http://stackoverflow.com/questions/20499994/access-window-variable-from-content-script}
 */
export function injectPageScript(filepath: string, tag: string = 'body') {
    extensionLog('Injecting', filepath);
    let node = document.getElementsByTagName(tag)[0];
    let script = document.createElement('script');
    script.setAttribute('type', 'text/javascript');
    script.setAttribute('src', filepath);
    node.appendChild(script);
}