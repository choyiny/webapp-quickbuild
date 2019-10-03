const child_process = require('child_process');
const fs = require('fs');
const path = require('path');

let frontendDir, backendDir, workDir;
const starters = {
    'flask': path.resolve(__dirname, 'starter', 'flask'),
    'react': path.resolve(__dirname, 'starter', 'react'),
    'html': path.resolve(__dirname, 'starter', 'html'),
    'webpack': path.resolve(__dirname, 'starter', 'webpack'),
    'database': path.resolve(__dirname, 'starter', 'database'),
    'scripts': path.resolve(__dirname, 'starter', 'scripts'),
}

function general(workdir) {
    console.log('\nCreating general files...\n');
    workDir = workdir;
    frontendDir = path.join(workDir, 'frontend');
    backendDir = path.join(workDir, 'backend');
    fs.mkdirSync(frontendDir);
    fs.mkdirSync(backendDir);
}

function backend(backend) {
    // Create files and folders
    if(backend === 'flask') {
        // Setting up virtualenv for the backend
        fs.copyFileSync(path.resolve(starters.flask, 'requirements.txt'),
            path.join(backendDir, 'requirements.txt'));
        console.log('\nSetting up virtualenv for backend...\n');
        child_process.execSync(`virtualenv ${path.join(backendDir, 'venv')}/`);
        console.log('\nInstalling libraries in virtualenv...\n');
        child_process.execSync(`source ${path.join(backendDir, 'venv', 'bin', 'activate')} &&
            pip install -r ${path.join(backendDir, 'requirements.txt')}`);
        // flask files
        console.log('\nCreating backend files for flask...\n');
        fs.mkdirSync(path.join(backendDir, 'templates'));
        fs.mkdirSync(path.join(backendDir, 'static'));
        fs.copyFileSync(path.resolve(starters.flask, 'flask_starter.py'),
            path.join(backendDir, 'app.py'));
        fs.copyFileSync(path.resolve(starters.html, 'html_starter.html'),
            path.join(backendDir, 'templates', 'index.html'));
    }
}

function frontend(frontend) {
    if(frontend === 'react') {
        console.log('\nCreating frontend files for react...\n');
        fs.mkdirSync(path.join(frontendDir, 'js'));
        fs.mkdirSync(path.join(frontendDir, 'css'));
        fs.copyFileSync(path.resolve(starters.react, 'react.starter.json'),
            path.join(frontendDir, 'package.json'));
        fs.copyFileSync(path.resolve(starters.react, 'react.starter.jsx'),
            path.join(frontendDir, 'js', 'index.jsx'));
        fs.copyFileSync(path.resolve(starters.react, 'react.app.starter.jsx'),
            path.join(frontendDir, 'js', 'App.jsx'));
        fs.copyFileSync(path.resolve(starters.react, 'react.babelrc'),
            path.join(frontendDir, '.babelrc'));
        fs.copyFileSync(path.resolve(starters.webpack, 'webpack.common.starter.js'),
            path.join(frontendDir, 'webpack.common.js'));
        fs.copyFileSync(path.resolve(starters.webpack, 'webpack.dev.starter.js'),
            path.join(frontendDir, 'webpack.dev.js'));
        fs.copyFileSync(path.resolve(starters.webpack, 'webpack.prod.starter.js'),
            path.join(frontendDir, 'webpack.prod.js'));
        console.log('\nInstalling dependencies for react...\n');
        child_process.execSync(`cd ${frontendDir} && npm install`);
        console.log('\nBuilding react app...\n');
        child_process.execSync(`cd ${frontendDir} && npm run build`);
    }
}

function database(backend, database) {
    if(database === 'MongoDB') {
        if(backend === 'flask') {
            console.log('\nCreating database using docker...\n');
            child_process.execSync(`${__dirname}/mongodb.sh`, {stdio: 'inherit'});
            console.log('\nCreating database files...\n');
            fs.copyFileSync(path.resolve(starters.database, 'database_starter.py'),
                path.join(backendDir, 'database.py'));
            fs.copyFileSync(path.resolve(starters.scripts, 'startdb.sh'),
                path.join(workDir, 'startdb.sh'));
        }
    }
}

function postBuild() {

}

module.exports = {
    generalSetup: general,
    backendBuild: backend,
    frontendBuild: frontend,
    dbBuild: database,
}