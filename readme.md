## Configuration

### .env-template

This file contains a list and description of all the environment variables that are used by the application.  It is the configuration setting documentation.


###  Dotenv

The project used the _dotenv_ package which loads environment variables defined in a .env file to process.env.  In a production environment you would just configure the evironment varaibles defined in the .env-template file, for development create a copy of the .env-template called .env which you then set the appropriate values for development ( .env is excluded from the source control ).

When adding new eviroment variable it must be defined in the .env-template otherwise there will be undocumented configuration setting.