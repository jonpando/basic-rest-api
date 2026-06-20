const core = require('@actions/core');
const github = require('@actions/github');

try {

    console.log("===================================");
    console.log("Version Generator Action");
    console.log("===================================");

    const now = new Date();

    const year = now.getFullYear();

    const month = String(now.getMonth() + 1).padStart(2, '0');

    const day = String(now.getDate()).padStart(2, '0');

    const hour = String(now.getHours()).padStart(2, '0');

    const minute = String(now.getMinutes()).padStart(2, '0');

    const second = String(now.getSeconds()).padStart(2, '0');

    const timestamp =
        `${year}${month}${day}-${hour}${minute}${second}`;

    const branch =
        github.context.ref.replace("refs/heads/", "");

    const sha =
        github.context.sha.substring(0, 7);

    const repository =
        github.context.repo.repo;

    const owner =
        github.context.repo.owner;

    const dockerTag =
        `${branch}-${timestamp}-${sha}`;

    console.log(`Repository : ${repository}`);
    console.log(`Owner      : ${owner}`);
    console.log(`Branch     : ${branch}`);
    console.log(`SHA        : ${sha}`);
    console.log(`Timestamp  : ${timestamp}`);
    console.log(`Docker Tag : ${dockerTag}`);

    core.setOutput("docker-tag", dockerTag);
    core.setOutput("branch", branch);
    core.setOutput("sha", sha);
    core.setOutput("repository", repository);
    core.setOutput("owner", owner);
    core.setOutput("timestamp", timestamp);

}
catch (error) {

    core.setFailed(error.message);

}