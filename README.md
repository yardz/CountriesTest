# How to use this repo

Brief description of the project. We have the `/app` folder. Inside this folder we have `backend` and `frontend` folders. The backend is a Nestjs backend application and the frontend is a React/Next application.

## How to run the project

1- You need to install all node dependencies. You can do this by running `yarn`. The turborepo will install all dependencies for those projects.

2- Run `yarn dev` and have fun.

### Tips

This repo was created using turborepo, by convenience you can run `yarn dev` in the root folder and it will run the backend and frontend applications.
If you want to run only the backend or frontend you can go to the respective folder and run `yarn dev` or you can run `yarn turbo dev --filter=country-test-client` and/or `yarn turbo dev --filter=country-test-backend` in the root folder
