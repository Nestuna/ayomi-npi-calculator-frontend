# NPI calculator Client App

Client application par for NPI calculator. A calculator that use Reverse Polish Notation (RPN)  alogrithm to make calculations.
Works with the  [NPI calculator API REST server](https://github.com/Nestuna/ayomi-npi-calculator-server)

## Requirement

- Node >= 20

## Installation

First you have to enter the API address in environement.dist.ts ans rename it to environement.ts
```
export const environement = {
  apiUrl : '<api adress>' (e.g. 'http://0.0.0.0:8000')
}

```
Then install the node modules
```
npm install
```

## Run application in dev mode
You can run the application with the following command:
```
npm run dev
```

