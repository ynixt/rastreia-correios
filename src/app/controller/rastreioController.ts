
import { JsonController, Post, Req, Res, Body } from 'routing-controllers';
import RastreioService from '../service/rastreioService';

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

    return agent.handleRequest(intentMap);
  }

  async rastrear(agent) {

    if (agent.parameters.Codigo_Pacote == null || agent.parameters.Codigo_Pacote.trim() === '') {
      agent.add(`Encomenda não encontrada.`);
      return;
    }

    const codigoPacote = agent.parameters.Codigo_Pacote.replace(/[ \-]/g, "");
    const evento = await RastreioService.obterUltimoEvento(codigoPacote);

    if (evento == null) {
      agent.add(`Encomenda não encontrada.`);
    } else {
      agent.add(`${evento.status}` + '\n' +
        `${evento.local}, ${evento.hora} - ${evento.data}`
      );
    }
  }
}