export default class BaseComponent {
  constructor() {
    this.id = 'aweqwqeqweq';
    this.isId = this.isId.bind(this);
  }
  
  isId(req) {
    console.log('req.cookie');
  }
}
