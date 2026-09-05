// All projects and categories live here

// The cover field is the card image, media is what the lightbox pages through

const CATEGORIES = [
	{ id: "models", label: "Models", color: "#c9a0dc" },
	{ id: "animations", label: "Animations", color: "#7ee0c0" }
];

// Looks up the colour set for a category id
function categoryColor(id) {
	const found = CATEGORIES.find(c => c.id === id);
	return found ? found.color : "#888888";
}

const PROJECTS = [
	{
		id: "burning-house",
		title: "Burning House",
		category: "animations",
		year: 2024,
		tools: ["Blender", "Premiere Pro", "After Effects"],
		cover: "media/burning-house/still-1.jpg",
		media: [
			{ type: "image", src: "media/burning-house/still-1.jpg", alt: "Burning house behind bare branches" },
			{ type: "image", src: "media/burning-house/still-2.jpg", alt: "Embers over a snow-covered path" },
			{ type: "image", src: "media/burning-house/still-3.jpg", alt: "The village in fog under a full moon" },
			{ type: "image", src: "media/burning-house/still-4.jpg", alt: "Fire seen through the windows of the house" },
			{ type: "image", src: "media/burning-house/still-5.jpg", alt: "The village and its well from above" },
			{ type: "video", src: "media/burning-house/burning-house.mp4" }
		],
		description: "A burning house a foggy winter night. Made for a 3D moddeling course at DSV. The assets were made in Blender and then importet into Unreal Engine. Final video edited in Premiere Pro and After Effects."
	},
	{
		id: "spaceship",
		title: "Spaceship",
		category: "models",
		year: 2024,
		tools: ["Blender", "Substance Painter"],
		cover: "media/spaceship/spaceship.jpg",
		media: [
			{ type: "image", src: "media/spaceship/spaceship.jpg", alt: "Spaceship over frozen sea" }
		],
		description: "Ice skating ship?."
	},
	{
		id: "ball-animation",
		title: "Ball Animation",
		category: "animations",
		year: 2024,
		tools: ["Blender", "Maya", "Substance Painter", "Premiere Pro", "After Effects"],
		cover: "media/ball/render-5.jpg",
		media: [
			{ type: "image", src: "media/ball/render-5.jpg", alt: "Close-up of the ball on the anvil" },
			{ type: "image", src: "media/ball/render-4.jpg", alt: "The ball on the anvil" },
			{ type: "image", src: "media/ball/render-2.jpg", alt: "The forge and the tool wall" },
			{ type: "image", src: "media/ball/render-1.jpg", alt: "The workshop seen from the front" },
			{ type: "image", src: "media/ball/render-3.jpg", alt: "The workshop lit by the forge" },
			{ type: "video", src: "media/ball/ball-animation.mp4" }
		],
		description: "Made for a 3D rendering course at DSV where the goal was to create a animation of a ball going through an obstacle course. The assets were moddelde in Blender and then animated in Maya. Assets were then imported into Unreal Engine. All textures were made by me with substance Painter. Final video edited in Premiere Pro and After Effects."
	},
	{
		id: "tree",
		title: "Tree",
		category: "models",
		year: 2024,
		tools: ["Blender"],
		cover: "media/tree/tree.jpg",
		media: [
			{ type: "image", src: "media/tree/tree.jpg", alt: "Tree model" },
			{ type: "video", src: "media/tree/tree.mp4" }
		],
		description: "Animation of a growing tree made using geometry nodes in blender. Later also converted into fbx. "
	}
];
