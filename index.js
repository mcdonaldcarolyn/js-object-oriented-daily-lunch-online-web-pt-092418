// global datastore
let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };

let neighborhoodId = 0
//neighborhood has many customers
class Neighborhood {
  constructor(name) {
    this.name = name;
    this.id = ++neighborhoodId;
    store.neighborhoods.push(this)
  }
  customers(){
    return store.customers.filter((customer) => customer.neighborhoodId === this.id)
  }
  deliveries() {
    return store.deliveries.filter((delivery) => delivery.neighborhoodId === this.id);
  }
  meals() {
    return this.deliveries().map(delivery => delivery.meal());
  }
}
//customer belong to a neighborhood
let customerId = 0
class Customer {
  constructor(name, neighborhoodId) {
    this.name = name;
    this.id = ++customerId;
    this.neighborhoodId = neighborhoodId;
    store.customers.push(this);
  }
  deliveries() {
    return store.deliveries.filter((delivery) => delivery.customerId === this.id);
  }
  meals() {
    return this.deliveries().map((delivery) => delivery.meal());
  }
  totalSpent() {
    return this.meals().reduce((total, meal) => { return total + meal.price; }, 0);
  }
}

let mealId = 0 
class Meal{
  constructor(title, price) {
    this.title = title;
    this.price = price;
    this.id = ++mealId;
    store.meals.push(this)
  }
  deliveries() {
    return store.deliveries.filter((delivery) => delivery.mealId === this.id)
  }
  customers() {
    return this.deliveries().map((delivery) => delivery.customer());
  }
  static byPrice() {
    let meals = [...store.meals]; meals.sort((meal1, meal2) => meal2.price - meal1.price);
    return meals;
    }
}
 // join table
let deliveryId = 0
class Delivery{
  constructor(mealId, neighborhoodId, customerId) {
    this.mealId = mealId;
    this.customerId = customerId;
    this.neighborhoodId = neighborhoodId;
    this.id = ++deliveryId;
    store.deliveries.push(this)
  }
  meal() {
    return store.meals.find((meal) => meal.id === this.mealId)
  }
  customer() {
    return store.customers.find((customer) => customer.id === this.customerId);
    }
   
  neighborhood() {
    return store.neighborhoods.find((neighborhood) => neighborhood.id === this.neighborhoodId)
  }
}
