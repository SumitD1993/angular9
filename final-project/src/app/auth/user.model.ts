export class User{
    constructor(
        public email:string,
        public id: string,
        private _token: string,
        private _tokenExpiresIn: Date
    ){}

    public get token() : string {
        if(!this._token && !(new Date() > this._tokenExpiresIn)){
            return null;
        }
        return this._token;
    }
}
