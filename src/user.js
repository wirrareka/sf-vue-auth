class User {
  constructor(data) {
    this.data = data;
  }

  get id() {
    return this.data.id;
  }
  
  get name() {
    return `${this.data.firstName} ${this.data.lastName}`;
  }

  get firstName() {
    return this.data.firstName;
  }

  get lastName() {
    return this.data.lastName
  }

  get statusText() {
    return this.data.status_text;
  }    

  get email() {
    return this.data.email;
  }

  get thumbnail() {
    return ImageManager.hello(this);
  }
}
 
module.exports = User;