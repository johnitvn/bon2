import { execRun } from '../../utils/exec-run.mjs';

export const microserviceApp = async (appName, dryRun) => {
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
    process.exit(1);
  }
}
