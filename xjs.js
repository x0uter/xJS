function x(selector) {
	var self = {};

	self.selector = selector;
	self.element = whichSelector(selector);


	/*
	|--------------------------------------------------------------------------
	| VISUALS 
	|--------------------------------------------------------------------------
	*/
	self.css = (p1, p2) => {
		if (!p1 && !p2) return;

		if (p2 === undefined) {
			multiCSS(p1, self);
		} else {
			singleCSS(p1, p2, self);
		}
		return self;
	}

	/*
	|--------------------------------------------------------------------------
	| DOM 
	|--------------------------------------------------------------------------
	*/
	self.add = (payload) => {
		if (!payload) return;
		self.element.innerHTML = payload;
		return self;
	}

	self.attr = (attr, value) => {
		if(!attr && !value) return;
		self.element[attr] = value;
		return self;
	}

	/*
	|--------------------------------------------------------------------------
	| EVENTS 
	|--------------------------------------------------------------------------
	*/
	self.on = function (type, callback) {
		if (!type && !callback) return;
		self.element['on' + type] = callback;
		return self;
	}

    /*
    |--------------------------------------------------------------------------
    | MATH 
    |--------------------------------------------------------------------------
    */
	self.sum = function (elements) {
		if (!elements && elements.length > 0) return;
		let acc = 0;
		elements.forEach((elem) => acc += parseInt(whichSelector(elem).innerHTML));
		self.element.innerHTML += acc;
		return self;
	}

	self.mul = function (elements) {
		if (!elements && elements.length > 0) return;
		let acc = 1;
		elements.forEach((elem) => acc *= parseInt(whichSelector(elem).innerHTML));
		self.element.innerHTML += acc;
		return self;
	}

	self.sub = function (elements) {
		if (!elements && elements.length > 0) return;
		let acc = 0;
		elements.forEach((elem) => acc -= parseInt(whichSelector(elem).innerHTML));
		self.element.innerHTML += acc;
		return self;
	}

	/*
	|--------------------------------------------------------------------------
	| AJAX 
	|--------------------------------------------------------------------------
	*/
	self.jsonGet = function (path) {
		if (!path) return;
		return fetch(path, {
			method: 'GET',
			headers: { 'Content-Type': 'application/json' },
			credentials: 'same-origin'
		}).then((resp) => {
			if (resp.status != 200) throw new Error(resp.statusText)
			return resp.text()
		}).then((resp) => {
			if (selector) {
				self.element.innerHTML = resp;
			} else {
				return resp;
			}
		})
	}

	self.jsonPost = function (path, data) {
		if (!path && !data) return;
		return fetch(path, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(data),
			credentials: 'same-origin'
		}).then((resp) => {
			if (resp.status != 200) throw new Error(resp.statusText)
			return resp.text()
		}).then((resp) => {
			if (selector) {
				self.element.innerHTML = resp;
			} else {
				return resp;
			}
		})
	}

	self.jsonPut = function (path, data) {
		if (!path && !data) return;
		return fetch(path, {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(data),
			credentials: 'same-origin'
		}).then((resp) => {
			if (resp.status != 200) throw new Error(resp.statusText)
			return resp.text()
		}).then((resp) => {
			if (selector) {
				self.element.innerHTML = resp;
			} else {
				return resp;
			}
		})
	}

	self.jsonDelete = function (path, data) {
		if (!path && !data) return;
		return fetch(path, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(data),
			credentials: 'same-origin'
		}).then((resp) => {
			if (resp.status != 200) throw new Error(resp.statusText)
			return resp.text()
		}).then((resp) => {
			if (selector) {
				self.element.innerHTML = resp;
			} else {
				return resp;
			}
		})
	}

	return self;
}
/*
|--------------------------------------------------------------------------
| xJS FUNCTIONS 
|--------------------------------------------------------------------------
*/
function whichSelector(selector) {
	if (document.querySelector(selector)) {
		return document.querySelector(selector);
	} else if (document.querySelector(`#${selector}`)) {
		return document.querySelector(`#${selector}`);
	} else {
		document.querySelector(`.${selector}`);
	}
}
function singleCSS(name, value, self) {
	self.element.style[name] = value;
}
function multiCSS(obj, self) {
	for (var style in obj) {
		self.element.style[style] = obj[style];
	}
}