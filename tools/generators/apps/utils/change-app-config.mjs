import { writeFileSync, readFileSync } from 'fs';
import { join } from 'path';
import { cwd } from 'process';

export const changeAppConfig = (appFullPath) => {
  writeFileSync(`${appFullPath}/src/app/app.config.ts`, readFileSync(join(cwd(), 'tools/generators/apps/fixtures/app.config.ts')));
}
