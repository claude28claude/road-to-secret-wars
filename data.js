/* Road to Secret Wars - the content.
 *
 * PARTS    the watch road, in three parts (ticked = watched)
 * DOMES    the 22 domes of Battleworld (ticked = briefed)
 * POSTERS  poster art per entry id (verified at build time)
 * COMPOSED entry ids with no portrait poster, and their theme colour
 *
 * Deliberately globals: app.js reads them from inside its IIFE.
 * This file must load BEFORE app.js.
 */

/* ============================================================
   THE WATCH ROAD
   id     stable key for saved progress — never reuse or rename
   type   film | series | special | comic
   run    minutes (films exact; series ≈ eps × typical length;
          comics are an honest reading-time estimate)
   tier   essential | recommended | optional
   when   the "when" column in the detail panel
   domes  ids of the domes this entry is the homework for
   soon   true = not out yet
   ============================================================ */

var PARTS = [
{
  no:'Part I', title:'The Last Mile', sub:'Summer 2026 → 18 December 2026',
  blurb:'The final stretch of the first road, and the only part of this page you can finish before Doomsday. If you have walked <a href="https://claude28claude.github.io/whattowatchbeforedoomsday/" target="_blank" rel="noopener">The Doomsday Protocol</a> already, these four are its last four entries, re-read for what they mean for Battleworld rather than for Doomsday.',
  items:[
  {id:'brandnewday',t:'Spider-Man: Brand New Day',y:2026,type:'film',run:145,tier:'essential',dir:'Destin Daniel Cretton',where:'Rent or buy digitally',pc:1,when:'31 July 2026',
   why:'The last MCU film before Doom arrives. Peter rebuilding from nothing, with Hulk and Frank Castle treated as neighbours — the sacred timeline at its most settled, right before it stops being one.',
   watch:'How ordinary it all is. That casualness is the point: if a Manhattan dome turns up on Battleworld, this is the last footage of the original.',
   ties:'Manhattan is the dome closest to “normal”, and this is the normal it is cut from. Spider-Island is the same city overrun.',
   domes:['manhattan','spiderisland','greenland'],
   note:'One post-credits scene, right at the very end of the credits.'},
  {id:'visionquest',t:'VisionQuest',y:2026,type:'series',eps:8,run:320,tier:'essential',dir:'Terry Matalas (showrunner)',where:'Disney+ / JioHotstar (IN)',pc:0,when:'13 Oct – 10 Nov 2026',
   why:'The single most important entry on this page. White Vision against Ultron, weeks before Doomsday — and reported to feed into Secret Wars rather than just the film in front of it.',
   watch:'Ultron. If Battleworld happens, the dome called Perfection is an endless Ultron drone-world sealed behind the Shield, and it is the only dome the MCU is visibly building hardware for right now.',
   ties:'Prerequisites are Age of Ultron and WandaVision, both in Part III. Perfection is the dome this whole series points at.',
   domes:['perfection'],
   note:'Finished on 10 November 2026. Eight episodes, total runtime estimated.'},
  {id:'endgameencore',t:'Avengers: Endgame Encore',y:2026,type:'special',eps:1,run:188,tier:'optional',dir:'Anthony and Joe Russo',where:'Cinemas (short re-release run)',pc:0,when:'25 September 2026',
   why:'Endgame re-cut with several minutes of new footage that bridge into Doomsday. Optional here: the original Endgame in Part III covers everything the plot needs.',
   watch:'The new footage at either end. It is the Russos telling you, a year early, which threads they plan to pull.',
   ties:'If you only rewatch one film before Secret Wars, it should be Endgame in one form or another.',
   domes:['warzone','manhattan']},
  {id:'doomsday',t:'Avengers: Doomsday',y:2026,type:'film',run:150,tier:'essential',dir:'Anthony and Joe Russo',where:'Cinemas',pc:0,when:'18 December 2026',soon:true,
   why:'The gate. Heroes from three universes on a collision course and Robert Downey Jr. as Victor von Doom. Everything below this entry assumes you have seen it.',
   watch:'What Doom actually wants. In the comics he does not want to rule the world — he wants to be the only thing holding it together, and to be thanked for it. That difference decides whether Battleworld is a threat or a rescue.',
   ties:'The Fantastic Four: First Steps ends with Doom; Thunderbolts* ends with the Fantastic Four arriving. Doomsday is where those threads knot, and Secret Wars is where they are cut.',
   domes:['doomstadt'],
   note:'Runtime not announced — 150 minutes is a placeholder.',
   gate:'<b>Spoiler gate.</b> Everything from here down is built on what Doomsday leaves behind. The dome briefings are comic-book history, not film leaks — but they will still colour how you read the ending.'}
]},

{
  no:'Part II', title:'The Interregnum', sub:'19 December 2026 → 16 December 2027',
  blurb:'The 364 days between the two films. Marvel has deliberately cleared its 2027 cinema calendar: <b>no Marvel Studios film sits between Doomsday and Secret Wars</b>, so the year belongs to Disney+, one Sony film, and the comics Secret Wars is named after.',
  items:[
  {id:'bornagain3',t:'Daredevil: Born Again — Season 3',y:2027,type:'series',eps:8,run:400,tier:'recommended',dir:'Dario Scardapane (showrunner)',where:'Disney+ / JioHotstar (IN)',pc:0,when:'2027 · expected early in the year',soon:true,
   why:'The only Marvel Studios series reliably expected inside the gap. Reported to widen into the old Defenders corner, with Luke Cage and Iron Fist both said to return.',
   watch:'Whether the street level acknowledges Doomsday at all. A Battleworld cliffhanger here would be the loudest possible signal that nothing is off the table.',
   ties:'If Danny Rand is back, K’un-Lun is back — and K’un-Lun is one of the domes on the map.',
   domes:['kunlun','manhattan'],
   note:'Not dated by Marvel. March 2027 is widely reported but is an expectation from the show’s yearly rhythm, not an announcement. Episode count and runtime are estimates.'},
  {id:'xmen97s3',t:'X-Men ’97 — Season 3',y:2027,type:'series',eps:10,run:330,tier:'recommended',dir:'Matthew Chauncey (head writer)',where:'Disney+ / JioHotstar (IN)',pc:0,when:'2027 · undated',soon:true,
   why:'Season 2 aired from 1 July 2026 and a third was ordered before it. The MCU’s most acclaimed animated property, still in its own continuity — for now.',
   watch:'The multiverse hooks. ’97 has played with time travel and alternate futures since its first season.',
   ties:'Mutopia — the ’92 X-Men dome — is on the Battleworld map. A dome is the cleanest door Marvel has ever had for folding an animated continuity into a live-action film.',
   domes:['mutopia'],
   note:'Catch up on Season 2 first if you have not. No date, episode count or runtime announced; the numbers here are placeholders.'},
  {id:'btsv',t:'Spider-Man: Beyond the Spider-Verse',y:2027,type:'film',run:130,tier:'optional',dir:'Sony Pictures Animation',where:'Cinemas',pc:0,when:'18 June 2027',soon:true,
   why:'The only big-screen Marvel film of the gap — and it is Sony’s, not Marvel Studios’. The end of the Miles Morales trilogy, in its own continuity.',
   watch:'The Spider-Society and its rules about “canon events”. It is the same question Battleworld asks — which pieces of a universe are allowed to survive.',
   ties:'No bearing on the MCU plot. Here because it is the one Marvel film in cinemas between Doomsday and Secret Wars.',
   domes:['spiderisland'],
   note:'Runtime not announced. Moved from 4 June to 18 June 2027.'},
  {id:'anim27',t:'Marvel Animation’s 2027 slate',y:2027,type:'series',eps:0,run:0,tier:'optional',dir:'Marvel Studios Animation',where:'Disney+ / JioHotstar (IN)',pc:0,when:'2027 · titles and dates unannounced',soon:true,
   why:'Your Friendly Neighborhood Spider-Man, Eyes of Wakanda and Marvel Zombies have all been continued in some form, but none is dated inside 2027. A placeholder, not a promise — tick it when something lands.',
   watch:'Marvel Zombies specifically. Its first season ended on a cliffhanger Marvel has never resolved on screen, and the Deadlands is a dome.',
   ties:'Every animated continuity Marvel keeps alive is another dome-shaped hole waiting to be filled.',
   domes:['deadlands'],
   note:'No runtime counted until titles are announced.'},
  {id:'sw2015',t:'Secret Wars (2015) — the comic',y:2015,type:'comic',eps:9,run:180,tier:'optional',dir:'Jonathan Hickman & Esad Ribić',where:'Marvel Unlimited, or the collected edition',pc:0,when:'Read any time',
   why:'Not required. But the nine-issue core series is where Battleworld, the domes, God Emperor Doom, Sheriff Strange and the Thor Corps all come from — and Part IV of this page is essentially a field guide to it.',
   watch:'Doom’s scar, and what he does about it. The most-quoted beat in modern Marvel is one question Doom is asked near the end, and the fact that he cannot answer it honestly.',
   ties:'If Marvel adapts even a third of this, the dome briefings below stop being speculation and become a cast list.',
   domes:['doomstadt','shield','agamotto'],
   note:'Reading time is an estimate: about twenty minutes an issue.'},
  {id:'sw1984',t:'Secret Wars (1984) — the original',y:1984,type:'comic',eps:12,run:240,tier:'optional',dir:'Jim Shooter & Mike Zeck',where:'Marvel Unlimited, or the collected edition',pc:0,when:'Read any time',
   why:'The first Battleworld: a cosmic being kidnaps heroes and villains to a patchwork planet and tells them to fight. Built to sell toys, and it changed comics anyway.',
   watch:'Doom stealing the Beyonder’s power — the original version of the move the 2015 series is built around.',
   ties:'The title, the planet and Doom’s ambition all start here. Thirty years later Hickman answered it.',
   domes:['doomstadt'],
   note:'Twelve issues; reading time is an estimate.'}
]},

{
  no:'Part III', title:'The Battleworld Rewatch', sub:'Twenty-three titles you have probably already seen',
  blurb:'Battleworld is built out of pieces of stories that already exist, so the best homework for Secret Wars is a rewatch. Each title here is the source material for at least one dome below — open a row to see which. <b>Essential</b> is what the two-film story leans on; the rest is for recognising a dome the moment it appears.',
  items:[
  {id:'endgame',t:'Avengers: Endgame',y:2019,type:'film',run:181,tier:'essential',dir:'Anthony and Joe Russo',where:'Disney+ / JioHotstar (IN)',pc:0,
   why:'The Russos’ last ending, and the one Secret Wars has to top. Steve’s choice, Tony’s death, the A-Force shot and the time-travel rules all come back into play when a multiverse is being rebuilt.',
   domes:['manhattan','warzone','technopolis','arcadia']},
  {id:'loki2',t:'Loki — Season 2',y:2023,type:'series',eps:6,run:300,tier:'essential',dir:'Justin Benson and Aaron Moorhead',where:'Disney+ / JioHotstar (IN)',pc:0,
   why:'Loki ends the season holding every timeline together by hand. If that fails, there is nothing left to hold — which is exactly the moment a man like Doom offers to build one world out of the wreckage.',
   domes:['shield']},
  {id:'mom',t:'Doctor Strange in the Multiverse of Madness',y:2022,type:'film',run:126,tier:'essential',dir:'Sam Raimi',where:'Disney+ / JioHotstar (IN)',pc:2,
   why:'Incursions — two universes touching and both dying — are introduced here. Battleworld is what Doom builds out of the survivors of incursions. Wanda’s arc here is House of M in everything but name.',
   domes:['agamotto','monarchyofm']},
  {id:'ff4',t:'The Fantastic Four: First Steps',y:2025,type:'film',run:114,tier:'essential',dir:'Matt Shakman',where:'Disney+ / JioHotstar (IN)',pc:2,
   why:'Doom’s whole story is Reed Richards. In the comics the person Doom fears on Battleworld is Reed, and the question he cannot answer is about Reed’s family. Meet them here.',
   domes:['doomstadt']},
  {id:'dpw',t:'Deadpool &amp; Wolverine',y:2024,type:'film',run:128,tier:'essential',dir:'Shawn Levy',where:'Disney+ / JioHotstar (IN)',pc:1,
   why:'The film that proved dead universes can be walked into. The Void is a dumping ground for pruned realities — Battleworld is the same idea with a god in charge and a wall around it.',
   domes:['wastelands','shield','westchester']},
  {id:'nowayhome',t:'Spider-Man: No Way Home',y:2021,type:'film',run:148,tier:'essential',dir:'Jon Watts',where:'Disney+ / JioHotstar (IN)',pc:2,
   why:'Three Spider-Men from three universes, and Strange’s spell that went wrong. The most crossover-tested corner Marvel has, and the template for every multiverse reunion since.',
   domes:['spiderisland','agamotto']},
  {id:'ultron',t:'Avengers: Age of Ultron',y:2015,type:'film',run:141,tier:'recommended',dir:'Joss Whedon',where:'Disney+ / JioHotstar (IN)',pc:1,
   why:'Ultron’s logic, and Vision’s birth. VisionQuest pulls directly on both, and the dome called Perfection is Ultron’s argument carried to its end.',
   domes:['perfection']},
  {id:'civilwar',t:'Captain America: Civil War',y:2016,type:'film',run:147,tier:'recommended',dir:'Anthony and Joe Russo',where:'Disney+ / JioHotstar (IN)',pc:2,
   why:'The Russos directed the split; Battleworld lets them re-stage it without resurrecting anyone. If Secret Wars wants one dome to break the audience, it is the permanent Civil War.',
   domes:['warzone']},
  {id:'wandavision',t:'WandaVision',y:2021,type:'series',eps:9,run:350,tier:'recommended',dir:'Matt Shakman',where:'Disney+ / JioHotstar (IN)',pc:0,
   why:'A person rewriting reality into something comfortable and making everyone inside it agree. That is Battleworld in miniature — and the White Vision who walks out of it is VisionQuest’s lead.',
   domes:['monarchyofm','perfection']},
  {id:'logan',t:'Logan',y:2017,type:'film',run:137,tier:'recommended',dir:'James Mangold',where:'Disney+ / JioHotstar (IN)',pc:0,
   why:'The darkest corner of the Fox universe and the only place a Wolverine can appear without contradicting anything. The Wastelands dome is Logan’s America taken further.',
   domes:['wastelands','barsinister']},
  {id:'xmen1',t:'X-Men',y:2000,type:'film',run:104,tier:'recommended',dir:'Bryan Singer',where:'Disney+ / JioHotstar (IN)',pc:0,
   why:'Stewart, McKellen and Marsden — the Fox cast Marvel has confirmed for Doomsday — starting from zero. Westchester and the Monarchy of M are both their address.',
   domes:['westchester','monarchyofm']},
  {id:'dofp',t:'X-Men: Days of Future Past',y:2014,type:'film',run:132,tier:'recommended',dir:'Bryan Singer',where:'Disney+ / JioHotstar (IN)',pc:1,
   why:'The Sentinel future is the single most recognisable image the Fox films produced, and it is a whole dome on Battleworld — a killing field laid between the mutant domains.',
   domes:['sentinel','westchester']},
  {id:'whatif1',t:'What If…? — Season 1',y:2021,type:'series',eps:9,run:300,tier:'recommended',dir:'Bryan Andrews',where:'Disney+ / JioHotstar (IN)',pc:0,
   why:'Nine short tours of universes that went wrong, including the zombie one and an Ultron that won. Two of those are domes behind the Shield.',
   domes:['deadlands','perfection']},
  {id:'xmen97',t:'X-Men ’97 — Seasons 1–2',y:2024,type:'series',eps:20,run:660,tier:'recommended',dir:'Beau DeMayo / Matthew Chauncey',where:'Disney+ / JioHotstar (IN)',pc:0,
   why:'The brightest, loudest version of the X-Men, played straight. Mutopia is this show as a dome — the most fan-satisfying door Marvel could open.',
   domes:['mutopia'],
   note:'Season 2 began on 1 July 2026. Its episode count here is counted as ten; runtime approximate.'},
  {id:'loki1',t:'Loki — Season 1',y:2021,type:'series',eps:6,run:290,tier:'recommended',dir:'Michael Waldron (creator)',where:'Disney+ / JioHotstar (IN)',pc:0,
   why:'The Void at the end of time, where pruned realities are thrown away and something enormous patrols. The Shield is that idea with a garrison.',
   domes:['shield']},
  {id:'marvelzombies',t:'Marvel Zombies',y:2025,type:'series',eps:4,run:128,tier:'optional',dir:'Bryan Andrews',where:'Disney+ / JioHotstar (IN)',pc:0,
   why:'The zombie universe expanded into a four-episode season that ended on a cliffhanger. The Deadlands is the cleanest way to cash that cheque.',
   domes:['deadlands']},
  {id:'apocalypse',t:'X-Men: Apocalypse',y:2016,type:'film',run:144,tier:'optional',dir:'Bryan Singer',where:'Disney+ / JioHotstar (IN)',pc:1,
   why:'The Fox era’s biggest unfinished idea. Its post-credits scene teased Mister Sinister in 2016 and never delivered — two domes are built on that debt.',
   domes:['apocalypse','barsinister']},
  {id:'ragnarok',t:'Thor: Ragnarok',y:2017,type:'film',run:130,tier:'optional',dir:'Taika Waititi',where:'Disney+ / JioHotstar (IN)',pc:2,
   why:'Sakaar is Planet Hulk on screen, and Hulk as a king. Greenland is that taken to its limit — and the Thor Corps needs a Thor who has already lost a world.',
   domes:['greenland','shield']},
  {id:'shehulk',t:'She-Hulk: Attorney at Law',y:2022,type:'series',eps:9,run:300,tier:'optional',dir:'Jessica Gao (creator)',where:'Disney+ / JioHotstar (IN)',pc:0,
   why:'Jen Walters, who leads the A-Force in the comics and rules Arcadia on Battleworld. Also Skaar, Hulk’s son, one of the cast Greenland already has.',
   domes:['arcadia','greenland']},
  {id:'moonknight',t:'Moon Knight',y:2022,type:'series',eps:6,run:290,tier:'optional',dir:'Jeremy Slater (creator)',where:'Disney+ / JioHotstar (IN)',pc:0,
   why:'Khonshu, Marc, Steven and Jake, left completely unresolved. Egyptia is a low-commitment way to bring all four back at once.',
   domes:['egyptia']},
  {id:'shangchi',t:'Shang-Chi and the Legend of the Ten Rings',y:2021,type:'film',run:132,tier:'optional',dir:'Destin Daniel Cretton',where:'Disney+ / JioHotstar (IN)',pc:2,
   why:'Ta Lo is the MCU’s version of a hidden mountain city. K’un-Lun is the comics’ — two roads to the same dome.',
   domes:['kunlun']},
  {id:'werewolf',t:'Werewolf by Night',y:2022,type:'special',eps:1,run:52,tier:'optional',dir:'Michael Giacchino',where:'Disney+ / JioHotstar (IN)',pc:1,
   why:'The MCU’s monster corner in fifty-two minutes. Weirdworld is where things like this wash up on Battleworld — the lost-property office of creation.',
   domes:['weirdworld']},
  {id:'gotg',t:'Guardians of the Galaxy',y:2014,type:'film',run:121,tier:'optional',dir:'James Gunn',where:'Disney+ / JioHotstar (IN)',pc:1,
   why:'Xandar and the Nova Corps, the world Thanos later destroyed off-screen. New Xandar is where the MCU gets to un-destroy something it never showed dying.',
   domes:['newxandar']}
]}
];

/* ============================================================
   THE DOMES OF BATTLEWORLD
   tier   locked | strong | wild
   n      dome number on this page's map
   src    the comic the dome comes from
   pt     poster tint
   ============================================================ */
var DOMES = [
{n:1, id:'doomstadt', tier:'locked', t:'Doomstadt', alt:'Capital of Battleworld · Castle Doom', baron:'God Emperor Doom', src:'Secret Wars (2015)', pt:'#2f7a4a',
 what:'The seat of creation. Castle Doom sits at the exact centre of the planet, and every road on Battleworld eventually points at it. Here, Doom’s word is not law — it is physics. He does not enforce reality; he is reality.',
 mcu:'Robert Downey Jr.’s Doom is the whole architecture of these two films. If Battleworld exists at all, this dome exists. It is the only entry on this page that is effectively guaranteed.'},
{n:2, id:'shield', tier:'locked', t:'The Shield', alt:'also called the Wall', baron:'The Thor Corps garrison', src:'Secret Wars (2015)', pt:'#5a6472',
 what:'A hundred-mile-high wall of stone and steel running the whole southern rim of the planet. Behind it Doom penned the three things he could not kill. Serving on the Shield is a death sentence that Battleworld has agreed to call an honour.',
 mcu:'Loki already gave the MCU a purge-zone at the end of everything — the Void, patrolled by Alioth. The Shield is that idea with a garrison and a budget, and it gives a two-film story a map with an edge on it.'},
{n:3, id:'manhattan', tier:'locked', t:'Manhattan', alt:'the last slice of the prime reality', baron:'Doom’s hand-picked stewards', src:'Secret Wars (2015)', pt:'#b0452e',
 what:'The dome closest to “normal.” Built from the last surviving slice of the prime reality, it is the only place on Battleworld where the streets look like the ones the audience knows — which makes it the most disorienting dome of all.',
 mcu:'This is where you, the viewer, stand. The entire eighteen-year MCU becomes one dome out of forty-one. That demotion is not a side effect of Secret Wars; it is the thesis.'},
{n:4, id:'perfection', tier:'strong', t:'Perfection', alt:'behind the Shield', baron:'Ultron', src:'Age of Ultron vs. Marvel Zombies (2015)', pt:'#9a1f2a',
 what:'A silent, spotless, endlessly self-replicating dome of Ultron drones. There is no population, no economy, no war — just a machine that finished its argument and kept building. Doom walled it off rather than fight it, which tells you what he thinks his odds were.',
 mcu:'The strongest case on this page. VisionQuest put Ultron back on the board in October 2026, weeks before Doomsday, and has been reported to feed into Secret Wars rather than the film in front of it. Of every dome here, this is the one Marvel is visibly manufacturing parts for.'},
{n:5, id:'deadlands', tier:'strong', t:'The Deadlands', alt:'behind the Shield', baron:'none — the dead do not govern', src:'Marvel Zombies (2015)', pt:'#4a5a2a',
 what:'An endless walking famine of infected heroes, sealed behind the wall. Nothing gets out. Occasionally, at great cost, something gets in. It is the only dome on Battleworld with no ruler, because there is nothing left to rule.',
 mcu:'Marvel Zombies (2025) already exists as canon-adjacent animation, performed well, and ended on a cliffhanger Marvel has never resolved on screen. A dome is the cleanest way to cash that cheque without committing to a film.'},
{n:6, id:'newxandar', tier:'strong', t:'New Xandar', alt:'behind the Shield', baron:'Annihilus', src:'Secret Wars (2015)', pt:'#6a2d8f',
 what:'The third thing behind the wall: the Annihilation Wave, contained but never beaten. A whole cosmic invasion reduced to a locked room, because Doom’s solution to an unwinnable war is a door.',
 mcu:'Xandar was destroyed off-screen by Thanos before Infinity War even started — a loss the MCU has never dramatised. Battleworld is where the MCU gets to un-destroy things it never got to show dying.'},
{n:7, id:'technopolis', tier:'strong', t:'Technopolis', alt:'the armoured city', baron:'Tony Stark', src:'Armor Wars (2015)', pt:'#c8912a',
 what:'A city under a permanent airborne plague. Take your armour off and you are dead in minutes, so nobody ever does — not to eat, not to sleep, not to be buried. Stark rules it and Rhodes polices it, both sealed in metal for life.',
 mcu:'Armor Wars has been on Marvel’s slate for years without landing. Technopolis is where that idea finally has somewhere to go — and it puts an Iron Man back on screen without touching Endgame’s ending.'},
{n:8, id:'warzone', tier:'strong', t:'The Warzone', alt:'Civil War, permanent', baron:'two — Rogers and Stark, at war', src:'Civil War (2015)', pt:'#1f4e8c',
 what:'The Civil War that never got a reconciliation. Half the dome flies the shield, half flies the reactor, the border is a trench, and neither side can remember why surrender was ever an option.',
 mcu:'Steve and Tony’s split is the emotional spine of the Infinity Saga, and Battleworld lets the Russos — the directors of Civil War — re-stage it without resurrecting anyone.'},
{n:9, id:'wastelands', tier:'strong', t:'The Wastelands', alt:'Old Man Logan country', baron:'none', src:'Old Man Logan (2015)', pt:'#8a5a1f',
 what:'America fifty years after the villains simply won and then got bored. A blinded, retired Logan hauls cargo across it for people who do not know what he used to be. The quietest dome, and the saddest.',
 mcu:'The Fox universe is confirmed on the board for Doomsday, and this is its darkest corner — the one place where a Wolverine can appear without contradicting anything.'},
{n:10, id:'westchester', tier:'strong', t:'Westchester', alt:'Years of Future Past', baron:'the mansion’s keepers', src:'Years of Future Past (2015)', pt:'#3f4a8f',
 what:'The mansion and the school, intact and immaculate — with internment camps for mutants a short drive outside the fence. A dome built on the gap between what a place says it is and what it permits.',
 mcu:'Every Fox X-Men actor Marvel has announced for Doomsday belongs to this era. Westchester is the address they all share.'},
{n:11, id:'sentinel', tier:'strong', t:'Sentinel Territories', alt:'the machine belt', baron:'the machines', src:'Secret Wars (2015)', pt:'#7a3fb5',
 what:'No baron, no citizens, no buildings. A killing field of Sentinels laid between the mutant domes so that none of them can reach each other. Doom’s cheapest and most effective border policy.',
 mcu:'Days of Future Past is on the rewatch list for a reason: the Sentinel future is the single most recognisable image the Fox films produced.'},
{n:12, id:'apocalypse', tier:'strong', t:'Domain of Apocalypse', alt:'Age of Apocalypse', baron:'En Sabah Nur', src:'Age of Apocalypse (2015)', pt:'#5a1f6b',
 what:'North America run as an experiment in survival of the fittest, with the experiment’s designer sitting on the throne. Everyone alive here is alive because they were useful this morning.',
 mcu:'Apocalypse is the Fox era’s biggest unfinished idea — a villain the films never really landed. A dome gives him a second first impression.'},
{n:13, id:'monarchyofm', tier:'strong', t:'The Monarchy of M', alt:'House of M', baron:'Magneto', src:'House of M (2015)', pt:'#a8253a',
 what:'A world where mutants won cleanly and humans are the minority, ruled by the House of Magnus by simple hereditary right. It is not a dystopia from the inside — that is what makes it dangerous.',
 mcu:'Ian McKellen’s Magneto is on the announced Doomsday roster, and Wanda’s whole arc — WandaVision, Multiverse of Madness — is House of M in everything but the title card.'},
{n:14, id:'mutopia', tier:'strong', t:'Mutopia', alt:'X-Men ’92', baron:'Charles Xavier', src:'X-Men ’92 (2015)', pt:'#d4a017',
 what:'A brighter, louder, primary-coloured mutant world where the nineties never ended and the team still strikes a group pose before a fight. Played straight, not as parody — which is exactly why it lands.',
 mcu:'X-Men ’97 is the most acclaimed thing Marvel has made in years and it is stranded in its own continuity. A dome is a door.'},
{n:15, id:'arcadia', tier:'strong', t:'Arcadia', alt:'home of the A-Force', baron:'She-Hulk', src:'A-Force (2015)', pt:'#1e7a8c',
 what:'A coastal domain governed entirely by women and defended by the A-Force, patrolled from the sea by a Namora who takes the job seriously. One of the few domes that is genuinely well run.',
 mcu:'The A-Force shot in Endgame was a promise the MCU has never paid off. Arcadia is where the bill comes due — and Namora is already on the Doomsday roster.'},
{n:16, id:'greenland', tier:'strong', t:'Greenland', alt:'the Hulk jungle', baron:'King Hulk', src:'Planet Hulk (2015)', pt:'#3f9a4f',
 what:'A sealed jungle domain populated entirely by Hulks, off-limits to everyone including Doom’s own enforcers. The one dome where Doom’s writ is genuinely thin, and he has decided he can live with that.',
 mcu:'Brand New Day put Hulk back on the big screen, Skaar is in play from She-Hulk, and Red Hulk exists after Brave New World. Marvel has quietly assembled a cast for this dome without ever announcing one.'},
{n:17, id:'spiderisland', tier:'strong', t:'Spider-Island', alt:'Manhattan, overrun', baron:'the Queen', src:'Spider-Island (2015)', pt:'#b0202b',
 what:'Manhattan, overrun. Everybody in the dome has the powers, which means nobody does — and the thing that infected them is still down there deciding who gets to keep their mind.',
 mcu:'No Way Home already assembled three Spider-Men and Brand New Day keeps the door open. Sony’s corner is the most crossover-tested real estate Marvel has.'},
{n:18, id:'agamotto', tier:'strong', t:'The Isle of Agamotto', alt:'seat of the Sheriff', baron:'Doctor Strange, Sheriff of Agamotto', src:'Secret Wars (2015)', pt:'#2a6b8f',
 what:'A small island a short flight from Doomstadt. Strange is Doom’s law-keeper and the only man on the planet permitted to remember what came before — a privilege that is really a leash. He keeps survivors hidden in the cellar anyway.',
 mcu:'Strange is the MCU’s designated multiverse-breaker and the character best placed to be Doom’s reluctant enforcer. He is also the only one with a plausible reason to keep his memory.'},
{n:19, id:'egyptia', tier:'wild', t:'Egyptia', alt:'the god-ruled dynasty', baron:'the pantheon', src:'Secret Wars (2015)', pt:'#a8862a',
 what:'Egypt as an unbroken dynasty of living gods, where the afterlife is a government department and the rulers walk around in daylight collecting on it.',
 mcu:'Moon Knight left Khonshu, Marc, Steven and Jake completely unresolved and Marvel has said nothing since. A dome is a low-commitment way to bring all four back at once.'},
{n:20, id:'kunlun', tier:'wild', t:'K’un-Lun', alt:'a Capital City of Heaven', baron:'the Immortal Weapons', src:'Master of Kung Fu (2015)', pt:'#b03a2e',
 what:'A hidden mountain city that only touches the world once a decade, run by champions who fight a tournament to decide whose turn it is. Extremely fond of rules.',
 mcu:'Shang-Chi already gave the MCU its version — Ta Lo and the Ten Rings — and Danny Rand is reported to return in Born Again Season 3. Two roads, one dome.'},
{n:21, id:'weirdworld', tier:'wild', t:'Weirdworld', alt:'the lost and found', baron:'Morgan le Fay', src:'Weirdworld (2015)', pt:'#4f8f6a',
 what:'Battleworld’s lost property office. Everything that fell through the cracks of creation — half-finished continents, characters nobody claimed, geography that will not hold still — washes up here.',
 mcu:'A dome-shaped excuse to put anything on screen for ninety seconds. Ghost Rider, Blade, Werewolf by Night, Man-Thing, the Midnight Sons: all of them fit here and nowhere else.'},
{n:22, id:'barsinister', tier:'wild', t:'Bar Sinister', alt:'the clone domain', baron:'Mister Sinister', src:'Secret Wars (2015)', pt:'#7a1f4b',
 what:'A domain populated by nothing but Sinister’s own clones, each spliced with a different mutant’s genome, all of them agreeing with him. A dome that is really one man’s ego with a postcode.',
 mcu:'Sinister has been teased since X-Men: Apocalypse’s stinger in 2016 and never delivered. Ten years of setup and no payoff is exactly the debt Battleworld exists to settle.'}
];

/* Titles with no portrait poster in existence: Wikipedia uses a wordmark for
   TV series. These get a composed one-sheet — the official logo on a themed
   field, filling the tile. */
var COMPOSED={
  'visionquest':'#8a1f2a',
  'bornagain3':'#6d0b12',
  'xmen97s3':'#d4a017',
  'xmen97':'#c8901a',
  'btsv':'#d62b70',
  'loki1':'#1f7a42',
  'loki2':'#16713a',
  'wandavision':'#a51d2a',
  'whatif1':'#7a3fb5',
  'marvelzombies':'#5a1f1f',
  'shehulk':'#3f9a4f',
  'moonknight':'#8e93a8'
};

/* Poster art, hotlinked from the Wikipedia article for each title.
   Every URL was checked to serve a real image at build time. A title whose
   image fails to load falls back to a generated card. */
var POSTERS={
  'brandnewday':'https://upload.wikimedia.org/wikipedia/en/9/9a/Spider-Man_Brand_New_Day_poster.jpg',
  'visionquest':'https://upload.wikimedia.org/wikipedia/en/d/d5/VisionQuest_logo.jpg',
  'endgameencore':'https://upload.wikimedia.org/wikipedia/en/0/0d/Avengers_Endgame_poster.jpg',
  'doomsday':'https://upload.wikimedia.org/wikipedia/en/e/ee/Avengers_Doomsday_poster.jpg',
  'bornagain3':'https://upload.wikimedia.org/wikipedia/en/d/d9/Daredevil_Born_Again_logo.jpeg',
  'xmen97s3':'https://upload.wikimedia.org/wikipedia/commons/6/6a/X-Men_%2797_logo.png',
  'btsv':'https://upload.wikimedia.org/wikipedia/en/a/a0/Spider-Man_Beyond_the_Spider-Verse_logo.jpg',
  'sw2015':'https://upload.wikimedia.org/wikipedia/en/3/33/Secret_Wars.jpg',
  'sw1984':'https://upload.wikimedia.org/wikipedia/en/0/08/Secretwars1.png',
  'endgame':'https://upload.wikimedia.org/wikipedia/en/0/0d/Avengers_Endgame_poster.jpg',
  'loki2':'https://upload.wikimedia.org/wikipedia/en/4/4e/Loki_%28TV_series%29_logo.png',
  'mom':'https://upload.wikimedia.org/wikipedia/en/1/17/Doctor_Strange_in_the_Multiverse_of_Madness_poster.jpg',
  'ff4':'https://upload.wikimedia.org/wikipedia/en/1/13/The_Fantastic_Four_First_Steps_poster.jpg',
  'dpw':'https://upload.wikimedia.org/wikipedia/en/4/4c/Deadpool_%26_Wolverine_poster.jpg',
  'nowayhome':'https://upload.wikimedia.org/wikipedia/en/0/00/Spider-Man_No_Way_Home_poster.jpg',
  'ultron':'https://upload.wikimedia.org/wikipedia/en/f/ff/Avengers_Age_of_Ultron_poster.jpg',
  'civilwar':'https://upload.wikimedia.org/wikipedia/en/5/53/Captain_America_Civil_War_poster.jpg',
  'wandavision':'https://upload.wikimedia.org/wikipedia/en/2/20/WandaVision_logo.png',
  'logan':'https://upload.wikimedia.org/wikipedia/en/3/37/Logan_2017_poster.jpg',
  'xmen1':'https://upload.wikimedia.org/wikipedia/en/8/81/X-MenfilmPoster.jpg',
  'dofp':'https://upload.wikimedia.org/wikipedia/en/0/0c/X-Men_Days_of_Future_Past_poster.jpg',
  'whatif1':'https://upload.wikimedia.org/wikipedia/en/b/b6/What_If...%3F_%28TV_series%29_logo.png',
  'xmen97':'https://upload.wikimedia.org/wikipedia/commons/6/6a/X-Men_%2797_logo.png',
  'loki1':'https://upload.wikimedia.org/wikipedia/en/4/4e/Loki_%28TV_series%29_logo.png',
  'marvelzombies':'https://upload.wikimedia.org/wikipedia/en/1/1a/Marvel_Zombies_%28TV_series%29_logo.png',
  'apocalypse':'https://upload.wikimedia.org/wikipedia/en/0/04/X-Men_-_Apocalypse.jpg',
  'ragnarok':'https://upload.wikimedia.org/wikipedia/en/7/7d/Thor_Ragnarok_poster.jpg',
  'shehulk':'https://upload.wikimedia.org/wikipedia/en/3/32/She-Hulk_Attorney_at_Law_logo.jpg',
  'moonknight':'https://upload.wikimedia.org/wikipedia/en/a/a8/Moon_Knight_%28miniseries%29_logo.jpg',
  'shangchi':'https://upload.wikimedia.org/wikipedia/en/7/74/Shang-Chi_and_the_Legend_of_the_Ten_Rings_poster.jpeg',
  'werewolf':'https://upload.wikimedia.org/wikipedia/en/0/06/Werewolf_by_Night_%28TV_special%29_poster.jpg',
  'gotg':'https://upload.wikimedia.org/wikipedia/en/3/33/Guardians_of_the_Galaxy_%28film%29_poster.jpg'
};
