import { exec } from 'child_process';

export const execRun = (cmd) => {
  return new Promise((resolve, reject) => {
    exec(cmd, (error, stdout) => {
      if (error) {
        if (error.code === 1) {
          // leaks present
          resolve(stdout);
        } else {
          // gitleaks error
          reject(error);
        }
      } else {
        // no leaks
        resolve(stdout);
      }
    })
  })
}
