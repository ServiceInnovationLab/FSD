const stripSpaces = string => string.split(' ').join('');

// Truncate a string to a given length.
//
// Appends a terminator sequence (default ...) if necessary to show a truncation
// has happened.
const truncate = (string, target_length, terminator = '...') => 
  string.length < target_length
    ? string
    : string.substring(0, target_length - terminator.length) + terminator;

export { stripSpaces, truncate };
