const Koa = require('koa');
const koaBody = require('koa-body');

const DataBase = require('./DB');

const app = new Koa();
const dataBase = new DataBase();

app.use(koaBody());

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
      return;
    default:
      ctx.response.status = 404;
  }
});

app.listen(8080);
