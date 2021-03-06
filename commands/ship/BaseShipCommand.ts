import {BaseCommand} from "../BaseCommand";
import {Message} from "discord.js";
import {Bot} from "../../Bot";
import {Config} from "../Config";
import {Global} from "../../utils/Global";
import {UnauthorizedAccessError} from "../../exceptions/UnauthorizedAccessError";

const allowedUsers = [];
const allowedRoles = [];
const allowedChannels = ["421655362966650880", "413390615158718466"];

export abstract class BaseShipCommand extends BaseCommand {

    protected constructor(bot: Bot, commandName: string, aliases = [], prefix = ['!'], timeout = 5000, maxLevel = 10) {
        let config = new Config(commandName, aliases, prefix, timeout, maxLevel);
        super(bot, config);
    }

    assertIsGranted(message: Message) {
        if (!this.isGranted(message, Global.allowedGuilds, allowedChannels, allowedRoles, allowedUsers)) {
            throw new UnauthorizedAccessError();
        }
    }

    async run(message: Message, args: string[]) {
        // TODO
    }

    async abstract runCommand(message: Message, args: string[]);
}