import { Kafka } from 'kafkajs';
import { ProducerClass } from './kafka/producer';


async function main(){

	const kafka = new Kafka({
		clientId: 'app',
		brokers: ['localhost:9093'],
	});
	const kafkaprod = new ProducerClass(kafka)

	await kafkaprod.connection()
	await kafkaprod.send('Testando')

}
main()