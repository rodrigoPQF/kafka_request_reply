import { Kafka, Consumer } from 'kafkajs';


export class ConsumerClass {
	private consumer: Consumer

	constructor(kafkaConfig: Kafka) {
		this.consumer = kafkaConfig.consumer({
			groupId: 'app-group'
		});
	}

	async connection() {
		return this.consumer.connect()
	}

	async client(){
		return this.consumer
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

	async subscribe(topic: string){
		await this.consumer.subscribe({ topic, fromBeginning: true})
	}

}