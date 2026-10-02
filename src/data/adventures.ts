// The adventures you can start in the public app (Android 1.1.17, iOS 1.1.20).
// Texts: C:\App\brainstorm\sito-masterai\ambientazioni\*.md (Ryan, reviewed by Stanley, 2026-10-02).
// Rule from the writers' table: nothing past the first scene, no spoilers, no famous-franchise names.
// Inline `code` in a paragraph is rendered as <code>.

import godKingHero from '@/assets/adventures/god-king-hero.webp'
import godKingCard from '@/assets/adventures/god-king-card.webp'
import godKingFloorsTop from '@/assets/adventures/god-king-floors-1-6.webp'
import godKingFloorsDeep from '@/assets/adventures/god-king-floors-7-12.webp'
import arcaneHero from '@/assets/adventures/arcane-academy-hero.webp'
import arcaneCard from '@/assets/adventures/arcane-academy-card.webp'
import oakHero from '@/assets/adventures/oak-valley-terror-hero.webp'
import oakCard from '@/assets/adventures/oak-valley-terror-card.webp'
import reichHero from '@/assets/adventures/reichs-dragons-hero.webp'
import reichCard from '@/assets/adventures/reichs-dragons-card.webp'
import moonHero from '@/assets/adventures/chrome-moon-hero.webp'
import moonCard from '@/assets/adventures/chrome-moon-card.webp'
import moonBeetle from '@/assets/adventures/chrome-moon-beetle.webp'
import forgeHero from '@/assets/adventures/forge-your-kingdom-hero.webp'
import forgeCard from '@/assets/adventures/forge-your-kingdom-card.webp'
import customHero from '@/assets/adventures/custom-adventure-hero.webp'
import customCard from '@/assets/adventures/custom-adventure-card.webp'

export interface AdventureSection {
  heading: string
  paragraphs?: string[]
  items?: { name: string; text: string }[]
}

export interface AdventureImage {
  src: string
  alt: string
  caption?: string
  tall?: boolean
}

export interface Adventure {
  slug: string
  title: string
  tagline: string
  card: string
  hero: string
  heroAlt: string
  sections: AdventureSection[]
  gallery?: AdventureImage[]
  bestFor: string
}

export const ADVENTURES: Adventure[] = [
  {
    slug: 'god-king',
    title: 'The Dungeon of the God-King',
    tagline: 'A forgotten tomb, lethal traps, and a tyrant who defies death itself. Do you dare venture into its depths?',
    card: godKingCard,
    hero: godKingHero,
    heroAlt: 'An armored skeletal king on a stone throne, wreathed in smoke and red light',
    sections: [
      {
        heading: 'The world',
        paragraphs: [
          'Cariddi Hold is a metropolis that should not exist. It grew out of nothing, from the endless stream of adventurers drawn to one place: the tomb of the God-King Gutherax. Everyone in the city talks about the infinite riches buried below. No tome describes the inside and no map shows it, because nobody has ever come back up.'
        ]
      },
      {
        heading: 'The selection',
        paragraphs: [
          'The High Council of Cariddi Hold lets only the strongest go down. Fifty recruits fight, and only the last five still standing join the expeditions.'
        ]
      },
      {
        heading: 'The floors, as the legends tell them',
        items: [
          { name: 'The Ring of Death', text: 'a circular tunnel with no end, and niches that hide more than dust.' },
          { name: 'The Labyrinth', text: 'a colossal maze that rebuilds itself, and a guardian of brass and gears.' },
          { name: 'The Necropolis of a Thousand Tombs', text: 'the resting place of an ancient army, where green funeral flames burn between the graves.' },
          { name: 'The Troll Castle', text: 'a cavern so vast it has its own sky, forests and a town of castaways. At its heart stands a fortress of black obsidian.' },
          { name: 'The Forgotten Citadel', text: 'a city of restless ghosts who cannot agree on how they died.' },
          { name: 'The Arena', text: 'spectral crowds in the stands, waiting for a show.' },
          { name: 'The Shifting Chambers', text: 'hundreds of identical square rooms, and none of them stays in the same world.' },
          { name: 'Beast Hunters', text: 'a whole wild country under the rock, with its own weather, its own sun, and legendary beasts.' },
          { name: 'The Hollow Deep', text: 'the caverns of the deep world, where things with glowing eyes live.' },
          { name: 'The Incubus Floor', text: 'a descent into your own worst memories.' },
          { name: 'The Dragon Trial', text: 'an immense hall of bridges over a hoard, and the one who guards it.' },
          { name: 'The Sepulchral Chamber of the God-King', text: 'the last floor, and the one this tomb was built for.' }
        ]
      },
      {
        heading: "Who you'll meet",
        paragraphs: [
          'The High Council of Cariddi Hold, the expedition leaders choosing their recruits, and the other hopefuls you will have to beat.'
        ]
      }
    ],
    gallery: [
      { src: godKingFloorsTop, alt: 'Cutaway of the dungeon: the city of Cariddi Hold and the first six floors', caption: 'Cariddi Hold and the first six floors', tall: true },
      { src: godKingFloorsDeep, alt: 'Cutaway of the dungeon: floors seven to twelve, down to the hellfire', caption: 'Floors seven to twelve', tall: true }
    ],
    bestFor: 'Players who like classic dungeon crawls, riddles and traps, and the tension of never knowing what comes next. You start at level 1: win the selection, or come back when you are stronger.'
  },
  {
    slug: 'arcane-academy',
    title: 'Arcane Academy',
    tagline: 'Your admission letter has arrived!',
    card: arcaneCard,
    hero: arcaneHero,
    heroAlt: 'A new student with a letter in hand watches a magic lesson in a sunlit academy courtyard',
    sections: [
      {
        heading: 'The world',
        paragraphs: [
          'A letter with a wax seal, a train ticket, and the start of a new life. You have been accepted into a great academy of magic, where young students with a gift for the arcane learn to master it. Lessons, exams, rival houses, friendships that will last a lifetime, and secrets hidden in the corridors.'
        ]
      },
      {
        heading: 'How you play',
        paragraphs: [
          'Every lesson counts: you earn experience by how well you perform in class, and your spells grow with you, following DnD rules. Study, room and board are all paid for by the academy. All you have to think about is magic and the trouble it brings.'
        ]
      }
    ],
    bestFor: 'Players who want a school-of-magic story to grow up in, lesson after lesson. Recommended: a student with a talent for arcane magic.'
  },
  {
    slug: 'oak-valley-terror',
    title: 'The Oak Valley Terror',
    tagline: '1983. A group of friends and an RPG night that becomes all too real.',
    card: oakCard,
    hero: oakHero,
    heroAlt: 'Four kids on bikes at night stop in front of a glowing tear in the air at the edge of the woods',
    sections: [
      {
        heading: 'The world',
        paragraphs: [
          'Oak Valley, Oregon: a quiet town with a high school, a brand-new mall, and an energy research institute on the edge of the woods that nobody really talks about. It is 1983, and you are a kid. Your weekend plans are bikes, arcade games, and the DnD campaign in your friend\'s basement.'
        ]
      },
      {
        heading: 'How it starts',
        paragraphs: [
          'The game begins in the middle of your tabletop session, with the dice still rolling. Then it gets late, a mom calls everyone home, and the friends ride back through the dark on their bikes. That is when Oak Valley stops being a quiet town.'
        ]
      },
      {
        heading: 'How you play',
        paragraphs: [
          'You are a kid, not a hero. Your character sheet is the DnD character you play at the table, and the adults won\'t believe a word you say. You earn experience by investigating, finding clues and reaching the turning points of the story.'
        ]
      }
    ],
    bestFor: 'Fans of 80s nostalgia, suburban horror and coming-of-age stories, where a group of kids on bikes is the only hope.'
  },
  {
    slug: 'reichs-dragons',
    title: "WWII: The Reich's Dragons",
    tagline: 'What if the multiverse tore open at the height of World War II? History will never be the same.',
    card: reichCard,
    hero: reichHero,
    heroAlt: 'A black dragon coiled around an iron tower above a burning city at night',
    sections: [
      {
        heading: 'The world',
        paragraphs: [
          'Arkadia is a realm of magic: the Elderscale Marches, and their capital Drakenspires. On Earth, nobody knows Arkadia exists. In Arkadia, nobody has ever heard of Earth. Then strange astral fractures start flickering in the sky, and a great portal opens near Drakenspires. Through it march tanks, planes and an army from another world. Magic against the machines of World War II.'
        ]
      },
      {
        heading: 'How it starts',
        paragraphs: [
          'You are in Arkadia when the invasion begins. A few hours later, an astral disturbance throws you across the planes, onto a beach near Dunkirk, in the middle of the great evacuation of 1940.'
        ]
      },
      {
        heading: 'How you play',
        paragraphs: [
          'Survival matters: travel takes days, food runs out, and supplies are scarce. Firearms follow their own deadly rules. The story follows the real events of the war, bent by what is coming through the portal.'
        ]
      }
    ],
    bestFor: 'Players who like alternate history, gritty survival, and the clash between swords, spells and machine guns.'
  },
  {
    slug: 'chrome-moon',
    title: 'The Night of the Chrome Moon',
    tagline: 'Are you ready to defend the Elderscale Marches? The dawn of a cyber-fantasy epic is at hand.',
    card: moonCard,
    hero: moonHero,
    heroAlt: 'A flying galleon with glowing sails fires lasers in front of a huge silver moon',
    sections: [
      {
        heading: 'The world',
        paragraphs: [
          'Arkadia, a realm of swords and sorcery. In your dreams, a goddess of the moon warns you of a danger coming the next night. Nobody believes you. Then, on the second evening, something vast emerges from deep space, towing a small planet covered in modern cities. Neptune settles into orbit around Arkadia, and the skies are never the same again.'
        ]
      },
      {
        heading: 'The Neptunians',
        paragraphs: [
          'They come down in SpellShips, flying galleons armed with laser cannons: scholars and merchants in cyberpunk style, studying the artifacts of your world, and studying you, from a distance. Their fleet blocks the way to the Moon, and Arkadia\'s great cities start looking for adventurers who can find a way up to Neptune: a world of eternal night, medieval and cybernetic at the same time.'
        ]
      },
      {
        heading: 'How you play',
        paragraphs: [
          'Survival matters: travel takes days, food runs out, and supplies are scarce. Combat follows initiative, turn by turn.'
        ]
      }
    ],
    gallery: [
      { src: moonBeetle, alt: 'Villagers in a medieval square look up at a colossal astral beetle towing a planet across the night sky', caption: 'The second evening' }
    ],
    bestFor: 'Players who want classic fantasy to collide with cyberpunk: lasers, flying ships and divine dreams.'
  },
  {
    slug: 'forge-your-kingdom',
    title: 'Forge your Kingdom',
    tagline: 'Will you be a symbol of freedom or rule with an iron fist? The fate of the Forgotten Land lies in your hands.',
    card: forgeCard,
    hero: forgeHero,
    heroAlt: 'Settlers raise the first gate of a wooden palisade at sunrise, above a wild river valley',
    sections: [
      {
        heading: 'The world',
        paragraphs: [
          'The Forgotten Land is a vast, lawless wilderness of cursed forests, swamps, mountains and ruins, overrun by greenskins, beasts, undead, fey and bandit clans. Three ambitious cities lie 140 miles from its heart, and each of them wants the land for itself.'
        ],
        items: [
          { name: 'Davorn', text: 'on the western coast, with its fleets and its spies.' },
          { name: 'Zahktar', text: 'in the eastern desert, with spices, gems and mercenaries.' },
          { name: 'Brumière', text: 'in the green valleys to the south.' }
        ]
      },
      {
        heading: 'How it starts',
        paragraphs: [
          'Lord Philippe de La Brumière is looking for adventurers to tame the Forgotten Land. Those who succeed will earn a noble title and the right to claim it. First you have to pass his trials. Then you set out with the other founders, and together you must decide what kind of government your domain will have. Not everyone will agree, and some of your companions are already scheming.'
        ]
      },
      {
        heading: 'How you play',
        paragraphs: [
          'You rise from adventurer to ruler. Your camp becomes an outpost, the outpost a village, and the village perhaps a kingdom. Food, morale, order, the loyalty of the factions: everything depends on how you govern, and every choice has consequences. Govern well and you grow. Govern badly and you get famine, plague and revolt.'
        ]
      }
    ],
    bestFor: 'Players who want more than adventure: politics, building, and a kingdom that is truly theirs.'
  },
  {
    slug: 'custom-adventure',
    title: 'Custom Adventure',
    tagline: 'Nothing is set. Every adventure is unique: play in any universe you desire.',
    card: customCard,
    hero: customHero,
    heroAlt: 'A lone warrior raises a sword against a huge red dragon in a burning cavern',
    sections: [
      {
        heading: 'How it works',
        paragraphs: [
          'No script and no preset world: you choose it. Type `setting:` followed by the world you want, and the Master builds it around you. It can be a classic fantasy realm, a pirate archipelago, a haunted Victorian city, or a galaxy far from any map.',
          'Then create your hero: a name, a look, a background. A disgraced knight looking for redemption, a thief with a debt to pay, a young mage who just burned down the village library: every background opens a different story.'
        ]
      }
    ],
    bestFor: 'Players who already have a world or a character in mind. Tip: the more you write in your setting and your background, the more personal your adventure will be.'
  }
]

export const findAdventure = (slug: string) => ADVENTURES.find((a) => a.slug === slug)
