export class Room {
  constructor(id, type, price, description, image) {
    this.id = id;
    this.type = type;
    this.price = price;
    this.description = description;
    this.image = image;
  }
}

export class HomeData {
  constructor(banner, services) {
    this.banner = banner;
    this.services = services;
  }
}

export class Service {
  constructor(id, title, description, icon) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.icon = icon;
  }
}

export class Facility {
  constructor(id, name, description, image) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.image = image;
  }
}

export class RestaurantItem {
  constructor(id, name, price) {
    this.id = id;
    this.name = name;
    this.price = price;
  }
}

export class ContactInfo {
  constructor(title, address, phone, email) {
    this.title = title;
    this.address = address;
    this.phone = phone;
    this.email = email;
  }
}
