const Koa = require('koa');
const koaBody = require('koa-body');

const DataBase = require('./DB');

const app = new Koa();
const dataBase = new DataBase();

app.use(koaBody());

app.use((ctx, next) => {
  if (ctx.request.method !== 'OPTIONS') {
    next();
    return;
  }

  ctx.response.set('Access-Control-Allow-Origin', '*');
  ctx.response.set('Access-Control-Allow-Headers', 'Access-Control-Allow-Origin, Content-Type');
  ctx.response.set('Access-Control-Allow-Methods', 'GET, POST, DELETE');
  ctx.response.status = 204;
});

app.use(async (ctx) => {
  ctx.response.set('Access-Control-Allow-Origin', '*');

  const { method } = ctx.request.query;

  switch (method) {
    case 'allTickets':
      ctx.response.body = dataBase.getAllTickets();
      return;
    case 'ticketById':
      ctx.response.body = dataBase.getTicketById(ctx.request.query.id);
      return;
    case 'createTicket':
      dataBase.postTicket(ctx.request.body);
      ctx.response.body = 'OK';
      return;
    case 'deleteTicket':
      dataBase.deleteTicket(ctx.request.query.id);
      ctx.response.body = 'OK';
      return;
    default:
      ctx.response.status = 404;
  }
});

app.listen(8080);
