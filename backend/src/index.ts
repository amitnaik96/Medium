import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { userRouter } from "./routes/user"
import { blogRouter } from "./routes/blog"
import { meRouter } from "./routes/me";

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  },
  Variables: {
    userId: string;
    loggedIn : boolean;
  }
}>();

app.use('/*', cors())
app.route('/api/v1/user', userRouter);
app.route('/api/v1/blog', blogRouter);
app.route('/api/v1/me', meRouter);



export default app

// deployed
// https://medium-blog-backend.amitnaikkwr.workers.dev