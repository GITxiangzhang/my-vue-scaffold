import Mock from 'mockjs';
import * as _ from 'lodash';

import * as common from './modules/common';


export default {
    common
};

/**
 *  mockjs full api:https://github.com/nuysoft/Mock/wiki
 *
 *  data template definition can be found in http://mockjs.com/examples.html
 */
/*const registerMockModule = _.curry(function (...module) {
    module.map(m =>
        Object.keys(m).map(function (m1) {
            let {url, method, response} = m[m1].apply();
            Mock.mock(RegExp(url), method, response);
        })
    );
});

registerMockModule(mockers);*/
