/** @type {import('./$types').PageServerLoad} */
export async function load(event) {
	console.log(event)

	return {
		homePost: 'exempel home post content'
	}
}
