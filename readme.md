# Cardspace api

Restfull api for the cardspace application.


## Release Notes

### Next version 

* Cards have a status of either active or complete, they initially start off as active.
    *   PUT /v1/card/:id/complete
    *   PUT /v1/card/:id/activate


### Vr 0.1.0

* Users have to login.
* You can create, edit and delete a card.
* You can get a list of all cards for the logged in user.


## Api

* *GET /* - returns name of the service
* *GET /version* - returns the current version of the api
* *GET /v1/cards* - gets all cards created by the authenticated user.
* *POST /v1/cards* - create a card for the authenticated user

```
{
    "title": "google",
    "url": "www.google.co.uk",
    "description": "Description"
}
```

* *GET /v1/card/:id* - get the card if it was created by the authenticated user.
* *PUT /v1/card/:id* - updated the card if it was created by the authenticated user.

```
{
    "title": "google",
    "url": "www.google.co.uk",
    "description": "Description"
}
```

* *DELETE /v1/card/:id* - deletes the card if it was created by the authenticated user.

* *PUT /v1/card/:id/complete* - changes a cards status to completed.
* *PUT /v1/card/:id/activate* - changes a cards status to active.



## Configuration

### .env-template

This file contains a list and description of all the environment variables that are used by the application.  It is the configuration setting documentation.


###  Dotenv

The project used the _dotenv_ package which loads environment variables defined in a .env file to process.env.  In a production environment you would just configure the evironment varaibles defined in the .env-template file, for development create a copy of the .env-template called .env which you then set the appropriate values for development ( .env is excluded from the source control ).

When adding new eviroment variable it must be defined in the .env-template otherwise there will be undocumented configuration setting.