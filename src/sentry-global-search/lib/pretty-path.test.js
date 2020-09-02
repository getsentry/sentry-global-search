import prettyPath from './pretty-path';

describe('prettyPath', () => {
  it('turns slash path into arrow path', () => {
    expect(prettyPath('foo/bar')).toBe('Foo > Bar');
  });

  it('ignores leading and trailing slashes', () => {
    expect(prettyPath('/foo/bar/')).toBe('Foo > Bar');
  });

  it('supports special capitalization types', () => {
    expect(prettyPath('/transpiled-javascript/typescript/')).toBe(
      'Transpiled JavaScript > TypeScript'
    );
  });
});
