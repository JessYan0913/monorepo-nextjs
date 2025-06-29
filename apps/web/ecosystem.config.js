module.exports = {
  apps: [
    {
      name: "g-force-web",
      cwd: "/home/project/front/apps/web/dist",
      script: "npm",
      args: "start",
      env: {
        NODE_ENV: "production",
        PORT: 3001
      }
    }
  ]
};
