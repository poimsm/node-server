const status = {
	entry:{
		description:'Order entrante',
		wrong:'Acción no permitida. Se debe tomar la orden.',
		code: 0,
		action:'take',
		next: 'pending',
	},
	pending:{
		description:'Orden Pendiente',
		wrong:'Acción no permitida. Delivery debe comenzar con la entrega.',
		code: 1,
		action:'incourse',
		prev: 'entry',
		next: 'delivered',
	},
	delivered:{
		description:'Orden Entregada',
		wrong:'Acción no permitida. Delivery debe entregar la orden.',
		code: 2,
		action:'meetclient',
		prev: 'pending',
		next: 'received',
	},
	received:{
		description:'Orden Recibida',
		wrong:'Acción no permitida. Cliente debe recibir la orden.',
		code: 3,
		action:'takenbyclient',
		prev: 'delivered',
		next: 'completed',
	},
	completed:{
		description:'Orden Completada',
		wrong:'Acción no permitida. Cliente debe aceptar la orden.',
		code: 4,
		action:'acceptedbyclient',
		prev: 'received',
		next: '',
	},

}

module.exports = {
	status: status
}