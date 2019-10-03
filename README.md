# webapp-quickbuild
Webapp-Quickbuild is a tool that can easily setup the web application using existing templates and modules. It will save you a lot of time on configuring and installing, all you need to do is just select which frameworks you want to use, what configurations you want to have, then let the program to do the jobs for you.

# Prerequisites
- Python
- virtualenv
- node
- npm
- docker

# Get started:
Run `node cli.js` to get started.

## Backend
If you are using `flask` framework as the backend, please use `virtualenv backend/venv/bin/activate` to activate the virtual environment first, then use `python backend/app.py` to start the app, it will be running on [localhost:5000](http://localhost:5000) by default.

If you are using `express` framework, simply run `npm start` to start the webapp, or `npm start:debug` to start it in debug mode.

## Database
Docker is required in order to build databases since we are using images instead of actually downloading them. Please remember to stop the container using `docker stop webapp_database` and it will be removed automatically after being stopped. The name of the database container will always be `webapp_database` by default. The script to start the database will also be added to the root of the project, to start the database again just use `./startdb.sh` in your project.

- Tips: If you are using flask as the backend, you can run `python backend/database.py` to check if the connection to the database is success or not, however, the status of the database connection will also be shown on the webpage.

# Templates
There are some templates available in the templates folder, it shows how the whole project will look like after build.

# TODO
- [x] mongodb
- [ ] mysql
- [ ] postgresql
- [x] express
- [ ] configurations
- [ ] tests
