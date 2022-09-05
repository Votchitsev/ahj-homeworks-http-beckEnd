const fs = require('fs');
const Ticket = require('./Ticket');
const TicketFull = require('./TicketFull');

class DataBase {
  constructor() {
    this.DBUrl = './src/js/data.json';
  }

  getAllTickets() {
    return this.parse().ticket;
  }

  getTicketById(id) {
    return this.parse.ticketsFull.find((ticket) => ticket.id === Number(id));
  }

  postTicket(ticketData) {
    const data = JSON.parse(ticketData);
    const ticket = new Ticket(data.name, data.status);
    const ticketFull = new TicketFull(data.name, data.description, data.status);

    ticket.id = this.generateId();
    ticketFull.id = ticket.id;
    ticketFull.created = ticket.created;

    fs.readFile(this.DBUrl, 'utf-8', () => {
      const dataObject = this.parse();
      dataObject.tickets.push(ticket);
      dataObject.ticketsFull.push(ticketFull);

      fs.writeFile(this.DBUrl, JSON.stringify(dataObject), 'utf-8', () => {
        console.log(`ticket ${ticket.name} add to database`);
      });
    });
  }

  generateId() {
    const data = this.parse();
    const idList = [];

    data.tickets.forEach((element) => {
      idList.push(Number(element.id));
    });

    if (idList.length === 0) {
      return 1;
    }

    const maxIndex = Math.max.apply(null, idList);
    return maxIndex + 1;
  }

  parse() {
    const data = fs.readFileSync(this.DBUrl, 'utf-8');
    return JSON.parse(data);
  }
}

module.exports = DataBase;
