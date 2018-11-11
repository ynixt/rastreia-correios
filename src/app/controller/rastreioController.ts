
import { JsonController, Post, Req, Res, Body } from 'routing-controllers';
import RastreioService from '../service/rastreioService';
import Evento from '../domain/evento';

@JsonController()
export default class RastreioController {
  @Post('/rastreio-pacote-dialog-flow')
  post(@Body() body: any, @Req() request: any, @Res() response: any) {
    request.body = body;

    const { WebhookClient } = require('dialogflow-fulfillment');
    const agent = new WebhookClient({ request: request, response: response });

    const intentMap = new Map();

    intentMap.set('Rastrear pacote', () => {
      return this.rastrear(agent);
    });

    intentMap.set('O pacote já foi entregue?', () => {
      return this.verificarSeJafoiEntregue(agent);
    });

    return agent.handleRequest(intentMap);
  }

  private validarSeCodigoPacotePresente(agent): boolean {
    return agent.parameters.Codigo_Pacote != null && agent.parameters.Codigo_Pacote.trim() !== '';
  }

  private async obterUltimoEvento(agent): Promise<Evento> {
    const codigoPacote = agent.parameters.Codigo_Pacote.replace(/[ \-]/g, "");
    return await RastreioService.obterUltimoEvento(codigoPacote);
  }

  async rastrear(agent) {
    if (!this.validarSeCodigoPacotePresente(agent)) {
      agent.add(`Encomenda não encontrada.`);
      return;
    }

    const evento = await this.obterUltimoEvento(agent);

    if (evento == null) {
      agent.add(`Encomenda não encontrada.`);
    } else {
      agent.add(`${evento.status}` + '\n' +
        `${evento.local}, ${evento.hora} - ${evento.data}`
      );
    }
  }

  async verificarSeJafoiEntregue(agent) {
    if (!this.validarSeCodigoPacotePresente(agent)) {
      agent.add(`Encomenda não encontrada.`);
      return;
    }

    const evento = await this.obterUltimoEvento(agent);

    if (evento == null) {
      agent.add(`Encomenda não encontrada.`);
    } else {
      if (evento.status === 'Objeto entregue ao destinatário') {
        agent.add(`Ótima notícia! Seu produto foi entregue às ${evento.hora} - ${evento.data}.`);
      } else if (evento.status.indexOf('Objeto aguardando retirada')) {
        agent.add(`Mais ou menos... Identificamos o evento '${evento.status}' às ${evento.hora} - ${evento.data}.`);
      } else {
        agent.add('Ainda não :(.' + '\n' +
          `${evento.local}, ${evento.hora} - ${evento.data}`
        );
      }
    }
  }


}