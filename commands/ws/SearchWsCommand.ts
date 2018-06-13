import {Message} from "discord.js";
import {Bot} from "../../Bot";
import {CommandError} from "../../exceptions/CommandError";
import { BaseCommand } from "../BaseCommand";
import { Config } from "../Config";
import { UnauthorizedAccessError } from "../../exceptions/UnauthorizedAccessError";
import { SearchWs } from "../../core/service/WsService";
import { Logger } from "../../utils/Logger";



const allowedUsers = [];
const allowedRoles = [];
const allowedChannels = ["421655362966650880", "413390615158718466"];
const allowedGuilds = [];

export class AddWsCommand extends BaseCommand {
    protected constructor(bot: Bot) {
        let config = new Config("searchws",['sews'], ['!'], 25000);
        super(bot,config );
    }

    assertIsGranted(message: Message) {
        if (!this.isGranted(message, allowedGuilds, allowedChannels, allowedRoles, allowedUsers)) {
            throw new UnauthorizedAccessError();
        }
    }

    async run(message: Message, args: string[]) {
        await SearchWs(this.bot.sql);

        message.channel.send(":white_check_mark: OK bonne chance").then((msg: Message) => {
            msg.delete(this.config.timeout).catch(reason => {
                Logger.error(reason);
            });
        });
    }

    assertSyntax(message: Message, args: string[]) {
        if (0 != args.length) {
            throw new CommandError(this.getHelpMsg());
        }
    }


    // Display usage of command
    getHelpMsg(): string {
        return "\n__Usage __:\n\n\t`!" + this.config.name + " `\t\t *Change le statut de la ws courante à En cours de recherche*" +
            "\n\n__Exemple__:\n\t```!" + this.config.name + " ```";
    }
}

module.exports = AddWsCommand;