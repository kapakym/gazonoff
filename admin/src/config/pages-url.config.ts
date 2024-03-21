class ADMIN_ROTES {
  private root = "/admin";

  HOME = this.root;
  STOCKS = `${this.root}/stocks`;
  CATEGORY = `${this.root}/category`;
  TIMER = `${this.root}/timer`;
  TIME_BLOCKING = `${this.root}/time-blocking`;
  SETTINGS = `${this.root}/settings`;
}

export const ADMIN_PAGES = new ADMIN_ROTES();
