## Description

This sample app showcases the integration of different layers of the Nest, GraphQL and TypeOrm frameworks. It contains validations, autoschema generation and Nest components which create the ecosystem.

## Naming Conventions
 
 The easiest way to decipher project layout is to look at the extension names of the files.  Each component follows a pod-style layout where the functional areas belong to a folder structure.

 .enum - permissions for demo application.

.guard - helps perform authroization for endpoints. Intercepts a given request and acts as method level permission.

.input - graphql objects used to control the data passed to a given graphl.

 .module - declare a high-level functional component

.resolver - indicates a graphql resolver

.service - indicates a service that interacts with graphql types.

.type - indicates a graphql object type

.entity - indicates a **typeorm** object, not to be confused with a graphql type.

## Responsibilities

This microservice showcases the different layers of the NestJS Framework interfacting with TypeOrm. In addition, it utilizes guards to enforce authorization and access to various endpoints using nestjs typescript decorators.  See **AuthGuard** and **EnrollmentGaurd** for more details. In addition, you can see context being utilized for getting information related to whether an operation should be carried out or not. 

## Architecture

See graphl-api draw.io diagram in this project. The gateway injects authorization tokens into outgoing requests if they exist. Receiving microservice can use this information to determine if a token is valid and has appropriate permissions tied to it in order to carry out a given request. This decouples the gateway architecture as being a lightweight pass-through medium.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Frameworks

The following frameworks are components of this demo project.

[TypeOrm](https://github.com/typeorm/typeorm/blob/master/docs/select-query-builder.md) for relational mapping with dbs.

[GraphQL](https://graphql.org/) for creating graphql api's.

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

[Postgres](https://www.postgresql.org/) database implementation for this project. Can be swapped out for another db. See **typeorm.config.ts**

## License

 N/A
