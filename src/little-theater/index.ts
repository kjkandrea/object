class Invitation {
  private when?: Date;
}

class Ticket {
  private fee?: number;

  public getFee() {
    return this.fee;
  }
}
