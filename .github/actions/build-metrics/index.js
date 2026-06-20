const core = require('@actions/core');
const github = require('@actions/github');
const fs = require('fs');
const path = require('path');

try {

    function getFiles(dir, extension) {

        let results = [];

        const files = fs.readdirSync(dir);

        for (const file of files) {

            const filePath = path.join(dir, file);

            const stat = fs.statSync(filePath);

            if (stat.isDirectory()) {

                results = results.concat(
                    getFiles(filePath, extension)
                );
            }
            else if (file.endsWith(extension)) {

                results.push(filePath);

            }
        }

        return results;
    }

    const csFiles = getFiles('.', '.cs');

    const csprojFiles = getFiles('.', '.csproj');

    let totalLines = 0;

    for (const file of csFiles) {

        const content = fs.readFileSync(file, 'utf8');

        totalLines += content.split('\n').length;

    }

    const branch =
        github.context.ref.replace("refs/heads/", "");

    const sha =
        github.context.sha.substring(0, 7);

    console.log("===== BUILD METRICS =====");
    console.log(`Projects : ${csprojFiles.length}`);
    console.log(`Files    : ${csFiles.length}`);
    console.log(`Lines    : ${totalLines}`);
    console.log(`Branch   : ${branch}`);
    console.log(`Commit   : ${sha}`);

    core.setOutput("projects", csprojFiles.length);
    core.setOutput("files", csFiles.length);
    core.setOutput("lines", totalLines);
    core.setOutput("branch", branch);
    core.setOutput("sha", sha);

}
catch (error) {

    core.setFailed(error.message);

}