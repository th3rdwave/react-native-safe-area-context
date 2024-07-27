const project = (() => {
  try {
    const { configureProjects } = require("react-native-test-app");
    return configureProjects({
      macos: {
        sourceDir: "macos",
        automaticPodsInstallation: true,
      },
    });
  } catch (_) {
    return undefined;
  }
})();

module.exports = {
  ...(project ? { project } : undefined),
};
