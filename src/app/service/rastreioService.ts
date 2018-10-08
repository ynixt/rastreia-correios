import Pacote from '../domain/pacote';
import Evento from '../domain/evento';

const axios = require("axios");

export default class RastreioService {

  public static async obterEventos(codigoRastreio: string): Promise<Pacote> {
    const pacote = new Pacote(codigoRastreio);

    try {
      const eventos: Array<Evento> = (await axios.get(`http://track.linketrack.com/${codigoRastreio}/json`)).data as Array<Evento>;
      pacote.eventos = eventos;
    } catch (err) {
      pacote.erro = err;
    }

    return pacote;
  }

  //Exemplo de código de rastreio para testar PM147137772BR
  public static async obterUltimoEvento(codigoRastreio: string): Promise<Evento> {
    const eventos: Array<Evento> = (await this.obterEventos(codigoRastreio)).eventos;

    if (eventos.length > 0) {
      return eventos[0];
    }

    return null;
  }

}