const status = {
	ok:{
		description:'OK',
		code: 200,
	},
	unauthorized:{
		description:'Unauthorized',
		code: 401,
	},
	bad_request:{
		description:'Bad Request',
		code: 400,
	},
	not_found:{
		description:'Not Found',
		code: 404,
	},
	server_error:{
		description:'Internal error',
		code: 500,
	}

}

module.exports = {
	status: status
}