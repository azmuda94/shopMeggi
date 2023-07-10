const hamburger = document.querySelector('.hamburger');
const navMobile = document.querySelector('.nav__mobile');
const allNavItems = document.querySelectorAll('.nav__mobile-item');

const offerNav = document.querySelector('#offer-nav');
const subMenu = document.querySelector('.nav__sub');

const footerYear = document.querySelector('.footer__year');

// NAV
const showMenu = () => {
	navMobile.classList.toggle('active');
	hamburger.classList.toggle('is-open');

	allNavItems.forEach((item) => {
		item.addEventListener('click', (e) => {
			if (!e.classList.contains('close')) {
				navMobile.classList.remove('active');
				hamburger.classList.remove('is-open');
			}
		});
	});
};

// SUB MENU
const showSubMenu = () => {
	subMenu.classList.toggle('active');
};

async function postData(url = '', data = {}) {
	// Default options are marked with *
	const response = await fetch(url, {
		method: 'GET',
		mode: 'cors',
		cache: 'no-cache',
		credentials: 'same-origin',
		headers: {
			'Content-Type': 'application/json',
		},
		redirect: 'follow',
		referrerPolicy: 'no-referrer',
	});
	return response.json();
}

////// routing

/*let location = window.location
console.log(location);*/

postData('https://shopapi-npzh.onrender.com/api/v1/typeProducts', {
	answer: 42,
}).then((data) => {
	data.forEach(async (element) => {
		const _id = element._id;
		const name = element.name;
		const description = element.description;
		const url = element.url;
		const isActive = element.isActive;
		const parent = element.parent;
		// console.log(name);

		// const liList = document.createElement('li');
		// liList.classList = 'nav__desktop-item';
		if (parent && isActive) {
			const aList = document.createElement('a');
			aList.innerHTML = name;
			aList.href = 'oferta.html?url=' + url;
			aList.classList = 'nav__sub-item';

			const aListM = document.createElement('a');
			aListM.innerHTML = name;
			aListM.href = 'oferta.html?url=' + url;
			aListM.classList = 'nav__sub-item';

			// liList.appendChild(aList);
			document.getElementById('nav__sub').appendChild(aListM);
			document.getElementById('nav__sub__dsp').appendChild(aList);
		}
	});
	let search = window.location.search;

	search = search.substring(6);
	return search;
});

if (window.location.pathname == '/projects.html') {
	postData('https://shopapi-npzh.onrender.com/api/v1/files/forproject', {
		answer: 42,
	}).then((data) => {
		data.forEach(async (element) => {
			const src = element.src;
			const name = element.name;

			const projectsImages = document.createElement('img');
			projectsImages.src = src;
			projectsImages.alt = name;

			console.log(projectsImages);
			document.getElementById('projects__images').appendChild(projectsImages);

			// const liList = document.createElement('li');
			// liList.classList = 'nav__desktop-item';
		});
	});
}

if (window.location.pathname == '/oferta.html') {
	let search = window.location.search;
	const url = search.substring(5);

	const sectionFurnitureTitle = document.createElement('h2');
	sectionFurnitureTitle.classList = 'section-title';
	sectionFurnitureTitle.innerHTML = url;


	document
		.getElementById('wrapper-furniture')
		.appendChild(sectionFurnitureTitle);

	postData(
		'https://shopapi-npzh.onrender.com/api/v1/products/typeproduct?url=' + url,
		{
			answer: 42,
		}
	).then((data) => {

		
		data.forEach(async (element) => {
			const mainFile = element.mainFile;
			const name = element.name;
			const id = element.id;

			const furnitures = document.createElement('div');
			furnitures.classList = 'furnitures';

			
			const aFurniture = document.createElement('a');
			aFurniture.href = 'produkt.html?url=' + id;
			aFurniture.id = id;


			const furnitureItem = document.createElement('div');
			furnitureItem.classList = 'furnitures__item';

			const furnituresItemPhoto = document.createElement('div');
			furnituresItemPhoto.classList = 'furnitures__item-photo';

			const imgFurniture = document.createElement('img');
			imgFurniture.src = mainFile;

			const furnituresItemInfo = document.createElement('div');
			furnituresItemInfo.classList = 'furnitures__item-info';			
			
			
			const furnitureTitle = document.createElement('h4');
			furnitureTitle.classList='furniture-title';
			furnitureTitle.innerHTML=name;

			furnituresItemInfo.appendChild(furnitureTitle);
			furnituresItemPhoto.appendChild(imgFurniture);

			furnitureItem.appendChild(furnituresItemPhoto);
			furnitureItem.appendChild(furnituresItemInfo);			
			
			aFurniture.appendChild(furnitureItem);

			furnitures.appendChild(aFurniture);

			console.log(furnitures);

			document.getElementById('wrapper-furniture').appendChild(furnitures);
		});
	});
}
// .then((data) => {
// 	const containerFurniture = document.createElement('div')
// 	containerFurniture.classList('container-furniture')

// 	const photoFurniture = document.createElement('div')
// 	photoFurniture.classList('photo')

// 	const mainPhotoFurniture = document.createElement('img')
// 	mainPhotoFurniture.src =

// 	const descriptionFurniture = document.createElement('div')
// 	descriptionFurniture.classList('description-furniture')

// 	const h2Furniture = document.createElement('h2')
// 	h2Furniture.classList('furniture-title')
// 	h2Furniture.innerHTML =

// 	const ulListFurniture = document.createElement('ul')

// 	const liItemFurniture = document.createElement('li')

// 	document.getElementById('wrapper-furniture').appendChild(containerFurniture);
// 	containerFurniture.appendChild(photoFurniture);
// 	photoFurniture.appendChild(mainPhotoFurniture)

// })
// 	.then((data) => {
// 		postData('https://shopapi-npzh.onrender.com/api/v1/products', {
// 			answer: 42,
// 		}).then((data) => {
// 			console.log(data);
// 		});
// 	});

// FOOTER
const handleCurrentYear = () => {
	const year = new Date().getFullYear();
	footerYear.innerText = year;
};
handleCurrentYear();

hamburger.addEventListener('click', showMenu);
offerNav.addEventListener('click', showSubMenu);
