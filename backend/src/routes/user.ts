import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign, verify } from 'hono/jwt';
import { signinInput, signupInput } from "@darkxprime/medium-common";

export const userRouter = new Hono<{
    Bindings : {
        DATABASE_URL : string;
        JWT_SECRET : string
    }
}>();

userRouter.post('/signup', async (c) => {
    // try to keep less global variables. declare prisma in every route function in serverless env bcoz they can be independently called.
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    try {
        const body = await c.req.json();
        const { success } = signupInput.safeParse(body);
        if(!success){
            c.status(411);
            return c.json({
                message : 'invalid inputs'
            });
        }
        const user = await prisma.user.create({
        data: {
            name : body.name,
            username : body.username,
            password: body.password
        }
        })
        const secretKey = c.env.JWT_SECRET;
        const token = await sign({ id: user.id }, secretKey);

        return c.json({
        token
        });
    } catch (err) {
      c.status(403);
      return c.json({
        message: 'invalid'
      });
    }
  
});
  
userRouter.post('/signin', async (c) => {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
  
    try {
        const body = await c.req.json();
        const { success } = signinInput.safeParse(body);
        if(!success){
            c.status(411);
            return c.json({
                message : 'invalid inputs'
            });
        }

        const user = await prisma.user.findUnique({
        where: {
            username : body.username,
            password : body.password
        }
        });

        if (!user) {
        c.status(411);
        return c.json({
            message: 'invalid credentials'
        });
        }

        const token = await sign({ id: user.id }, c.env.JWT_SECRET);
        return c.json({
        token
        });
    } catch (err) {
        c.status(403);
        return c.json({
        message: 'invalid credentials'
        });
    }
});
