import extrapolate from './extrapolate';

describe('Extrapolate', () => {
  it('works for sdk slugs', () => {
    expect(extrapolate('foo.bar.bat', '.')).toEqual([
      'foo',
      'foo.bar',
      'foo.bar.bat',
    ]);
  });

  it('works for paths', () => {
    expect(extrapolate('/foo/bar/bat/', '/')).toEqual([
      'foo',
      'foo/bar',
      'foo/bar/bat',
    ]);
  });
});
