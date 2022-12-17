class Invitation {
  private when: Date;

  constructor(when: Date) {
    this.when = when;
  }
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

  public hold(ticket: Ticket): number {
    if (this.hasInvitation()) {
      this.setTicket(ticket);
      return 0;
    } else {
      this.setTicket(ticket);
      this.minusAmount(ticket.getFee());
      return ticket.getFee();
    }
  }

  private hasInvitation(): boolean {
    return this.invitation !== undefined;
  }

  private setTicket(ticket: Ticket): void {
    this.ticket = ticket;
  }

  public minusAmount(amount: number): void {
    this.amount -= amount;
  }
}

class Audience {
  private readonly bag: Bag;

  constructor(bag: Bag) {
    this.bag = bag;
  }

  /**
   * @return 지불된 금액
   */
  public buy(ticket: Ticket): number {
    return this.bag.hold(ticket);
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

class TicketSeller {
  private readonly ticketOffice: TicketOffice;

  constructor(ticketOffice: TicketOffice) {
    this.ticketOffice = ticketOffice;
  }

  public sellTo(audience: Audience): void {
    const ticket = this.ticketOffice.getTicket();
    if (!ticket) throw new Error('매표소에 티켓이 없어요!');
    this.ticketOffice.plusAmount(audience.buy(ticket));
  }
}

export class Theater {
  private ticketSeller: TicketSeller;

  constructor(ticketSeller: TicketSeller) {
    this.ticketSeller = ticketSeller;
  }

  public enter(audience: Audience): void {
    this.ticketSeller.sellTo(audience);
  }
}
