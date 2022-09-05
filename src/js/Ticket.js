class Ticket {
  constructor(name, status) {
    this.id = null;
    this.name = name;
    this.status = status;
    this.created = Date.now();
  }
}

module.exports = Ticket;
