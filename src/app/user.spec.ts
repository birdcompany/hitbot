import { User } from './user';

describe('User', () => {
  it('should create an instance', () => {
    expect(new User('test', 0)).toBeTruthy();
  });
});
