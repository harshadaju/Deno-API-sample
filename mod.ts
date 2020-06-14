import { Application } from "https://deno.land/x/oak/mod.ts";
import router from "./router.ts";
const app = new Application();
const port: number = 5000;
app.use(router.routes());
await app.listen({ port });
