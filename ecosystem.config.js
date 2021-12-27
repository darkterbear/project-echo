/* PM2 CONFIGURATION FILE */
// Options reference: https://pm2.io/doc/en/runtime/reference/ecosystem-file/
module.exports = {
  apps: [
    {
      name: 'Server',
      script: 'build/app.js',
      cwd: 'server/',
      instances: 1,
      autorestart: true,
      watch: false,
      env: {
        TS_NODE_PROJECT: "tsconfig.json"
      }
    },
    {
      name: 'Client',
      script: 'serve -s -p 5005',
      cwd: 'client/build/',
      instances: 1,
      autorestart: true,
      watch: false,
    }
  ],
};
