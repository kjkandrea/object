class Invitation {
  private when?: Date;
}

class Ticket {
  private fee = 0;

  public getFee(): number {
    return this.fee;
  }
}

class Bag {
  private amount = 0;
  private invitation?: Invitation;
  private ticket?: Ticket;

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
