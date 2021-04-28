# isgood.ai frontend

This repo contains the code for the frontend part of the isgood.ai webapp

## To contribute code to this Repo Please:

- Check TODO section below for tasks that needs to be done
- Create a task on click up and assign yourself to it.
- Pull the this repo to your local machine 
- Create a new branch on your local machine.  **Please give the branch a name corresponding to the functionality you are working on.**
- Work on the functionality in the new branch you created and once done push it to this repo and do a merge request.
- Once your code is reviewed it would be merged with the master branch of this repo.


## Commands to Run the Webapp on your Machine
**NB: The following commands should only be run while in the new branch you created after pulling the repo** 

In the project's main directory, you should run:

### `npm install`

This will install the required dependencies for the webapp.
**NB: You only need to run this once and that's after pulling the code from github for the first time.**

A comprehensive list of dependencies would be saved in a 'requirements.txt' file in the future.

### `npm start`

This command will run the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

## Intructions
 Copy and Edit the `.envsample` file to include the fields for Auth0 and rename to .env
 
## TODO
**Please see the current mock-up we are working with at [Mock Up on Miro](https://miro.com/app/board/o9J_kyYfLV0=/?moveToWidget=3074457356087093073&cot=14)**

- ~~Complete the login and signup functionality to communicate with the backend API.~~
- Implement Internationalization for the webapp.
- Add functionality to redirect the user to the dashboard once logged in. 
- Add dashboad component
- Add organisation component
- Add project component
- ~~Add functionality to let users create new organisation.~~ 
- Add functionality to let users create create new project. 
- Add functionality to let users invite new user to an organisation and project. 
- Add functionality to let user edit their profile information. 

