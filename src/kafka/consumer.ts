import { Kafka, Consumer } from 'kafkajs';


export class ConsumerClass {
	private consumer: Consumer

	constructor(kafkaConfig: Kafka) {
		this.consumer = kafkaConfig.consumer({
			groupId: 'app-group'
		});
	}

	async connection() {
		this.consumer.connect()
	}

	async receiver() {
		await this.consumer.connect();
		await this.consumer.subscribe({ topic: 'app', fromBeginning: true });

		await this.consumer.run({
			eachMessage: async ({ topic, partition, message }) => {
				console.log('Received: ', {
					partition,
					offset: message.offset,
					value: message.value?.toString(),
				});
			},
		});
	}
}