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
			if (!e.classList.includes('close')) {
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

postData('https://shopapi-npzh.onrender.com/api/v1/typeProducts', {}).then((data) => {
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

if (window.location.pathname.includes('/projects') || window.location.pathname.includes('/')) {
	//console.log(window.location.pathname);
	postData('https://shopapi-npzh.onrender.com/api/v1/files/forproject', {}).then((data) => {
		console.log(data);
		data.forEach(async (element) => {
			const src = element.src;
			const name = element.name;

			const projectsImages = document.createElement('img');
			projectsImages.src = src;
			projectsImages.alt = name;

			if (window.location.pathname.includes('/projects')){
				document.getElementById('projects__images').appendChild(projectsImages);
			}
			else if (!window.location.pathname.includes('/oferta') && !window.location.pathname.includes('/contact')){				
				projectsImages.style.width = '40%'
				document.getElementById('projects__images__slider').appendChild(projectsImages);
			}

			// const liList = document.createElement('li');
			// liList.classList = 'nav__desktop-item';
		});
		/// slider.js

		$('.center').slick({
			centerMode: true,
			centerPadding: '60px',
			slidesToShow: 4,
			arrows: false,
			autoplay:true,
			autoplaySpeed:2000,
			responsive: [
				{
					breakpoint: 1400,
					settings: {
						centerMode: true,
						centerPadding: '40px',
						slidesToShow: 3,
					},
				},
				{
					breakpoint: 768,
					settings: {
						centerMode: true,
						centerPadding: '40px',
						slidesToShow: 1,
					},
				},
				{
					breakpoint: 575,
					settings: {
						centerMode: true,
						centerPadding: '30px',
						slidesToShow: 1,
						autoplay: true,
					},
				},
			],
		});

	});
}



if (window.location.pathname.includes('/oferta')) {
	let search = window.location.search;
	const url = search.substring(5);

	const sectionFurnitureTitle = document.createElement('h2');
	sectionFurnitureTitle.classList = 'section-title';

	postData(
		'https://shopapi-npzh.onrender.com/api/v1/products/typeproduct?url=' + url,{}
	).then((data) => {

		sectionFurnitureTitle.innerHTML = data.typeProduct.name;

		document
			.getElementById('wrapper-furniture')
			.appendChild(sectionFurnitureTitle);

		data.products.forEach(async (element) => {
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
			imgFurniture.src = mainFile.src;

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

			document.getElementById('wrapper-furniture').appendChild(furnitures);
		});
	});
}


if (window.location.pathname.includes('/produkt')) {
	let search = window.location.search;
	const url = search.substring(5);
	console.log(url)

	postData(
		'https://shopapi-npzh.onrender.com/api/v1/products/' + url,{}
	).then((data) => {

		const files=data.files;
		
		const srcProduct = data.product.mainFile.src;
		const nameProduct = data.product.name;


		document.querySelector('.furniture-title').innerText=nameProduct;

		const projectsImagesMain = document.createElement('img');
		projectsImagesMain.src = srcProduct;
		projectsImagesMain.alt = nameProduct;

		// style

		projectsImagesMain.style.width = '60%'		
		projectsImagesMain.style.display = 'block'	
		projectsImagesMain.style.marginLeft = 'auto'	
		projectsImagesMain.style.marginRight = 'auto'	

		document.getElementById('photo').appendChild(projectsImagesMain);
		
		files.forEach(async (element) => {
			const src = element.src;
			const name = element.name;

			const projectsImages = document.createElement('img');
			projectsImages.src = src;
			projectsImages.alt = name;

			projectsImages.style.width = '20%'
			projectsImages.style.margin = '1vw'

			document.getElementById('photo_rest').appendChild(projectsImages);

		});
		/// slider.js

		$('#photo_rest').slick({
			centerMode: true,
			centerPadding: '60px',
			slidesToShow: 3,
			arrows: false,
			autoplay:true,
			autoplaySpeed:2000,
			responsive: [
				{
					breakpoint: 1400,
					settings: {
						centerMode: true,
						centerPadding: '40px',
						slidesToShow: 3,
					},
				},
				{
					breakpoint: 768,
					settings: {
						centerMode: true,
						centerPadding: '40px',
						slidesToShow: 1,
					},
				},
				{
					breakpoint: 575,
					settings: {
						centerMode: true,
						centerPadding: '30px',
						slidesToShow: 1,
						autoplay: true,
					},
				},
			],
		});
		
	});
}


// FOOTER
const handleCurrentYear = () => {
	const year = new Date().getFullYear();
	footerYear.innerText = year;
};
handleCurrentYear();

hamburger.addEventListener('click', showMenu);
offerNav.addEventListener('click', showSubMenu);
