export class layerOptions {

	getList():any {
		return {
			'Power0_easeNone': 'No Ease',

			'Cubic_easeIn': 'Cubic In',
			'Cubic_easeOut': 'Cubic Out',
			'Cubic_easeInOut': 'Cubic In/Out',

			'SteppedEase_easeIn': 'Stepped In',
			'SteppedEase_easeOut': 'Stepped Out',
			'SteppedEase_easeInOut': 'Stepped In/Out',

			'Bounce_easeIn': 'Bounce In',
			'Bounce_easeOut': 'Bounce Out',
			'Bounce_easeInOut': 'Bounce In/Out',

			'Elastic_easeIn': 'Elastic In',
			'Elastic_easeOut': 'Elastic Out',
			'Elastic_easeInOut': 'Elastic In/Out',

			'Back_easeIn': 'Back In',
			'Back_easeOut': 'Back Out',
			'Back_easeInOut': 'Back In/Out'
		}
	}

	getEventsList():any {
		return {
			'next_screen': 'Next Screen',
			'give_cards': 'Give All Players Cards'
		};
	}
}