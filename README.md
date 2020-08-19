# angular-jwt-interceptor boilerplate

This boilerplate is meant to be used as a guide on how to make a correct implementation of the interceptor in a JWT Server. **This should not be used as it is in a production environment.**

## Important files

The files you should check as a guide are: 
- **auth.service.ts**: This file contains the code to get, store and refresh the token. In this case, there is no refesh method in the backend, so we login again with the user.
- **auth-interceptor.service.ts**: The interceptor itself. Contains the functions to check if the token is valid before sending the request.

## How to run

For the testing API REST, [json-server](https://github.com/typicode/json-server) has been used with [json-server-auth](https://github.com/jeremyben/json-server-auth) as the JWT Middleware.

I recommend to install both of them globally (that's why those packages are not included within the `package.json`).

To run the server once installed both packages do: 

    json-server-auth db.json -r routes.json

To run the Angular application, just do `ng serve`.

If you want to, you can modify the `db.json` and `routes.json`, as well as the credentials in the authentication service, to suit your needs.
