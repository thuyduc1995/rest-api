'use strict';

import {restContext, get, paramMapping, pParam} from '../core/rest'
import {rest, inject} from '../core/inject'

/**
 * Account Restful API
 */
@rest
@restContext('/accounts')
export class AccountRest {

    @inject
    accountService

    @get('/:id')
    @paramMapping(pParam('id'))
    get(id) {
        return this.accountService.get(id);
    }

}