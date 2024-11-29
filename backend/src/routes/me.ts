import { Hono } from 'hono'
import { verify } from 'hono/jwt';

export const meRouter = new Hono<{
    Bindings: {
        JWT_SECRET: string;
    },
    Variables: {
        loggedIn: boolean;
    }
}>();

// NOTE : hono/jwt verify only works with middleware

//middleware : just to implement verify
meRouter.use('/*', async (c, next) => {
    try {
        const authToken = await c.req.header("authorization") || "";
        // console.log(authToken);
        if (!authToken || !authToken.startsWith('Bearer ')) {
            return c.json({
                loggedIn: false,
                message: 'token invalid / missing'
            });
        }

        const token = authToken.split(' ')[1];
        // console.log(token);
        if(!token){
            return c.json({
                loggedIn : false,
                message : 'token invalid / missing'
            });
        }
        const payload = await verify(token, c.env.JWT_SECRET);
        if (!payload) {
            return c.json({
                loggedIn: false,
                message: 'invalid /missing token'
            });
        }

        c.set('loggedIn', true);
        await next();
    } catch (err) {
        return c.json({  // have returns for this everywhere
            loggedIn: false,
            message: 'invalid token'
        });
    }
})

meRouter.get('/', async (c) => {
    try {
        const loggedIn = c.get('loggedIn');
        return c.json({
            loggedIn,
            message: 'valid token'
        })
    } catch (err) {
        c.json({
            loggedIn: false,
            message: 'invalid / missing token'
        });
    }
})