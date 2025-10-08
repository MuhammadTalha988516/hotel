import {
  RoomController,
  HomeController,
  AboutController,
  RestaurantController,
  FacilitiesController,
  ContactController
} from '../controllers/index.js';

export class ApiService {
  // Room services
  static async getAllRooms() {
    try {
      return RoomController.getAllRooms();
    } catch (error) {
      console.error('Error fetching rooms:', error);
      throw new Error('Failed to fetch rooms');
    }
  }

  static async getRoomById(id) {
    try {
      return RoomController.getRoomById(id);
    } catch (error) {
      console.error('Error fetching room:', error);
      throw new Error('Failed to fetch room');
    }
  }

  static async getRoomsByType(type) {
    try {
      return RoomController.getRoomsByType(type);
    } catch (error) {
      console.error('Error fetching rooms by type:', error);
      throw new Error('Failed to fetch rooms by type');
    }
  }

  static async searchRooms(searchTerm) {
    try {
      return RoomController.searchRooms(searchTerm);
    } catch (error) {
      console.error('Error searching rooms:', error);
      throw new Error('Failed to search rooms');
    }
  }

  static async filterRoomsByPrice(maxPrice) {
    try {
      return RoomController.filterRoomsByPrice(maxPrice);
    } catch (error) {
      console.error('Error filtering rooms by price:', error);
      throw new Error('Failed to filter rooms');
    }
  }

  // Home services
  static async getHomeData() {
    try {
      return HomeController.getHomeData();
    } catch (error) {
      console.error('Error fetching home data:', error);
      throw new Error('Failed to fetch home data');
    }
  }

  // About services
  static async getAboutData() {
    try {
      return AboutController.getAboutData();
    } catch (error) {
      console.error('Error fetching about data:', error);
      throw new Error('Failed to fetch about data');
    }
  }

  // Restaurant services
  static async getRestaurantData() {
    try {
      return RestaurantController.getRestaurantData();
    } catch (error) {
      console.error('Error fetching restaurant data:', error);
      throw new Error('Failed to fetch restaurant data');
    }
  }

  // Facilities services
  static async getFacilitiesData() {
    try {
      return FacilitiesController.getFacilitiesData();
    } catch (error) {
      console.error('Error fetching facilities data:', error);
      throw new Error('Failed to fetch facilities data');
    }
  }

  // Contact services
  static async getContactData() {
    try {
      return ContactController.getContactData();
    } catch (error) {
      console.error('Error fetching contact data:', error);
      throw new Error('Failed to fetch contact data');
    }
  }
}
