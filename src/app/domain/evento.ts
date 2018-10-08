export default class Evento {
  constructor(
    private _data: string,
    private _hora: string,
    private _local: string,
    private _status: string,
  ) { }


  get status(): string {
    return this._status;
  }
  get data(): string {
    return this._data;
  }
  get hora(): string {
    return this._hora;
  }
  get local(): string {
    return this._local;
  }
}