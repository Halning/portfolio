# Port

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.0.3.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.


# GitHub Copilot tips
## Common tips
1. Open files in the tab, copilot can see the context
2. Use comment for explain copilot what you want
3. Make name of the file and class, methods clear
4. Use Q&A to ask questions
   ```ts
    //Q: What is the best way to test this?
    //A: You can use Jest to test this
   ```

## Create class/service example, just describe what it should do
```ts 
//This service is used to communicate with openexchangerates.org
//It uses the Spring RestTemplate to make HTTP requests
//RestTemplate will be provided from RestTemplateUtil class
//This service is used to communicate with openexchangerates.org to take historical data for the last 30 days of data 
//It uses OpenExchangeService to take historical data via the getHistoricalExchangeRates method 
//The historical data is analyzed, and each currency's average exchange rate for the last month is calculated.
```

## Optimize code:
```ts
//I need the findDuplicates method to have a better performance, especially for large arrays
  //What can I do to improve the performance of this method?
```
```ts
//an optimized version of the above method
//dateFormatter is used to format the date in the required format YYYY-MM-DD
//number of days is set to 30 by NUMBER_OF_DAYS constant
// Q: how can I optimize the method above?
// A: You can use the following optimized version of the method
````

## Error fixing:
```ts
//Q: I am facing an error from the remote server. 400 Bad Request: "{<EOL> "error": true,<EOL> "status": 400,<EOL> "message": "invalid_date",<EOL> "description": "Historical API queries require a valid date in the format 'YYYY-MM-DD.json'.
```

## Testing
### Test cases
 1. Create a test file, open file which should be tested than in the test brief describe and
 2. ```Test cases will be:``` Provide the first and then Copilot suggest next
 3. highlight the function and ask Copilot chat to write a unit test

### The Given-When-Then Approach
```ts
//given I want RPN Calculator to calculate the expression in RPN supporting basic operators
//when The expression is 1 + 3
//then The result should be 3
```
