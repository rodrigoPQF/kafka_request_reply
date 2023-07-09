import { Kafka, Partitioners, Producer } from 'kafkajs';


export class ProducerClass {
	private producer: Producer

	constructor(kafkaConfig: Kafka) {
		this.producer = kafkaConfig.producer({
			createPartitioner: Partitioners.LegacyPartitioner
		});
	}

	async connection() {
		await this.producer.connect()
	}
	async client(){
		return this.producer
	}
	async send(message: string) {
		try {
			await this.producer.send({
				topic: 'app',
				messages: [{ value: message }],
			});
		} catch (e) {
			this.producer.disconnect()
		}
	}
}