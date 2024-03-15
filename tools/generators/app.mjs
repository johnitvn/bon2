import prompts from 'prompts';
import chalk from 'chalk';
import { frontendApp } from './apps/frontend.mjs';
import { forntendHostApp } from './apps/frontend-host.mjs';
import { gatewayApp } from './apps/gateway.mjs';
import { microserviceApp } from './apps/microservice.mjs';

export const appGeneratorCommandAction = async (appName, options) => {

  let { dryRun, type } = options;


  if (!type || !['microservice', 'frontend-module', 'gateway', 'frontend-host'].includes(type)) {
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
        { title: 'Micro frontend remote module', value: 'frontend-module' },
        { title: 'Micro frontend host', value: 'frontend-host' },
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
    await microserviceApp(appName, dryRun);
  } else if (type == 'gateway') {
    await gatewayApp(appName, dryRun);
  } else if (type == 'frontend-module') {
    await frontendApp(appName, dryRun);
  } else {
    await forntendHostApp(appName, dryRun);
  }


}
