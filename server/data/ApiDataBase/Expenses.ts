type ExpensesProps = { detailsId: string; id?: string; name?: string; customPrice: number; group: "entry" | "waystone"; itemCategory?: string; dragImg?: string; dropImg?: string, backupImage?: string };
const backupImg = "/img/itemBackupImg/"
export const expenses: ExpensesProps[] = [
  { detailsId: "call-of-the-shadows", customPrice: 0 , group: "entry", itemCategory:"The Bodach", dragImg:"/img/BodachDrag.webp", dropImg:"/img/BodachDrop.webp", backupImage:`${backupImg}CallOfTheShadows.webp`},
  { detailsId: "kulemaks-invitation", customPrice: 0 , group: "entry", itemCategory:"Vessel of Kulemak",dragImg:"/img/KulemakDrag.webp", dropImg:"/img/KulemakDrop.webp",backupImage:`${backupImg}KulemaksInvitation.webp`},
  { detailsId: "origin-core", customPrice: 0 , group: "entry" ,itemCategory:"The Arbiter of Divinity",dragImg:"/img/OriginCoreDrag.webp", dropImg:"/img/OriginCoreDrop.webp",backupImage:`${backupImg}OriginCore.webp`},

  { detailsId: "ancient-crisis-fragment", customPrice: 0 , group: "entry",itemCategory:"The Arbiter of Ash", dragImg:"/img/ArbiterOfAshDrag.webp", dropImg:"/img/ArbiterOfAshDrop.webp", backupImage:`${backupImg}PinnacleKey1.webp`},
  { detailsId: "faded-crisis-fragment", customPrice: 0 , group: "entry",itemCategory:"The Arbiter of Ash", dragImg:"/img/ArbiterOfAshDrag.webp", dropImg:"/img/ArbiterOfAshDrop.webp", backupImage:`${backupImg}PinnacleKey2.webp`},
  { detailsId: "weathered-crisis-fragment", customPrice: 0 , group: "entry",itemCategory:"The Arbiter of Ash", dragImg:"/img/ArbiterOfAshDrag.webp", dropImg:"/img/ArbiterOfAshDrop.webp",backupImage:`${backupImg}PinnacleKey3.webp`},

  { detailsId: "cowardly-fate", customPrice: 0 , group: "entry",itemCategory:"The Trialmaster", dragImg:"/img/TrialmasterDrag.webp", dropImg:"/img/TrialmasterDrop.webp",backupImage:`${backupImg}CowardlyFate.webp` },
  { detailsId: "deadly-fate", customPrice: 0 , group: "entry",itemCategory:"The Trialmaster", dragImg:"/img/TrialmasterDrag.webp", dropImg:"/img/TrialmasterDrop.webp",backupImage:`${backupImg}DeadlyFate.webp` },
  { detailsId: "victorious-fate", customPrice: 0 , group: "entry",itemCategory:"The Trialmaster", dragImg:"/img/TrialmasterDrag.webp", dropImg:"/img/TrialmasterDrop.webp",backupImage:`${backupImg}VictoriousFate.webp`},

  { detailsId: "olroths-saga", customPrice: 0 , group: "entry", itemCategory:"Olroth",dragImg:"/img/SagasDrag.webp",dropImg:"/img/OlrothDrop.webp",backupImage:`${backupImg}SpecialExpeditionPage1.webp`},
  { detailsId: "voranas-saga", customPrice: 0 , group: "entry", itemCategory:"Vorana",dragImg:"/img/SagasDrag.webp",dropImg:"/img/VoranaDrop.webp",backupImage:`${backupImg}SpecialExpeditionPage2.webp`},
  { detailsId: "medveds-saga", customPrice: 0 , group: "entry", itemCategory:"Medved",dragImg:"/img/SagasDrag.webp",dropImg:"/img/MedvedDrop.webp",backupImage:`${backupImg}SpecialExpeditionPage3.webp`},
  { detailsId: "uhtreds-saga", customPrice: 0 , group: "entry", itemCategory:"Uhtred",dragImg:"/img/SagasDrag.webp",dropImg:"/img/UhtredDrop.webp",backupImage:`${backupImg}SpecialExpeditionPage4.webp`},

  { detailsId: "the-triskelion-reforged", customPrice: 0 , group: "entry" ,itemCategory:"The Aberration", dragImg:"/img/AberrationDrag.webp", dropImg:"/img/AberrationDrop.webp", backupImage:`${backupImg}TheTriskelionReforged.webp`},
  { detailsId: "breachlord-sac", customPrice: 0 , group: "entry", itemCategory:"Xesht, We That Are One", dragImg:"/img/XeshtDrag.webp", dropImg:"/img/XeshtDrop.webp", backupImage:`${backupImg}BreachlordSac.webp`},
  { detailsId: "ravens-reflection", customPrice: 0 , group: "entry", itemCategory:"The Raven Trickster",dragImg:"/img/RavenDrag.webp", dropImg:"/img/RavenDrop.webp",backupImage:`${backupImg}RavensReflection.webp` },

  { detailsId: "simulacrum", customPrice: 0, group: "waystone", itemCategory: "Waystone" },
  { id: "waystone15", name: "Waystone (Tier 15)", detailsId: "waystone15", customPrice: 0, group: "waystone", itemCategory: "Waystone", backupImage: `${backupImg}Waystone15.webp` },

  {detailsId:"omen-of-chaotic-effectiveness",customPrice: 0, group: "waystone",itemCategory:"Omens"},
  {detailsId:"omen-of-chaotic-rarity",customPrice: 0, group: "waystone",itemCategory:"Omens"},
  {detailsId:"omen-of-chaotic-quantity",customPrice: 0, group: "waystone",itemCategory:"Omens"},
  {detailsId:"omen-of-chaotic-monsters",customPrice: 0, group: "waystone",itemCategory:"Omens"},

   {detailsId: 'delirium-tablet-delirium-tablet-normal',customPrice: 0, group: "waystone" ,itemCategory:"Tablet"},
   {detailsId: 'irradiated-tablet-irradiated-tablet-normal',customPrice: 0, group: "waystone",itemCategory:"Tablet"},
   {detailsId: 'breach-tablet-breach-tablet-normal',customPrice: 0, group: "waystone",itemCategory:"Tablet"},
   {detailsId: 'expedition-tablet-expedition-tablet-normal',customPrice: 0, group: "waystone",itemCategory:"Tablet"},
   {detailsId: 'ritual-tablet-ritual-tablet-normal',customPrice: 0, group: "waystone",itemCategory:"Tablet"},
   {detailsId: 'abyss-tablet-abyss-tablet-normal',customPrice: 0, group: "waystone",itemCategory:"Tablet"},
   {detailsId: 'temple-tablet-temple-tablet-normal',customPrice: 0, group: "waystone",itemCategory:"Tablet"},
   {detailsId: 'overseer-tablet-overseer-tablet-normal',customPrice: 0, group: "waystone",itemCategory:"Tablet"},
];