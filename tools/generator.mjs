
import { Command } from 'commander';
import { appGeneratorCommandAction } from './generators/app.mjs';


const program = new Command();
program
  .showHelpAfterError()
  .name('generator')
  .description('Code generator tool')

program.command('app')
  .description('Generator application')
  .argument('[Application Name]', 'application name', undefined)
  .option('-dr, --dry-run', 'dry run', false)
  .option('-t, --type <string>', 'application type: gateway,service,site,frorntend')
  .action(appGeneratorCommandAction);

program.parse();
