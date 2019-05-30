import { HistoriqueModule } from './historique.module';

describe('HistoriqueModule', () => {
  let historiqueModule: HistoriqueModule;

  beforeEach(() => {
    historiqueModule = new HistoriqueModule();
  });

  it('should create an instance', () => {
    expect(historiqueModule).toBeTruthy();
  });
});
