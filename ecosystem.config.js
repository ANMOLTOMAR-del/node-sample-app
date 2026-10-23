module.exports = {
  apps: [{
    name: 'node-sample-app',
    script: 'src/server.js',
    instances: 1,
    autorestart: true,
    env: { NODE_ENV: 'production', PORT: 3000 }
  }]
};
