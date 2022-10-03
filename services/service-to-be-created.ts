import { Context, Service, ServiceBroker } from "moleculer";

export interface ServiceParams {
    name: string;
    id: number;
}

export default class ToBeCreatedService extends Service {
    private readonly hugeArray = new Array(10000000).fill(3500);
    public constructor(broker: ServiceBroker, name: string, id: number) {
        super(broker);
        this.parseServiceSchema({
            name: `${name}-${id}`,
            events: {
                "say.hello": (ctx: Context) => {
                    this.logger.info(`Hello from ${name}`);
                },
                "say.array": (ctx: Context) => {
                    this.logger.info(`Array from ${name}: ${this.hugeArray.length}`);
                },
            },
        });
    }
}
