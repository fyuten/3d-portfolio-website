// Builds the Work cards, the Gallery and the lightbox from the data in data.js

// Hangs the project title and description on a media item for the lightbox caption
function withProject(item, project) {
	return { ...item, projectTitle: project.title, projectDescription: project.description };
}

// All media in one list so the lightbox can page through everything
const GALLERY = PROJECTS.flatMap(project =>
	project.media.map(item => withProject(item, project))
);

let activeFilter = "all";
let lightboxList = [];
let lightboxIndex = 0;

// Reveal cards as they scroll into view
const revealObserver = new IntersectionObserver((entries, obs) => {
	entries.forEach(entry => {
		if (entry.isIntersecting) {
			entry.target.classList.add("in");
			obs.unobserve(entry.target);
		}
	});
}, { threshold: 0.15 });

// Builds the filter buttons from the category list
function buildFilters() {
	const container = document.getElementById("filters");
	const filters = [{ id: "all", label: "All" }, ...CATEGORIES];

	filters.forEach(filter => {
		const button = document.createElement("button");
		button.className = "filter";
		button.textContent = filter.label;
		button.dataset.filter = filter.id;
		button.setAttribute("role", "tab");
		if (filter.id === activeFilter) {
			button.classList.add("active");
		}
		button.addEventListener("click", () => {
			activeFilter = filter.id;
			document.querySelectorAll(".filter").forEach(b => b.classList.remove("active"));
			button.classList.add("active");
			renderWork();
		});
		container.appendChild(button);
	});
}

// Builds one project card
function makeCard(project) {
	const card = document.createElement("article");
	card.className = "card";
	card.tabIndex = 0;
	card.setAttribute("role", "button");
	card.setAttribute("aria-label", project.title);

	const cover = document.createElement("img");
	cover.src = project.cover;
	cover.alt = project.title;
	cover.loading = "lazy";

	const tag = document.createElement("span");
	tag.className = "card-tag";
	tag.style.setProperty("--tag", categoryColor(project.category));

	const media = document.createElement("div");
	media.className = "card-media";
	media.append(cover, tag);

	const title = document.createElement("h3");
	title.textContent = project.title;

	const year = document.createElement("p");
	year.className = "card-meta";
	year.textContent = project.year;

	const body = document.createElement("div");
	body.className = "card-body";
	body.append(title, year);

	if (project.tools.length) {
		const tools = document.createElement("div");
		tools.className = "card-tools";

		project.tools.forEach(name => {
			const tool = document.createElement("span");
			tool.textContent = name;
			tools.append(tool);
		});

		body.append(tools);
	}

	card.append(media, body);

	const open = () => openLightbox(project.media.map(m => withProject(m, project)), 0);
	card.addEventListener("click", open);
	card.addEventListener("keydown", event => {
		if (event.key === "Enter" || event.key === " ") {
			event.preventDefault();
			open();
		}
	});
	return card;
}

// Draws the cards that match the active filter
function renderWork() {
	const grid = document.getElementById("work-grid");
	const empty = document.getElementById("work-empty");
	grid.replaceChildren();

	const shown = PROJECTS.filter(p => activeFilter === "all" || p.category === activeFilter);
	empty.hidden = shown.length > 0;

	shown.forEach(project => {
		const card = makeCard(project);
		grid.appendChild(card);
		revealObserver.observe(card);
	});
}

// Draws every media item in the gallery grid
function renderGallery() {
	const grid = document.getElementById("gallery-grid");

	GALLERY.forEach((item, index) => {
		const figure = document.createElement("figure");
		figure.className = "gallery-item";
		figure.tabIndex = 0;
		figure.setAttribute("role", "button");
		figure.setAttribute("aria-label", item.projectTitle);

		if (item.type === "video") {
			const video = document.createElement("video");
			video.src = item.src;
			video.muted = true;
			video.preload = "metadata";

			const play = document.createElement("span");
			play.className = "play";

			figure.append(video, play);
		} else {
			const image = document.createElement("img");
			image.src = item.src;
			image.alt = item.alt || item.projectTitle;
			image.loading = "lazy";

			figure.append(image);
		}

		const open = () => openLightbox(GALLERY, index);
		figure.addEventListener("click", open);
		figure.addEventListener("keydown", event => {
			if (event.key === "Enter" || event.key === " ") {
				event.preventDefault();
				open();
			}
		});

		grid.appendChild(figure);
		revealObserver.observe(figure);
	});
}

// Opens the lightbox on a given list and position
function openLightbox(list, index) {
	lightboxList = list;
	lightboxIndex = index;
	document.getElementById("lightbox").hidden = false;
	document.body.classList.add("no-scroll");
	showLightboxItem();
}

// Shows the current item and updates the caption
function showLightboxItem() {
	const item = lightboxList[lightboxIndex];
	const stage = document.getElementById("lb-stage");

	stage.replaceChildren();

	if (item.type === "video") {
		const video = document.createElement("video");
		video.src = item.src;
		video.controls = true;
		video.autoplay = true;

		stage.append(video);
	} else {
		const image = document.createElement("img");
		image.src = item.src;
		image.alt = item.alt || item.projectTitle;

		stage.append(image);
	}

	const position = `${lightboxIndex + 1} / ${lightboxList.length}`;
	document.getElementById("lb-title").textContent = `${item.projectTitle} — ${position}`;
	document.getElementById("lb-desc").textContent = item.projectDescription;

	const single = lightboxList.length < 2;
	document.getElementById("lb-prev").hidden = single;
	document.getElementById("lb-next").hidden = single;
}

// Closes the lightbox and empties the stage
function closeLightbox() {
	document.getElementById("lightbox").hidden = true;
	document.getElementById("lb-stage").replaceChildren();
	document.body.classList.remove("no-scroll");
}

// Moves one step in the list and wraps around at both ends
function step(delta) {
	lightboxIndex = (lightboxIndex + delta + lightboxList.length) % lightboxList.length;
	showLightboxItem();
}

// Connects the lightbox buttons and the keyboard
function setupLightbox() {
	document.getElementById("lb-close").addEventListener("click", closeLightbox);
	document.getElementById("lb-prev").addEventListener("click", () => step(-1));
	document.getElementById("lb-next").addEventListener("click", () => step(1));

	document.getElementById("lightbox").addEventListener("click", event => {
		if (event.target.id === "lightbox") {
			closeLightbox();
		}
	});

	document.addEventListener("keydown", event => {
		if (document.getElementById("lightbox").hidden) {
			return;
		}
		if (event.key === "Escape") closeLightbox();
		if (event.key === "ArrowLeft") step(-1);
		if (event.key === "ArrowRight") step(1);
	});
}

// Highlights the nav link for whichever section is in view
function setupNavHighlight() {
	const links = document.querySelectorAll(".site-nav a");
	const observer = new IntersectionObserver(entries => {
		entries.forEach(entry => {
			if (entry.isIntersecting) {
				links.forEach(link => {
					link.classList.toggle("active", link.getAttribute("href") === "#" + entry.target.id);
				});
			}
		});
	}, { rootMargin: "-45% 0px -45% 0px" });

	document.querySelectorAll("main .section").forEach(section => observer.observe(section));
}

buildFilters();
renderWork();
renderGallery();
setupLightbox();
setupNavHighlight();
