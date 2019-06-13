import BaseComponent from '../../prototype/baseComponent';

class Admin extends BaseComponent {
  constructor() {
    super();
    this.name = 'name';
    console.log(this.id);
  }
  
  async login(req, res, next) {
    console.log(this);
    res.send('login');
  }
}

export default new Admin();
