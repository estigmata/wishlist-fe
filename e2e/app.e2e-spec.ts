import { WhisListFePage } from './app.po';

describe('whis-list-fe App', () => {
  let page: WhisListFePage;

  beforeEach(() => {
    page = new WhisListFePage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
