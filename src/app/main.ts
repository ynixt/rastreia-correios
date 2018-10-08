import * as Dotenv from 'dotenv';
import RastreioService from './service/rastreioService';

Dotenv.config();

const Telegraf = require('telegraf')
const bot = new Telegraf(process.env.BOT_TOKEN);

bot.start((ctx) => ctx.replyWithHTML(
  `Olá! Bem vindo ao ${process.env.NOME_BOT}
Para verificar os comandos disponíveis digite <b>/help</b>.
`
))
bot.help((ctx) => ctx.replyWithHTML(
  `<b>/rastreio</b> <i>CODIGO_RASTREIO</i>: Informa onde a encomenda encontra-se no momento
`
))
bot.hears(/(\/rastreio) (\w*)/i, (ctx) => {
  if (ctx.match.length == 3) {
    RastreioService.obterUltimoEvento(ctx.match[2]).then(evento => {
      if (evento == null) {
        ctx.reply("Encomenda não encontrada.")
      } else {
        ctx.replyWithHTML(`${evento.status}
${evento.local}, ${evento.hora} - ${evento.data}
        `);
      }
    });
  } else {
    ctx.reply('Código de rastreio inválido.');
  }
});

bot.hears(/.*/i, (ctx) => ctx.replyWithHTML('Infelizmente não entendi. Digite <b>/help</b> para listar os comandos disponíveis.'))

bot.startPolling();