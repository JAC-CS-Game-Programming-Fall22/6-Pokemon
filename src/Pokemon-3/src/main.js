/**
 * Pokémon-3
 * The "Monster" Update
 *
 * Original Lua by: Colton Ogden (cogden@cs50.harvard.edu)
 * Adapted to JS by: Vikram Singh (vikram.singh@johnabbott.qc.ca)
 *
 * Few franchises have achieved the degree of fame as Pokémon, short for "Pocket Monsters",
 * a Japanese monster-catching phenomenon that took the world by storm in the late 90s. Even
 * to this day, Pokémon is hugely successful, with games, movies, and various other forms of
 * merchandise selling like crazy. The game formula itself is an addicting take on the JRPG,
 * where the player can not only fight random Pokémon in the wild but also recruit them to
 * be in their party at all times, where they can level up, learn new abilities, and even evolve.
 *
 * This proof of concept demonstrates basic GUI usage, random encounters, and Pokémon that the
 * player can fight and defeat with their own Pokémon.
 *
 * All Assets
 * @see https://reliccastle.com/essentials/
 */

import Game from "../lib/Game.js";
import PlayState from "./states/game/PlayState.js";
import {
	canvas,
	context,
	fonts,
	images,
	keys,
	pokemonFactory,
	stateStack,
	timer,
} from "./globals.js";

let imageDefinitions, fontDefinitions, mapDefinition, pokemonDefinitions;

const assets = fetch('./config/assets.json')
	.then((response) => response.json())
	.then((response) => {
		imageDefinitions = response.images;
		fontDefinitions = response.fonts;
	});

const map = fetch('./config/map.json')
	.then((response) => response.json())
	.then((response) => {
		mapDefinition = response;
	});

const pokemon = fetch('./config/pokemon.json')
	.then((response) => response.json())
	.then((response) => {
		pokemonDefinitions = response;
	});

Promise.all([assets, map, pokemon])
	.then(() => {
		pokemonFactory.load(pokemonDefinitions);

		// Load all the assets from their definitions.
		images.load(imageDefinitions);
		fonts.load(fontDefinitions);

		// Add all the states to the state machine.
		stateStack.push(new PlayState(mapDefinition));

		const game = new Game(stateStack, context, timer, canvas.width, canvas.height);

		game.start();

		// Focus the canvas so that the player doesn't have to click on it.
		canvas.focus();
	});

// Add event listeners for player input.
canvas.addEventListener('keydown', event => {
	keys[event.key] = true;
});

canvas.addEventListener('keyup', event => {
	keys[event.key] = false;
});
