const message= {
	shopper:{
		delivery_failed: 'Usuario ya tiene una solicitud de delivery pendiente creada',
		delivery_request_created:'Solicitud creada',
		admin_accepted:'Usuario fue aceptado su solicitud',
		admin_rejected:'Usuario fue rechazado su solicitud',
	},
	store:{
		delivery_failed: 'Esta tienda ya tiene una solicitud pendiente creada',
		delivery_request_created:'Solicitud creada',
		admin_accepted:'Tienda fue aceptado su solicitud',
		admin_rejected:'Tienda fue rechazado su solicitud',
	},
	general:{
		not_a_number:'No es un numero',
	}
}

module.exports = {
	message: message
}