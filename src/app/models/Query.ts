export class Query {
  select: string;
  expand: string;
  filter: string;
  paging: string;

  constructor(
    select?: string,
    expand?: string,
    filter?: string,
    paging?: string
  ) {
    this.select = select;
    this.expand = expand;
    this.filter = filter;
    this.paging = paging;
  }

  get params(): string {
    let query: string = "";

    if (this.select || this.expand || this.filter) query += "?";

    if (this.select) query += `$select=${this.select}&`;

    if (this.expand) query += `$expand=${this.expand}&`;

    if (this.filter) query += `$filter=${this.filter}&`;

    if (this.paging) query += `${this.paging}&`;

    return query;
  }
}
