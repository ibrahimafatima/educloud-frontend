import Raven from "raven-js";

function init() {
  Raven.config(
    "https://5ad9343e5a47451eb8b82a4d8c55f269@sentry.io/3644427"
  ).install();
}

function log(error) {
  Raven.captureException("New Error ", error);
}

export default {
  init,
  log
};
