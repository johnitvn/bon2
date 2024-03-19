import { writeFileSync, readFileSync } from 'fs';
import { type } from 'os';
import { join } from 'path';
import { cwd } from 'process';

export const addDockerFile = (appFullPath, type) => {
  writeFileSync(
    `${appFullPath}/Dockerfile`,
    readFileSync(
      join(cwd(), 'tools/generators/apps/fixtures/Dockerfile.' + type),
      'utf-8',
    ).replace(/{fullpath}/g, appFullPath),
  );
};
