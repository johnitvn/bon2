import prompts from 'prompts';
import { execRun } from '../../utils/exec-run.mjs';
import { tailwindConfig } from './utils/tailwind-config.mjs';
import { projectJsonConfig } from './utils/project-json-config.mjs';
import { tsConfigJsonConfig } from './utils/tsconfig-json-config.mjs';
import { changeAppConfig } from './utils/change-app-config.mjs';
import { addBonbonWelcomeComponent } from './utils/add-bonbon-welcome-component.mjs';
import { addDockerFile } from './utils/add-docker-file.mjs';

export const forntendHostApp = async (appName, dryRun) => {
  let remoteProjects;
  try {
    remoteProjects = JSON.parse(await execRun('npx nx show projects -p *-module --json'));
  } catch (error) {
    console.error(chalk.red(`Can't get micro frontend module projects list!`));
    process.exit(1);
  }


  let remotes;
  if (remoteProjects.length == 0) {
    remotes = [];
  } else {
    remotes = (await prompts({
      type: 'multiselect',
      name: 'remotes',
      message: 'Choose the host site of this module?',
      choices: remoteProjects.map(e => ({ title: e, value: e })),
      hint: '- Space to select. Return to submit',
      min: 0
    })).remotes;
  }

  let appFullPath = `websites/hosts/${appName}-site`;
  const args = [
    remotes.length === 0 ? '' : `--remotes=${remotes}`,
    `--standalone`,
    `--ssr`,
    `--addTailwind`,
    `--style=scss`,
    `--skipFormat`,
    `--e2eTestRunner=playwright`,
    `--projectNameAndRootFormat=as-provided`,
    `--prefix=${appName}`,
    `${dryRun ? '--dry-run' : ''}`,
    `${appFullPath}`,
  ]

  try {
    const command = `nx g @nx/angular:host ${args.join(' ')}`;
    console.log(command);
    const result = await execRun(command);
    console.log(result);
  } catch (err) {
    console.error(`${chalk.red(`Can't create project via nx!`)}\nYou Can try to run command for manual start nx daemon\n\t: npx nx show projects --json`);
    process.exit(1);
  }
  tailwindConfig(appFullPath);
  projectJsonConfig(appFullPath, appName, 'site');
  tsConfigJsonConfig(appFullPath);
  changeAppConfig(appFullPath, appName);
  addBonbonWelcomeComponent(appFullPath, appName);
  addDockerFile(appFullPath);
  await execRun(`npx prettier -w ${appFullPath}/**/*.{json,ts,js,scss,css,less}`);
}
