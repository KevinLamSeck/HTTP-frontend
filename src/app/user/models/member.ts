interface Role {
    [key: string]: string;
}

export class Member {
    private _id?: number;
    private _email: string = '';
    private _lastName: string = '';
    private _firstName?: string = '';
    private _phoneNumber?: string = '';
    private _login: string = '';
    private _password: string = '';
    private _role: string = '';

    private _roles: Role = {
        MANAGER: 'Manager',
        STUDENT: 'Student',
        CONCEPTOR: 'Conceptor',
    }

    constructor(member: {
        id?: number,
        email?: string,
        lastName?: string,
        firstName?: string,
        phoneNumber?: string,
        login?: string,
        password?: string,
        role?: string
    }) {
        Object.assign(this, member);
    }

    isValidRole() {
        return this._role! in this._roles;
    }

    getRoleName() {
        return this._roles[this.role];
    }

    showRole(user: Member): string {
        return user.getRoleName();
    }

    public get id(): number | undefined {
        return this._id;
    }

    public set id(value: number | undefined) {
        this._id = value;
    }

    public get email(): string {
        return this._email;
    }

    public set email(value: string) {
        this._email = value;
    }

    public get lastName(): string {
        return this._lastName;
    }

    public set lastName(value: string) {
        this._lastName = value;
    }

    public get firstName(): string | undefined {
        return this._firstName;
    }

    public set firstName(value: string | undefined) {
        this._firstName = value;
    }

    public get phoneNumber(): string | undefined {
        return this._phoneNumber;
    }

    public set phoneNumber(value: string | undefined) {
        this._phoneNumber = value;
    }

    public get login(): string {
        return this._login;
    }

    public set login(value: string) {
        this._login = value;
    }

    public get password(): string {
        return this._password;
    }

    public set password(value: string) {
        this._password = value;
    }

    public get role(): string {
        return this._role;
    }

    public set role(value: string) {
        this._role = value;
    }

}
