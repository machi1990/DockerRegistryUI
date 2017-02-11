import { DockerRegistryUiPage } from './app.po';

describe('docker-registry-ui App', function() {
  let page: DockerRegistryUiPage;

  beforeEach(() => {
    page = new DockerRegistryUiPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
