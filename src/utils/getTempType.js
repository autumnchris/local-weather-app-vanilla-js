import getLocalStorage from './getLocalStorage';
import setToLocalStorage from './setToLocalStorage';

export default function getTempType(value) {
  if (value) setToLocalStorage('tempType', value);
  return getLocalStorage('tempType') || 'f';
}