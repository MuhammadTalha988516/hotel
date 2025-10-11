import { Room, Service, Facility, RestaurantItem, ContactInfo, HomeData } from '../models/index.js';
import { Room as roomsData, homeData, aboutData, restaurantData, facilitiesData, contactData } from '../data/data.js';

export class RoomController {
  static getAllRooms() {
    return roomsData.map(room => new Room(room.id, room.type, room.price, room.description, room.image));
  }

  static getRoomById(id) {
    const room = roomsData.find(room => room.id === id);
    return room ? new Room(room.id, room.type, room.price, room.description, room.image) : null;
  }

  static getRoomsByType(type) {
    return roomsData
      .filter(room => room.type === type)
      .map(room => new Room(room.id, room.type, room.price, room.description, room.image));
  }

  static searchRooms(searchTerm) {
    return roomsData
      .filter(room =>
        room.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
        room.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .map(room => new Room(room.id, room.type, room.price, room.description, room.image));
  }

  static filterRoomsByPrice(maxPrice) {
    return roomsData
      .filter(room => room.price <= maxPrice)
      .map(room => new Room(room.id, room.type, room.price, room.description, room.image));
  }
}

export class HomeController {
  static getHomeData() {
    return new HomeData(homeData.banner, homeData.services.map(service =>
      new Service(service.id, service.title, service.description, service.icon)
    ));
  }
}

export class AboutController {
  static getAboutData() {
    return aboutData;
  }
}

export class RestaurantController {
  static getRestaurantData() {
    return {
      ...restaurantData,
      menu: restaurantData.menu.map(item => new RestaurantItem(item.id, item.name, item.price))
    };
  }
}

export class FacilitiesController {
  static getFacilitiesData() {
    return {
      ...facilitiesData,
      facilities: facilitiesData.facilities.map(facility =>
        new Facility(facility.id, facility.name, facility.description, facility.image)
      )
    };
  }
}

export class ContactController {
  static getContactData() {
    return new ContactInfo(contactData.title, contactData.address, contactData.phone, contactData.email);
  }
}
