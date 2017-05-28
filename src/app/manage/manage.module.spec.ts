import { ManageModule } from './manage.module';

describe('ManageModule', () => {
  let manageModule: ManageModule;

  beforeEach(() => {
    manageModule = new ManageModule();
  });

  it('should create an instance', () => {
    expect(manageModule).toBeTruthy();
  });
});
