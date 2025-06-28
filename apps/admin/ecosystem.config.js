module.exports = {
  apps: [
    {
      name: "my-v0-project",
      cwd: "/home/project/front/dist",
      script: "npm",
      args: "start",
      env: {
        NODE_ENV: "production",
        PORT: 3000
      }
    }
  ]
};
