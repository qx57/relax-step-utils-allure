import { allure } from 'allure-mocha/runtime';

/** For empty tests without reporting */
export const nit = (...args: any[]): void => {}

/** Type for step callback */
type StepCallback = (...args: any[]) => void;

/** Simple test step with allure integration */
export const step = async function (
    message: string,
    callback: StepCallback
): Promise<void> {
    await allure.step(message, async () => {
        console.log("\n[STEP] " + message);
        await callback();
        console.log('Step complete');
    });
}

/** Step which ignore exception type */
export const stepIgnoreError = async function (
    message: string,
    errType: any,
    callback: StepCallback
): Promise<void> {
    await allure.step(message, async () => {
        console.log("\n[STEP] " + message);
        try {
            await callback();
        } catch(err: any) {
            if (err.name != errType.name) {
                let e: any = err;
                throw new Error(e);
            }
        }
        console.log('Step complete');
    });
}

/** Step which ignore exception with specified message */
export const stepIgnoreErrorByMessage = async function (
    message: string,
    errMessage: string,
    callback: StepCallback
): Promise<void> {
    await allure.step(message, async () => {
        console.log("\n[STEP] " + message);
        try {
            await callback();
        } catch(err: any) {
            if (err.message !== errMessage) {
                throw new Error(err);
            }
        }
        console.log('Step complete');
    });
}

/**
 * ----------------------- *
 *   modules export area   *
 * ----------------------- *
 */
export const AllureApiAttaches = require('./allure.annotations.js').AllureApiAttaches;