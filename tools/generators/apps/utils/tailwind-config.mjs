import { writeFileSync, readFileSync } from 'fs';
import { join } from 'path';
import { cwd } from 'process';

export const tailwindConfig = (appFullPath) => {
  writeFileSync(`${appFullPath}/tailwind.config.js`, readFileSync(join(cwd(), 'tools/generators/apps/fixtures/tailwind.config.js')));
}
