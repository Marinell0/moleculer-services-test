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
                    handler: (ctx: Context<ServiceParams>) => {
                        const destroyed = this.broker.destroyService(`${ctx.params.name}-${ctx.params.id}`);
                        broker.logger.info(`broker.registry.nodes.localNode.services.length: ${broker.registry.nodes.localNode.services.length}`);
                        broker.logger.info(`broker.services.length: ${broker.services.length}`);
                        gc();
                        return destroyed;
                    },
                }
            },
        });
    }

    public createService(ctx: Context<ServiceParams>) {
        const newService = new ToBeCreatedService(this.broker, ctx.params.name, ctx.params.id);
        return this.broker.createService(newService);
    }
}
