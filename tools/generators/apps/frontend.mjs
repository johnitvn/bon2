import prompts from 'prompts';
import { execRun } from '../../utils/exec-run.mjs';
import { tailwindConfig } from './utils/tailwind-config.mjs';
import { projectJsonConfig } from './utils/project-json-config.mjs';
import { tsConfigJsonConfig } from './utils/tsconfig-json-config.mjs';
import { changeAppConfig } from './utils/change-app-config.mjs';
import { addBonbonWelcomeComponent } from './utils/add-bonbon-welcome-component.mjs';
import { addDockerFile } from './utils/add-docker-file.mjs';

export const frontendApp = async (appName, dryRun) => {

  let hostSiteProjects;
  try {
    hostSiteProjects = JSON.parse(await execRun('npx nx show projects -p *-site --json'));
  } catch (error) {
    console.error(chalk.red(`Can't get micro frontend host projects list!`));
    process.exit(1);
  }


  let host = (await prompts({
    type: 'select',
    name: 'host',
    message: 'Choose the host site of this module?',
    choices: [{ title: 'none', value: 'none' }, ...hostSiteProjects.map(e => ({ title: e, value: e }))],
    initial: 0
  })).host;


  let appFullPath = `websites/modules/${appName}-module`;
  const args = [
    host === 'none' ? '' : `--host=${host}`,
    `--standalone`,
    `--ssr`,
    `--addTailwind`,
    `--style=scss`,
    `--skipFormat`,
    `--e2eTestRunner=playwright`,
    `--projectNameAndRootFormat=as-provided`,
    `--prefix=${appName}`,
    `${dryRun ? '--dry-run' : ''}`,
    appFullPath,
  ]
  try {
    const command = `nx g @nx/angular:remote ${args.join(' ')}`;
    console.log(command)
    const result = await execRun(command);
    console.log(result);
  } catch (err) {
    console.error(`${chalk.red(`Can't create project via nx!`)}\nYou Can try to run command for manual start nx daemon\n\t: npx nx show projects --json`);
    process.exit(1);
  }

  tailwindConfig(appFullPath);
  projectJsonConfig(appFullPath, appName, 'module');
  tsConfigJsonConfig(appFullPath);
  changeAppConfig(appFullPath, appName);
  addBonbonWelcomeComponent(appFullPath, appName);
  addDockerFile(appFullPath);

  await execRun(`npx prettier -w ${appFullPath}/**/*.{json,ts,js,scss}`);


}

