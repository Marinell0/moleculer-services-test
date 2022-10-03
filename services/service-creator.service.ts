import { Context, Service, ServiceBroker } from "moleculer";
import ToBeCreatedService from "./service-to-be-created";
const gc = require("expose-gc/function");

export interface ServiceParams {
    name: string;
    id: number;
}

export default class ServiceCreatorService extends Service {
    public constructor(broker: ServiceBroker) {
        super(broker);
        this.parseServiceSchema({
            name: "service-creator",
            actions: {
                createService: {
                    params: {
                        name: "string",
                        id: "number",
                    },
                    handler: this.createService,
                },
                deleteService: {
                    params: {
                        name: "string",
                        id: "number",
                    },
                    handler: async (ctx: Context<ServiceParams>) => {
                        const destroyed = await this.broker.destroyService(`${ctx.params.name}-${ctx.params.id}`);
                        broker.logger.info(`broker.registry.nodes.localNode.services.length: ${broker.registry.nodes.localNode.services.length}`);
                        broker.logger.info(`broker.services.length: ${broker.services.length}`);
                        gc();
                        return `Destroyed service ${ctx.params.name}-${ctx.params.id}: ${destroyed}`;
                    },
                }
            },
        });
    }

    public createService(ctx: Context<ServiceParams>) {
        this.broker.logger.info(`Creating service ${ctx.params.name}-${ctx.params.id}`);
        this.broker.createService(ToBeCreatedService.bind(null, this.broker, ctx.params.name, ctx.params.id));
        this.broker.logger.info(`broker.registry.nodes.localNode.services.length: ${this.broker.registry.nodes.localNode.services.length}`);
        return `Service of name ${ctx.params.name}-${ctx.params.id} created`;
    }
}
