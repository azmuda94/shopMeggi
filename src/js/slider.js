$('.center').slick({
	centerMode: true,
	centerPadding: '60px',
	slidesToShow: 3,
	arrows: false,
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
