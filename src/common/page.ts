export function addButton(where, text, cb) {
    const button = $('<button/>').text(text).on('click', cb);
    $(where).after(button);
}