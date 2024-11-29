import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { verify } from 'hono/jwt';
import { createBlogInput, updateBlogInput } from "@darkxprime/medium-common";

export const blogRouter = new Hono<{
    Bindings : {
        DATABASE_URL : string;
        JWT_SECRET : string;
    },
    Variables : {
        userId : string;
    }
}>();

// middleware
blogRouter.use('/*', async (c, next) => {
    //extract the userId
    // pass it down to route handler

    try {
        // const authToken = await c.req.header("authorization") as string; OR
        const authToken = await c.req.header("authorization") || "";
        if(!authToken && !authToken.startsWith('Bearer')){
            c.status(403); 
            return c.json({
                message : 'missing / invalid token'
            })
        }
        
        const token = authToken.split(' ')[1];
        const payload = await verify(token, c.env.JWT_SECRET);
        if(!payload){
            c.status(403);
            return c.json({
                message : 'unauthorized'
            });
        }
        c.set('userId', payload.id as string);
        await next();
    } catch (err) {
        c.status(403);
        return c.json({
            message : 'missing / invalid token'
        });
    }
})

blogRouter.post('/', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    try {
        const body = await c.req.json();
        const { success } = createBlogInput.safeParse(body);
        if(!success){
            c.status(411);
            return c.json({
                message : 'invalid inputs'
            });
        }


        const userId = c.get('userId');  // get from middleware
        const response = await prisma.blog.create({
            data : {
                title : body.title,
                content : body.content,
                authorId : userId
            }
        });

        return c.json({
            id : response.id,
            message : "blog added successfully"
        });
    } catch (err) {
        c.status(411);
        return c.json({
            message : 'unauthorized / some issue'
        });
    }
});

// /bulk kept above /:id so that route won't catch "bulk" string as id
// add pagination later(ex : send first 10 blogs then scroll --> then again 10 blogs)
blogRouter.get('/bulk', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl : c.env.DATABASE_URL
    }).$extends(withAccelerate());

    try {
        //under the hood this is subquery 
        const blogs =  await prisma.blog.findMany({
            select : {
                id : true,
                title : true,
                content : true,
                author : {
                    select : {
                        name : true
                    }
                }
            }
        });
        return c.json({
            blogs
        })
    } catch (err) {
        c.status(411);
        return c.json({
            message : 'could not fetch blogs'
        });
    }
});

blogRouter.get('/:id', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    try {
        const blogId = c.req.param('id');
        const blog = await prisma.blog.findFirst({
            where : {id : blogId},
            select : {
                id : true,
                title : true,
                content : true,
                author : {
                    select : {
                        name : true
                    }
                }
            }
        });

        return c.json({
            blog
        });
    } catch (err) {
        c.status(411);
        return c.json({
            message : "could not fetch blog"
        });
    }
})

blogRouter.put('/', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    try {
        const body = await c.req.json();
        const { success } = updateBlogInput.safeParse(body);
        if(!success){
            c.status(411);
            return c.json({
                message : 'invalid inputs'
            })
        }
        await prisma.blog.update({
            where : { id : body.id},
            data : {
                title : body.title,
                content : body.content
            }
        });
        return c.json({
            message : "blog updated successfully"
        })
    } catch (err) {
        c.status(411);
        return c.json({
            message : 'could not update blog'
        });
    }
}); 


