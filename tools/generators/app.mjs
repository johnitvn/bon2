import prompts from 'prompts';
import chalk from 'chalk';
import { execRun } from '../utils/exec-run.mjs';

export const appGeneratorCommandAction = async (appName, options) => {

  let { dryRun, type } = options;


  if (!type || !['microservice', 'frontend-module', 'gateway', 'host'].includes(type)) {
    if (!['microservice', 'frontend-module', 'gateway', 'host'].includes(type)) {
      console.warn(`${chalk.yellow(`Application type "${type}" is invalid. It's must be one of 'microservice', 'frontend-module', 'gateway', 'host'!`)}`);
    }
    type = (await prompts({
      type: 'select',
      name: 'type',
      message: 'Which kind of application you want to use?',
      choices: [
        { title: 'Microservice Gateway', value: 'gateway' },
        { title: 'Microservice', value: 'microservice' },
        { title: 'Micro frontend remote module', value: 'frontend' },
        { title: 'Micro frontend host', value: 'host' },
      ],
      initial: 0
    })).type;
    if (!type) {
      process.exit(0);
    }
  }

  if (!appName) {
    appName = (await prompts({
      type: 'text',
      name: 'appName',
      message: `What's name of ${type.replaceAll('-', ' ')}?`,
    })).appName;
    if (!appName) {
      process.exit(0);
    }
  }

  if (type == 'microservice') {
    appName = `servers/services/${appName}-service`;
    const args = [
      `--projectNameAndRootFormat=as-provided`,
      `${dryRun ? '--dry-run' : ''}`,
      appName,
    ]
    try {
      const result = await execRun(`npx nx g @nx/nest:application ${args.join(' ')}`);
      console.log(result);
    } catch (err) {
      console.error(`${chalk.red(`Can't create project via nx!`)}\nYou Can try to run command for manual start nx daemon\n\t: npx nx show projects --json`);
    }
  } else if (type == 'gateway') {
    appName = `servers/gateways/${appName}-gateway`;
    const args = [
      `--projectNameAndRootFormat=as-provided`,
      `${dryRun ? '--dry-run' : ''}`,
      appName
    ]
    try {
      const result = await execRun(`npx nx g @nx/nest:application ${args.join(' ')}`);
      console.log(result);
    } catch (err) {
      console.error(`${chalk.red(`Can't create project via nx!`)}\nYou Can try to run command for manual start nx daemon\n\t: npx nx show projects --json`);
    }
  } else if (type == 'frontend') {
    let hostSiteProjects;
    try {
      hostSiteProjects = JSON.parse(await execRun('npx nx show projects -p *-site --json'));
    } catch (error) {
      console.error(chalk.red(`Can't get projects list!`));
      process.exit(1);
    }

    let host;
    if (hostSiteProjects.length == 0) {
      console.error(chalk.red(`Don't found any host site project. You need to create it first!`));
      process.exit(1);
    } else {
      host = (await prompts({
        type: 'select',
        name: 'host',
        message: 'Choose the host site of this module?',
        choices: hostSiteProjects.map(e => ({ title: e, value: e })),
        initial: 0
      })).host;

    }

    let appFullPath = `websites/modules/${appName}-module`;
    const args = [
      `--standalone`,
      `--ssr`,
      `--addTailwind`,
      `--style=scss`,
      `--e2eTestRunner=playwright`,
      `--projectNameAndRootFormat=as-provided`,
      `--prefix=${appName}`,
      `${dryRun ? '--dry-run' : ''}`,
      appFullPath,
    ]
    try {
      const result = await execRun(`nx g @nx/angular:remote ${args.join(' ')}`);
      console.log(result);
    } catch (err) {
      console.error(`${chalk.red(`Can't create project via nx!`)}\nYou Can try to run command for manual start nx daemon\n\t: npx nx show projects --json`);
    }


  } else {
    let appFullPath = `websites/hosts/${appName}-site`;
    const args = [
      `--standalone`,
      `--ssr`,
      `--addTailwind`,
      `--style=scss`,
      `--e2eTestRunner=playwright`,
      `--projectNameAndRootFormat=as-provided`,
      `--prefix=${appName}`,
      `${dryRun ? '--dry-run' : ''}`,
      `${appFullPath}`,
    ]
    try {
      const result = await execRun(`nx g @nx/angular:host ${args.join(' ')}`);
      console.log(result);
    } catch (err) {
      console.error(`${chalk.red(`Can't create project via nx!`)}\nYou Can try to run command for manual start nx daemon\n\t: npx nx show projects --json`);
    }
  }


}
