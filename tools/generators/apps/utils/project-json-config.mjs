import { writeFileSync, readFileSync, rmSync } from 'fs';
import { join } from 'path';
import { cwd } from 'process';

export const projectJsonConfig = (appFullPath, appName, postfix) => {
  const projectConfigs = JSON.parse(readFileSync(join(appFullPath, 'project.json'), { encoding: 'utf8' }));

  projectConfigs.targets.serve.options.hmr = true;

  projectConfigs.targets.build.options.assets = [
    ...projectConfigs.targets.build.options.assets,
    {
      glob: "**/*",
      input: "node_modules/@taiga-ui/icons/src",
      output: "assets/taiga-ui/icons"
    }
  ];

  projectConfigs.targets.build.options.styles = [
    ...projectConfigs.targets.build.options.styles,
    "node_modules/@taiga-ui/core/styles/taiga-ui-theme.less",
    "node_modules/@taiga-ui/core/styles/taiga-ui-fonts.less",
  ]



  projectConfigs.targets.build.configurations.production.customWebpackConfig.path = projectConfigs.targets.build.configurations.production.customWebpackConfig.path.replace('prod', 'production');


  writeFileSync(`${appFullPath}/webpack.production.config.ts`, readFileSync(`${appFullPath}/webpack.prod.config.ts`));
  writeFileSync(`${appFullPath}/webpack.staging.config.ts`, readFileSync(`${appFullPath}/webpack.prod.config.ts`));
  rmSync(`${appFullPath}/webpack.prod.config.ts`);

  projectConfigs.targets.build.configurations.staging = {
    ...projectConfigs.targets.build.configurations.production,
    customWebpackConfig: {
      path: projectConfigs.targets.build.configurations.production.customWebpackConfig.path.replace('production', 'staging')
    }
  }

  projectConfigs.targets.dockerize = {
    "executor": "@nx-tools/nx-container:build",
    "dependsOn": ["build", "server"],
    "options": {
      "engine": "docker"
    },
    "configurations": {
      "development": {
        "metadata": {
          "load": true,
          "images": [`${appName}-${postfix}`],
          "tags": ["type=raw,value=local"]
        }
      },
      "ci": {
        "metadata": {
          "images": [`${appName}-${postfix}`],
          "tags": [
            "type=ref,enable=true,prefix=,suffix=,event=branch",
            "type=ref,enable=true,prefix=pr,suffix=,event=pr",
            "type=ref,enable=true,prefix=v,suffix=,event=tag"
          ]
        }
      }
    },
    "defaultConfiguration": "development"
  }


  writeFileSync(`${appFullPath}/project.json`, JSON.stringify(projectConfigs));

}
