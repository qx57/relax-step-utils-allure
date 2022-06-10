# relax-step-utils-allure

Create your autotests more easily! Step tools with simple allure reporting.

***You must use mocha test starter if you want use this package with mocha-multi-reporter***

## Requirements

* node.js ^17.9.0
* ts-node ^9.1.1
* mocha ^8.2.1
* mocha-multi-reporter ^1.5.1

## Dependencies

* @types/node ^17.0.41

## Installation

```bash
> npm i relax-steps-allure
```

## Getting started

1. Init started reporting configuration:

```bash
> npx relax-steps-allure setinit
```

for creation ***.mocharc.json*** and ***reporterConfig.json*** files (needed for correct package work). If you have this files - just update it (you don't need install anymore else):

* .mocharc.json:

```json
{
    ...
    "require": ["ts-node/register"],
    "reporter": "mocha-multi-reporters",
    "reporter-option": "configFile=reporterConfig.json"
    ...
}
```

* reporterConfig.json (default variant):

```json
{
    "reporterEnabled": "allure-mocha, list",
    "allureMochaReporterOptions": {
        "resultsDir": "./allure-results"
    }
}
```

2. Include step tools into your test:

```ts
import { step } from 'relax-steps-allure';
```

or

```js
const step = require('relax-steps-allure').step;
```

3. Use steps in tests:

```js
it('My test', async () => {
    await step('Step', async () => {
        // Some code of your case step
    });
    await step('One more step', async () => {
        // ...
    });
});
```

4. Enjoy! Your report is in allure-results =)

## Additional usage

### Nope test

if you can prepare your automation test but must commit it immediately - use ***nit*** method:

```js
nit('My test', async () => {
    await step('First step', async () => {});
    await step('Second step', async () => {});
    // ...
});
```
and your code never starts when suite is runned. Also you can create test cases for future automation just in suite.

### Error's await

When you await some error or exception in your test - you have two ways catch it without test falling:

* You can catch error throug its type:

```js
import { step, stepIgnoreError } from 'relax-steps-allure';

it('Test with some error', async () => {
    // ...
    await stepIgnoreError('Step with error', TypeError, async () => {
        throw new TypeError('Some error happens');
    });
});
```

* Or you can use exception catching by its message:

```js
import { step, stepIgnoreErrorByMessage } from 'relax-steps-allure';

it('Another test with some error', async () => {
    // ...
    await stepIgnoreErrorByMessage('Anothe step with error', 'Shit happens', async () => {
        throw new Error('Shit happens');
    });
});
```

### API logging

When you testing API endpoints, you can use request/response attachment which attached with step each time when you send request in it - just use annotation ***@AllureApiAttaches*** in API controller:

```ts
class ApiController {

    @AllureApiAttaches('MY API REQUEST')
    async apiRequest(
        headers: any,
        body: any
    ) {
        return api.request(headers, body).response;
    }
}
```

## Contributors

[qx57](https://github.com/qx57)