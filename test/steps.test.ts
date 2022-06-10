const { ifError } = require('assert');
const assert = require('assert');
const { nit, step, stepIgnoreError, stepIgnoreErrorByMessage } = require('../index.js');

describe('Steps unit tests', async () => {
    it('I can use nit case', async () => {
        let a = true;
        nit('Test never started', () => {
            a = false;
        });
        assert(a);
    });

    it('I can use simple step', async () => {
        let a = true;
        await step('Simple step', async () => {
            a = false;
        });
        assert(!a);
    });

    it('I can ignore error when use stepIgnoreError', async () => {
        await stepIgnoreError('Ignore TypeError for example', TypeError, async () => {
            throw new TypeError('TypeError');
        });
    });

    it('I can ignore error through it message', async () => {
        let message = 'my error message';
        await stepIgnoreErrorByMessage('Ignore error', message, async () => {
            throw new TypeError(message);
        });
    });
});