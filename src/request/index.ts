import { Kafka } from 'kafkajs';
import { ProducerClass } from '../kafka/producer';
import { ConsumerClass } from '../kafka/consumer';

export class ReqPlyKafka {
	// Mandar a mensagem e aguardar a resposta
	async response() {
		const kafka = new Kafka({
			clientId: 'app',
			brokers: ['localhost:9093'],
		});
		const producer = new ProducerClass(kafka)
		const consumer = new ConsumerClass(kafka)

		await producer.connection()
		const consumerInstance = await consumer.client()
		const producerInstance = await producer.client()

		await producerInstance.connect().then(async () => {
			await producerInstance.send({
				topic: 'request-topic',
				messages: [
					{ value: 'Como vai fulano ?', headers: { replyTo: 'request-topic' } }
				]
			})
		})
		const responsePromise = new Promise((resolve, reject) => {

			consumer.connection().then(() => {
				consumer.subscribe('reply-topic')
				consumerInstance.run({
					eachMessage: async ({ message }) => {
						const response = message.value?.toString();
						resolve(response);
						await consumerInstance.disconnect();
					}
				})
			},)


		})

		const response = await responsePromise
		await producerInstance.disconnect()

		return response
	}

	// Ouvir o canal e retornar uma mensagem
	async request() {

		const kafka = new Kafka({
			clientId: 'app',
			brokers: ['localhost:9093'],
		});
		const producer = new ProducerClass(kafka)
		const consumer = new ConsumerClass(kafka)

		const producerInstance = await producer.client()
		const consumerInstance = await consumer.client()

		await consumerInstance.connect().then(async () => {
			await consumerInstance.subscribe({ topic: 'request-topic' })
			await consumerInstance.run({
				eachMessage: async ({ topic, message }) => {
					console.log({
						topic,
						key: message.key?.toString(),
						value: message.value?.toString(),
						headers: message.headers,
					})

					producerInstance.connect().then(async () => {
						await producerInstance.send({
							topic: 'reply-topic',
							messages: [{ value: 'Vou bem' }]
						})
					})
				}
			})

		})
	}
}