import { Service, ServiceBroker } from "moleculer";
import { ServiceParams } from "./services/service-creator.service";

const broker = new ServiceBroker();

broker.start().then(() => {
  let id = 1;
  setInterval(() => {
    broker
      .call<Service, ServiceParams>("service-creator.createService", { name: "Service", id: id++ })
      .then((res) => {
        broker.logger.info(res.name);
        return res;
      })
      .then(async (res) => broker.destroyService(res))
      .then(() => {
        broker.logger.info(
          `broker.registry.nodes.localNode.services.length: ${broker.registry.nodes.localNode.services.length}`
        );
        broker.logger.info(`broker.services.length: ${broker.services.length}`);
      })
      .catch((err) => broker.logger.error(err.message));
  }, 1000);
});
