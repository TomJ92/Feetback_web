		//Mail funtion
		export default function sendMail(email, cc, subject, body) {
			var link = `mailto:${email}`
			+ `?cc=${cc}`
			+ `&subject=` + escape(subject)
			+ `&body=` + (body)
			;
			console.log(body);
			window.open(link);
		}