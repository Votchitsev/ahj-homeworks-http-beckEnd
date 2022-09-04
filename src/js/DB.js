const fs = require('fs');
const Ticket = require('./Ticket');

class DataBase {
  constructor() {
    this.DBUrl = './src/js/data.json';
  }

  getAllTickets() {
    return this.data.tickets;
  }

  getTicketById(id) {
    return this.data.ticketsFull.find((ticket) => ticket.id === Number(id));
  }

  postTicket(ticketData) {
    const ticket = new Ticket(ticketData.name, ticketData.status);
    ticket.id = this.generateId();

    fs.readFile(this.DBUrl, 'utf-8', () => {
      const dataObject = this.parse();
      dataObject.tickets.push(ticket);

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
