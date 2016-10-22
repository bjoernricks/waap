export const log = {
    debug: (...args) => console.log(...args),
}

export function is_defined(value) {
    return value !== undefined;
}

export function has_value(value) {
  return value !== null && is_defined(value);
}

export function is_string(value) {
  return typeof value === 'string';
}

export const is_array = Array.isArray;

export function is_number(value) {
  return typeof value === 'number';
}

export function is_empty(value) {
  if (!has_value(value)) {
    return true;
  }
  if (is_string(value)) {
    return value.trim().length === 0;
  }

  if (is_array(value)) {
    return value.length === 0;
  }
  return false;
}

export function classes(...args) {
  let css = [];
  for (let arg of args) {
    if (is_array(arg)) {
      css.push(classes(...arg));
    }
    else if (is_string(arg) || is_number(arg)) {
      css.push(arg);
    }
  }
  return css.join(' ');
}
