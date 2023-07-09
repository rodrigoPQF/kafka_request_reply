import { ReqPlyKafka } from './request';



async function main(){

	const reqply = new ReqPlyKafka()

	await reqply.request()
	const reply = await reqply.response()

	console.log(reply);
  

}
main()