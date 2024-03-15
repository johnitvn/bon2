import { writeFileSync, readFileSync, rmSync, existsSync } from 'fs';
import { join } from 'path';
import { cwd } from 'process';
import JSON5 from 'json5';

export const addBonbonWelcomeComponent = (appFullPath, prefix) => {
  if (existsSync(`${appFullPath}/src/app/nx-welcome.component.ts`)) {
    rmSync(`${appFullPath}/src/app/nx-welcome.component.ts`);
    writeFileSync(
      `${appFullPath}/src/app/bon2-welcome.component.ts`,
      readFileSync(join(cwd(), 'tools/generators/apps/fixtures/bon2-welcome.component.host.ts'), 'utf8')
        .replace(/{prefix}/g, prefix)
        .replace('{type}', 'host')
        .replace('{appName}', `${prefix}-site`)
    );
    const componentTsContent = readFileSync(join(cwd(), 'tools/generators/apps/fixtures/app.component.ts'), 'utf-8');
    writeFileSync(`${appFullPath}/src/app/app.component.ts`, componentTsContent.replace(/{prefix}/g, prefix));
    writeFileSync(`${appFullPath}/src/app/app.component.html`, readFileSync(join(cwd(), 'tools/generators/apps/fixtures/app.component.html')));

    const routeFileContent = readFileSync(`${appFullPath}/src/app/app.routes.ts`, 'utf-8')
      .replace(/NxWelcomeComponent/g, `Bon2WelcomeComponent`)
      .replace(/nx/g, `bon2`);
    writeFileSync(`${appFullPath}/src/app/app.routes.ts`, routeFileContent);
  } else {
    rmSync(`${appFullPath}/src/app/remote-entry/nx-welcome.component.ts`);
    writeFileSync(
      `${appFullPath}/src/app/remote-entry/bon2-welcome.component.ts`,
      readFileSync(join(cwd(), 'tools/generators/apps/fixtures/bon2-welcome.component.module.ts'), 'utf8')
        .replace(/{prefix}/g, prefix)
        .replace('{type}', 'remote module')
        .replace('{appName}', `${prefix}-module`)
    );
    const routeFileContent = readFileSync(`${appFullPath}/src/app/remote-entry/entry.component.ts`, 'utf-8')
      .replace(/NxWelcomeComponent/g, `Bon2WelcomeComponent`)
      .replace(/nx/g, `bon2`);
    writeFileSync(`${appFullPath}/src/app/remote-entry/entry.component.ts`, routeFileContent);
  }


}
