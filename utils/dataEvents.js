/**
 * @callback onDataEventCallback
 * @param {Event} event
 * @param {string} value
 */

/**
 * @param {string} eventName
 * @param {onDataEventCallback} callback
 */
export function onDataEvent(eventName, callback) {
  const dataEventName = `data-event-${eventName}`;

  document.body.addEventListener(eventName, (event) => {
    const value = event.target.attributes.getNamedItem(dataEventName)?.value;
    if (value) {
      callback(event, value);
    }
  });
}

/**
 * @callback onDataEventValueCallback
 * @param {Event} event
 * @callback {onDataEventCallback} event
 */

/**
 * @param {string} eventName
 * @param {string} value
 * @param {onDataEventValueCallback} callback
 */
export function onDataEventValue(eventName, value, callback) {
  onDataEvent(eventName, (event, action) => {
    if (value === action) {
      callback(event);
    }
  });
}
