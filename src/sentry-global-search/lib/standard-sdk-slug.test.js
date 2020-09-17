import standardSDKSlug from './standard-sdk-slug';

describe('SDK slug standardizer', () => {
  it('should get the standard slug of an sdk', () => {
    expect(standardSDKSlug('javascript')).toEqual({
      slug: 'sentry.javascript',
      name: 'JavaScript',
    });
  });

  it('should pass through a valid slug', () => {
    expect(standardSDKSlug('sentry.javascript')).toEqual({
      slug: 'sentry.javascript',
      name: 'JavaScript',
    });
  });

  it('should pass through unknown slugs', () => {
    expect(standardSDKSlug('erlang')).toEqual({
      slug: 'erlang',
      name: 'Erlang',
    });
  });

  it('should return undefined when no value is provided', () => {
    expect(standardSDKSlug()).toBe(undefined);
  });

  it('should return undefined when non-string value is provided', () => {
    expect(standardSDKSlug(null)).toBe(undefined);
  });
});
