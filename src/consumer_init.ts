import { Kafka } from 'kafkajs';
import { ConsumerClass } from './kafka/consumer';


async function main(){

	const kafka = new Kafka({
		clientId: 'app',
		brokers: ['localhost:9093'],
	});
	const kafkaconsu = new ConsumerClass(kafka)

	await kafkaconsu.connection()
	await kafkaconsu.receiver()

}
main()