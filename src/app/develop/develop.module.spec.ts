import { DevelopModule } from './develop.module';

describe('DevelopModule', () => {
  let developModule: DevelopModule;

  beforeEach(() => {
    developModule = new DevelopModule();
  });

  it('should create an instance', () => {
    expect(developModule).toBeTruthy();
  });
});
