let url = 'http://localhost:3000/posts';

let div = document.querySelector('.posts');
let getButton = document.querySelector('.getButton');
let setButton = document.querySelector('.setButton');

function showUsers(data) {
	const author = document.createElement("h3");
	const title = document.createElement("p");
	author.innerHTML = data.author || 'No author';
	title.innerHTML = data.title || 'No content';
	div.appendChild(author);
	div.appendChild(title);
}

function drawUsers(response) {
	response.forEach((item) => {
		showUsers(item)
	})
}

getButton.onclick = () => {
	fetch(url)
		.then(response => response.json())
		.then(response => drawUsers(response))
}

setButton.onclick = () => {

	let author = document.querySelector('.author');
	let title = document.querySelector('.title');

	fetch(url, {
		method: 'POST',
		headers: {
			'Content-type': 'application/json;charset=utf-8',
		},
		body: JSON.stringify({
			author: author.value,
			title: title.value,
		})
	})
		.then(response => response.json())
		.then(response => showUsers(response))

	author.value = '';
	title.value = '';

}