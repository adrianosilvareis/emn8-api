# Employee Maintenance

This is an employee maintenance project. Here are the steps to run this application:

## Installation

1. Clone this repository to your local machine using `git clone https://git.number8.com/adriano_silvareis/employee_maintenance_adriano_challenge.git`.

2. Navigate to the project folder using `cd employee_maintenance_adriano_challenge`.

3. Install all project dependencies by running `pnpm install`.

## Structure 
* for this project I used the **clean architecture**
* I organized the files in the following way
  
  - entity-name-folder
    - domain
      1. **entities**
        defines the business entities interface
      1. **entities**
        define a interface das entidades de negocio
      2. **applications**
        Application classes extend the entities and implement application-specific properties such as **Id**, **updateAt**
      3. **protocols**
        protocols define the communication interface between structures that will be implemented in the infrastructure layer
      4. **use-cases**
        defines the use case interface
    - Infrastructure
      1. **gateways**
        communication layer with external services, databases and other calls outside the application.
      2. **repositories**
        layer that implements the use cases of the application.

  - tests
    - replay the same structure of **src** folder
