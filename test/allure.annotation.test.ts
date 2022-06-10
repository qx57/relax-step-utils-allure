import { AllureApiAttaches } from '../index.js';

describe('Check allure annotations', () => {

    it('I can use AllureApiAttaches', () => {
        let api = new ApiController();
        api.apiRequest({"x-header": "ololo"});
    });
});

/** Example class */
class ApiController {

    @AllureApiAttaches('MY API REQUEST')
    async apiRequest(body: any) {
        return {
            "statusCode": 200,
            "body": {
                "foo": "bar"
            }
        };
    }
}