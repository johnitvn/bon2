import { writeFileSync, readFileSync } from 'fs';
import { join } from 'path';
import JSON5 from 'json5';

export const tsConfigJsonConfig = (appFullPath) => {

  const tsConfig = JSON5.parse(readFileSync(join(appFullPath, 'tsconfig.json'), { encoding: 'utf8' }));
  tsConfig.compilerOptions.target = "ES2022";
  writeFileSync(`${appFullPath}/tsconfig.json`, JSON.stringify(tsConfig));


  const tsConfigApp = JSON5.parse(readFileSync(join(appFullPath, 'tsconfig.app.json'), { encoding: 'utf8' }));
  tsConfigApp.compilerOptions.target = "ES2022";
  writeFileSync(`${appFullPath}/tsconfig.app.json`, JSON.stringify(tsConfigApp));

  const tsConfigServer = JSON5.parse(readFileSync(join(appFullPath, 'tsconfig.server.json'), { encoding: 'utf8' }));
  tsConfigServer.compilerOptions.target = "ES2022";
  writeFileSync(`${appFullPath}/tsconfig.server.json`, JSON.stringify(tsConfigServer));
}
