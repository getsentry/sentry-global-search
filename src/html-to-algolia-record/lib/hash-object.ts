import { createHash } from 'crypto';

/**
 * Convert a value into a md5 string
 *
 * @param input The input value
 * @return The md5 sum of the input string
 */
export const hashObject = (input: any) => {
  const string = JSON.stringify(input);
  return createHash('md5').update(string).digest('hex');
};
