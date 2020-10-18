import { Title } from '@angular/platform-browser';

import { environment } from '../../environments/environment';

export const setPageTitle = (title: Title, pageName: string): void => {
  title.setTitle(`${environment.siteName} | ${pageName}`);
};
