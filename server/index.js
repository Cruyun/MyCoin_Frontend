const send = require("koa-send");
const Koa = require("koa");
const Router = require("koa-router");
const userAgent = require("koa-useragent");
const path = require("path");
const swig = require("swig");
const router = new Router();
const app = new Koa();

const templateRoot = path.join(__dirname, "../dist/template");

app.use(userAgent);

router.get("/:id/list", function(ctx, next) {
  let template = swig.compileFile(path.resolve(templateRoot, "list.html"));
  ctx.body = template({});
});

router.get("/:id/month", function(ctx, next) {
  let template = swig.compileFile(path.resolve(templateRoot, "month.html"));
  ctx.body = template({});
});

router.get("/:id/week", function(ctx, next) {
  let template = swig.compileFile(path.resolve(templateRoot, "week.html"));
  ctx.body = template({});
});

router.get("/card", function(ctx, next) {
  let template = swig.compileFile(path.resolve(templateRoot, "card.html"));
  ctx.body = template({});
});

router.get(/^\/static(?:\/|$)/, async ctx => {
  let filepath = ctx.path.replace(/static\//, "");
  await send(ctx, filepath, {
    root: path.join(__dirname, "../dist")
  });
});

app.use(router.routes()).use(router.allowedMethods());

app.listen(3000);
console.log("listening on port 3000");
