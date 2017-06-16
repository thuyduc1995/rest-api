'use strict';

import {body, ctx, restContext, post, paramMapping, pParam} from '../core/rest'
import {rest, inject} from '../core/inject'
import * as jwt from 'koa-jwt'

/**
 * Account Restful API
 */
@rest
@restContext('/accounts')

export class AccountRest {
    @inject
    accountService

    // @get('/:id')
    // @paramMapping(pParam('id'))
    // get(id) {
    //     return this.accountService.get(id);
    // }
    @post('/login')
    @paramMapping(ctx, body)
    login(ctx, body) {
        let query = this.accountService.findOne({ username: body.username });
        let response = {};

        if (query) {
            if (body.password === query.password) {
                const token = jwt.sign({
                    id: query.id,
                    username: body.username
                }, 'fcp');

                response = { token };
            } else {
                ctx.response.status = 401;
            }
        } else {
            ctx.response.status = 401;
        }

        return response;
    }  
}


