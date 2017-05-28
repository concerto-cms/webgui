import { SitesModule } from './sites.module';

describe('SitesModule', () => {
  let sitesModule: SitesModule;

  beforeEach(() => {
    sitesModule = new SitesModule();
  });

  it('should create an instance', () => {
    expect(sitesModule).toBeTruthy();
  });
});
