import { allure } from 'allure-mocha/runtime';

/** Annotation for logging API requests n responses */
export const AllureApiAttaches = (message: string) => {
    return (target: Object, property: string, descriptor: PropertyDescriptor) => {
        const originalFunction = descriptor.value;
        descriptor.value = async function (...args: any[]) {
            allure.createAttachment(
                `${message} ARGUMENTS`,
                JSON.stringify(args, null, 2),
                'application/json' as any
            )
            console.info(`${message} ARGUMENTS` + JSON.stringify(args, null, 2));

            const result = await originalFunction.apply(this, args);

            allure.createAttachment(
                `${message} RESULT`,
                JSON.stringify(result.body, null, 2),
                'application/json' as any
            )
            console.info(`${message} RESULT` + JSON.stringify(result.body, null, 2));
            return result;
        };
        return descriptor;
    };
}