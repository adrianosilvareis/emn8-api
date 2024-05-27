# Employee Maintenance

This is an employee maintenance project. Here are the steps to run this application:

## Installation

1. Clone this repository to your local machine using `git clone https://git.number8.com/adriano_silvareis/EMN8_API.git`.

2. Navigate to the project folder using `cd EMN8_API`.

3. Install all project dependencies by running `pnpm install`.

4. To run the tests use `pnpm test`.

## Structure 
* for this project I used the **clean architecture**
* I organized the files in the following way
  
  - entity-name-folder
  
    - domain
      1. **entities**
        Defines the business entities interface
      1. **entities**
        Define a interface das entidades de negocio
      2. **applications**
        Application classes extend the entities and implement application-specific properties such as **Id**, **updateAt**
      3. **protocols**
        Protocols define the communication interface between structures that will be implemented in the infrastructure layer
      4. **use-cases**
        Defines the use case interface

    - infrastructure
      1. **gateways**
        Communication layer with external services, databases and other calls outside the application.
      2. **repositories**
        Layer that implements the use cases of the application.

    - main
        Communication layer with external frameworks such as express. Build of project instances and configuration of server routes

  - tests
    - replay the same structure of **src** folder

## environments 

It is necessary to create a .env file in the project root and add the `DATABASE_URL` and `PORT` property.
If you use `docker-compose` and run an instance of the local database, use this, `DATABASE_URL="postgresql://employee:maintencence@localhost:5432/EMN8?schema=public"`, otherwise, fill in using the data from your postgres database instance.

## What could have been done better?

1. The instance build could make use of a dependency conversion tool like inversify, larger projects will have difficulty dealing with all dependencies without using it.
2. For error handling, prefer to use the **either** pattern instead of using **trycatch**, it is a better practice and makes the possible flows of the application more evident to the programmer than just using **trycatch**.
3. The application does not use a logger, but it is extremely important to use it to manage the operation of the application, I like to make use of the `winston` tool and services like `datadog`.