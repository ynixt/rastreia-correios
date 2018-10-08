import Evento from "./evento";

export default class Pacote {

  constructor(
    private _numero: string,
    private _erro?: string,
    private _eventos?: Array<Evento>
  ) {
    if (!this._eventos) {
      this._eventos = [];
    }
  }

  get numero(): string {
    return this._numero;
  }

  get erro(): string {
    return this._erro;
  }
  set erro(erro: string) {
    this._erro = erro;
  }
  get eventos(): Array<Evento> {
    return this._eventos;
  }
  set eventos(evento: Array<Evento>) {
    this._eventos = evento;
  }

}