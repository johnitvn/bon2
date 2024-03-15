import { writeFileSync, readFileSync, rmSync } from 'fs';
import { join } from 'path';
import { cwd } from 'process';

export const changeAppComponent = (appFullPath) => {
  rmSync(`${appFullPath}/src/app/app.component.html`);
  writeFileSync(`${appFullPath}/src/app/app.component.ts`, readFileSync(join(cwd(), 'tools/generators/apps/fixtures/app.component.ts')));
}
