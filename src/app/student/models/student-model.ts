export class StudentModel {
  private _id?: number
  private _lastName: string = ''
  private _firstName?: string = ''
  private _email: string = ''
  private _phoneNumber?: string = ''
  private _login: string = ''
  private _password: string = ''

  /**
   * @usage
   *  const student: StudentModel = new StudentModel()
   *  student.id = 10 // magic setter
   *  // console.log(student.id) // magic getter
   */
  get id() {
    return this._id === undefined ? 0 : this._id
  }

  set id(val: number) {
    this._id = val
  }

  get lastName() {
    return this._lastName
  }

  set lastName(val: string) {
    this._lastName = val
  }

  get firstName() {
    return this._firstName === undefined ? '' : this._firstName
  }

  set firstName(val: string) {
    this._firstName = val
  }

  get email() {
    return this._email
  }

  set email(val: string) {
    this._email = val
  }

  get phoneNumber() {
    return this._phoneNumber === undefined ? '' : this._phoneNumber
  }

  set phoneNumber(val: string) {
    this._phoneNumber = val
  }

  get login() {
    return this._login
  }

  set login(val: string) {
    this._login = val
  }

  get password() {
    return this._password
  }

  set password(val: string) {
    this._password = val
  }
}
