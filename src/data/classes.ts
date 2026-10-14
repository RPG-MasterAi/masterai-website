// Classes and races of the public app.
// Class and race descriptions are the in-app ones, word for word
// (masterai app, lib/tolgee/en.json: new_chat_menu.class.* / new_chat_menu.race.*).
// Subclass lines: C:\App\brainstorm\sito-masterai\classi\classi.md (Ryan, checked by Stanley
// against the SRD 5.1, 2026-10-02). The app has one subclass per class today.
// The Warlock is playable since 2026-10-14 (Marco). `comingSoon` marks a class not yet released.
// Portraits: masterai app, assets/classes and assets/races (512x512 webp).

import barbarian from '@/assets/classes/barbarian.webp'
import bard from '@/assets/classes/bard.webp'
import cleric from '@/assets/classes/cleric.webp'
import druid from '@/assets/classes/druid.webp'
import fighter from '@/assets/classes/fighter.webp'
import monk from '@/assets/classes/monk.webp'
import paladin from '@/assets/classes/paladin.webp'
import ranger from '@/assets/classes/ranger.webp'
import rogue from '@/assets/classes/rogue.webp'
import sorcerer from '@/assets/classes/sorcerer.webp'
import warlock from '@/assets/classes/warlock.webp'
import wizard from '@/assets/classes/wizard.webp'

import dragonborn from '@/assets/races/dragonborn.webp'
import dwarf from '@/assets/races/dwarf.webp'
import elf from '@/assets/races/elf.webp'
import gnome from '@/assets/races/gnome.webp'
import halfElf from '@/assets/races/half-elf.webp'
import halfOrc from '@/assets/races/half-orc.webp'
import halfling from '@/assets/races/halfling.webp'
import human from '@/assets/races/human.webp'
import tiefling from '@/assets/races/tiefling.webp'

export interface HeroClass {
  id: string
  name: string
  image: string
  description: string
  attributes: string
  subclass: { name: string; text: string }
  comingSoon?: boolean
}

export interface Race {
  id: string
  name: string
  image: string
  description: string
}

export const CLASSES: HeroClass[] = [
  {
    id: 'barbarian',
    name: 'Barbarian',
    image: barbarian,
    description: 'Savage warriors who draw on primal fury, barbarians are formidable fighters capable of enduring devastating blows and dealing massive damage.',
    attributes: 'STR, then CON and DEX',
    subclass: { name: 'Path of the Berserker', text: 'A rage so deep it becomes a frenzy of extra attacks, paid for with exhaustion.' }
  },
  {
    id: 'bard',
    name: 'Bard',
    image: bard,
    description: 'Masters of art and magic, bards weave enchanting melodies to inspire allies, confuse enemies, and manipulate arcane energy at will.',
    attributes: 'CHA, then DEX and CON',
    subclass: { name: 'College of Lore', text: 'A collector of secrets, with extra skills and words that cut.' }
  },
  {
    id: 'cleric',
    name: 'Cleric',
    image: cleric,
    description: 'Devout servants of the deities, clerics channel divine power to heal wounds, turn undead, deliver holy retribution, and cast spells, adapting to the domain of their chosen deity.',
    attributes: 'WIS, then STR and CON',
    subclass: { name: 'Life Domain', text: 'The greatest healer, with heavy armor and the power to keep allies alive.' }
  },
  {
    id: 'druid',
    name: 'Druid',
    image: druid,
    description: 'Guardians of nature, druids have the ability to transform into animals and wield natural forces through spells, striving to maintain the balance between civilization and nature.',
    attributes: 'WIS, then CON and DEX',
    subclass: { name: 'Circle of the Land', text: 'A druid bound to a land who draws extra spells and power from it.' }
  },
  {
    id: 'fighter',
    name: 'Fighter',
    image: fighter,
    description: 'Versatile and well-trained combatants, fighters excel in the use of a wide array of weapons and tactics, adapting to any battle situation with skill and strategy.',
    attributes: 'STR (or DEX), then CON',
    subclass: { name: 'Champion', text: 'Pure martial excellence, with more critical hits and tireless resilience.' }
  },
  {
    id: 'monk',
    name: 'Monk',
    image: monk,
    description: 'Disciplined martial artists, monks channel their inner energy, or ki, to perform superhuman feats, combining agility, strength, and precision in combat.',
    attributes: 'DEX, then WIS and CON',
    subclass: { name: 'Way of the Open Hand', text: 'Master of unarmed combat who can knock down, push and stagger enemies.' }
  },
  {
    id: 'paladin',
    name: 'Paladin',
    image: paladin,
    description: 'Sacred warriors bound by an oath, paladins combine martial prowess and divine power to protect the innocent and punish evil, embodying ideals of justice and virtue.',
    attributes: 'STR, then CHA and CON',
    subclass: { name: 'Oath of Devotion', text: 'The classic holy knight: honest, courageous and radiant.' }
  },
  {
    id: 'ranger',
    name: 'Ranger',
    image: ranger,
    description: 'Skilled explorers and hunters, rangers are masters of survival and combat in wild environments. Proficient with the bow, they are often accompanied by animal companions who assist in their endeavors.',
    attributes: 'DEX, then WIS and CON',
    subclass: { name: 'Hunter', text: 'Specialist in bringing down the biggest prey and facing hordes.' }
  },
  {
    id: 'rogue',
    name: 'Rogue',
    image: rogue,
    description: "Masters of stealth and deception, rogues are skilled thieves and agile fighters, capable of delivering precise strikes by exploiting their enemies' weaknesses.",
    attributes: 'DEX, then CON and INT (or CHA)',
    subclass: { name: 'Thief', text: 'Quick hands, expert climbing and a knack for using any magic item: the classic burglar.' }
  },
  {
    id: 'sorcerer',
    name: 'Sorcerer',
    image: sorcerer,
    description: 'Bearers of innate magical power, sorcerers draw on sources of arcane energy within their own blood, casting spells with unique spontaneity and potency.',
    attributes: 'CHA, then CON and DEX',
    subclass: { name: 'Draconic Bloodline', text: 'Dragon blood in the veins, with scales, resilience and elemental power.' }
  },
  {
    id: 'wizard',
    name: 'Wizard',
    image: wizard,
    description: 'Scholars of the arcane, wizards dedicate their lives to understanding and manipulating magic, mastering a vast range of spells to control the battlefield.',
    attributes: 'INT, then CON and DEX',
    subclass: { name: 'School of Evocation', text: 'Master of destructive spells who can spare allies from the blast.' }
  },
  {
    id: 'warlock',
    name: 'Warlock',
    image: warlock,
    description: 'Individuals who have made a pact with otherworldly entities, warlocks gain supernatural powers in exchange for servitude, wielding unique abilities and dark invocations.',
    attributes: 'CHA, then CON and DEX',
    subclass: { name: 'The Fiend', text: 'A pact with a demonic patron that grants fire, resilience and dark luck.' }
  }
]

export const RACES: Race[] = [
  { id: 'human', name: 'Human', image: human, description: 'Renowned for their adaptability and ambition, they encompass a wide range of cultures and talents, making them highly versatile.' },
  { id: 'elf', name: 'Elf', image: elf, description: 'Long-lived and graceful creatures, elves are known for their dexterity, intelligence, and connection to magic and nature.' },
  { id: 'dwarf', name: 'Dwarf', image: dwarf, description: 'Resilient and industrious, dwarves are master craftsmen and formidable warriors, with a strong affinity for mountains and mines.' },
  { id: 'halfling', name: 'Halfling', image: halfling, description: 'Known for their agility and innate luck, halflings are courageous adventurers despite their small stature.' },
  { id: 'gnome', name: 'Gnome', image: gnome, description: 'Small and curious, gnomes are inventors and illusionists with a natural inclination for magic and craftsmanship.' },
  { id: 'half-elf', name: 'Half-Elf', image: halfElf, description: 'With the blood of both humans and elves, half-elves combine the best qualities of both races, making them versatile and charismatic.' },
  { id: 'half-orc', name: 'Half-Orc', image: halfOrc, description: 'Born from the union of humans and orcs, half-orcs are hardy and determined, often struggling to find their place in the world.' },
  { id: 'dragonborn', name: 'Dragonborn', image: dragonborn, description: 'Imposing humanoids descended from dragons, they have an ancestral connection to draconic magic.' },
  { id: 'tiefling', name: 'Tiefling', image: tiefling, description: 'With infernal ancestry, tieflings possess demonic traits and a natural affinity for dark magic, often facing prejudice due to their appearance.' }
]

export const PLAYABLE_CLASSES = CLASSES.filter((c) => !c.comingSoon).length
