// What's coming to MasterAI. Source: C:\App\brainstorm\sito-masterai\roadmap\roadmap-bozza.md
// (Stanley, 2026-10-02), approved by Marco the same day: "announce everything", with
// "an improved campaign memory" and the new "More random dice" line.
// No dates, no prices, nothing about the shop (Marco's rule of 2026-09-15).
// Compared with the public app: when a release ships one of these, move it out of here.
// Memory line rewritten on Marco's decision of 2026-10-15: the Master already remembers well,
// new technology will make it remember more.

export interface RoadmapItem {
  title: string
  text: string
}

export interface RoadmapStage {
  id: string
  title: string
  intro: string
  items: RoadmapItem[]
}

export const ROADMAP: RoadmapStage[] = [
  {
    id: 'testing',
    title: 'Built, now in testing',
    intro: 'The code is written and our testers are playing it.',
    items: [
      { title: 'Choose your skills and Expertise', text: 'Pick your skill proficiencies and Expertise yourself when you create a character.' },
      { title: 'Custom race', text: 'Invent your own race: give it a name and choose its ability bonuses.' },
      { title: 'Full racial traits', text: "Every race with its complete set of traits, like the dragonborn's breath weapon and draconic ancestry." },
      { title: 'Racial spells and more spell choices', text: 'Spells granted by your race, and more choices in the spell menu.' },
      { title: 'More random dice', text: 'Every d20 drawn at random by our server and handed to the Master. More failures, more tension, and victories you really earned.' }
    ]
  },
  {
    id: 'development',
    title: 'In development',
    intro: 'Decided, designed, and on the workbench.',
    items: [
      { title: 'Multiclassing', text: 'Combine more than one class in the same hero.' },
      { title: 'The Shapechanger race', text: 'A playable shapeshifter race, coming back after a full rework.' },
      { title: 'Weapon training, redone', text: 'Choose your weapon proficiencies from a proper list.' },
      { title: 'An even better campaign memory', text: 'The Master already remembers your campaign well. New cutting-edge technology is on its way to help it remember even more.' },
      { title: 'Coins by denomination', text: 'Gold, silver and copper counted separately, as the rules intend.' }
    ]
  },
  {
    id: 'planning',
    title: 'On the drawing board',
    intro: 'Being designed now. These take longer.',
    items: [
      { title: 'More subclasses', text: 'New subclasses for the classes you already play. Each one appears on the Classes page as soon as it is ready.' },
      { title: 'A new adventure: the Odyssey', text: 'A new world to explore, in the same app.' },
      { title: "The Master's voice", text: 'Hear the Master narrate your story out loud.' },
      { title: 'Feats', text: 'Feats from the rules, to shape your hero even further.' }
    ]
  }
]
