export interface List {
  _id?: string;
  owner: string;
  name: string;
  description: string;
  image?: string;
  item?: Item[];
}

export interface ListWrapper {
  data: List[];
}

export interface ListPostWrapper {
  data: {
    id: string;
    attributes: List;
  };
}

export interface Item {
    name: string;
    price: Number;
    quantity: Number;
    responsible: string;
}
