class Invitation {
  private when?: Date;
}

class Ticket {
  private fee = 0;

  public getFee(): number {
    return this.fee;
  }
}

// 관람객의 가방
class Bag {
  private amount: number;
  private readonly invitation?: Invitation;
  private ticket?: Ticket;

  // 현금만 있거나, 초대장과 현금이 있거나
  constructor(amount: number, invitation?: Invitation) {
    this.amount = amount;
    this.invitation = invitation;
  }

  public hasInvitation(): boolean {
    return this.invitation !== undefined;
  }

  public hasTicket(): boolean {
    return this.ticket !== undefined;
  }

  public setTicket(ticket: Ticket): void {
    this.ticket = ticket;
  }

  public minusAmount(amount: number): void {
    this.amount -= amount;
  }

  public plusAmount(amount: number): void {
    this.amount += amount;
  }
}

class Audience {
  private readonly bag: Bag;

  constructor(bag: Bag) {
    this.bag = bag;
  }

  public getBag(): Bag {
    return this.bag;
  }
}

// 매표소
class TicketOffice {
  private amount: number;
  private tickets: Ticket[] = [];

  constructor(amount: number, tickets: Ticket[]) {
    this.amount = amount;
    this.tickets = tickets;
  }

  // 배열 맨 앞의 티켓
  public getTicket(): Ticket | undefined {
    return this.tickets.pop();
  }

  public minusAmount(amount: number): void {
    this.amount -= amount;
  }

  public plusAmount(amount: number): void {
    this.amount += amount;
  }
}
