import { writeFileSync, readFileSync } from 'fs';
import { join } from 'path';
import { cwd } from 'process';

export const addDockerFile = (appFullPath) => {
  writeFileSync(
    `${appFullPath}/Dockerfile`,
    readFileSync(join(cwd(), 'tools/generators/apps/fixtures/Dockerfile'), 'utf-8')
      .replace(/{fullpath}/g, appFullPath)
  );
}
