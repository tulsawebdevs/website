import type { Proposal } from '../../../../types/proposal';
import type { VotePayload } from '../types';

/**
 * @todo switch to the real API once it's ready.
 */
export async function getProposals(cursor?: string): Promise<{
  cursor?: string;
  proposals: Proposal[];
}> {
  // const url = 'https://vote.tulsawebdevs.org/proposals';

  // if (cursor) {
  //   url += `?cursor=${cursor}`;
  // }

  // const response = await fetch(url);

  return simulateFetchProposals(cursor);
}

async function simulateFetchProposals(cursor?: string): Promise<{
  cursor?: string;
  proposals: Proposal[];
}> {
  const proposalsData: Proposal[] = [
    {
      title: 'profession',
      summary:
        'Circumvenio curto calamitas studio ipsa super super deprecator.',
      description:
        'Termes vomer cunctatio stillicidium nisi denique. Cruciamentum cui conicio quis. Commodo decens caries adulatio sub cubicularis paens taceo.',
      type: 'project',
      status: 'draft',
      id: 1,
      created: '2023-11-20T01:27:17.745Z',
      updated: '2024-04-28T13:53:48.797Z',
      authorId: '18b86a4d-7bb9-45b6-85a5-5334fac1c606',
      authorName: 'Jeremy.Kautzer88',
      authorEmail: 'Neoma50@yahoo.com',
    },
    {
      title: 'inspiration',
      summary: 'Minus ancilla cognatus comes derideo cuppedia statua.',
      description:
        'Veritatis casso amitto denuncio deputo voro candidus earum debilito. Tantillus animi denique trepide thema pax cimentarius. Damnatio conicio absque cognomen confugo cur strenuus.',
      type: 'project',
      status: 'closed',
      id: 2,
      created: '2023-06-14T05:06:21.549Z',
      updated: '2024-04-28T11:40:49.673Z',
      authorId: '87a49d94-a8d2-415c-8e32-379318e2aebf',
      authorName: 'Jasmin_Hagenes',
      authorEmail: 'Dylan31@gmail.com',
    },
    {
      title: 'lifetime',
      summary: 'Verbera iste blanditiis creta conventus vespillo umbra turba.',
      description:
        'Contabesco crudelis adimpleo campana cogo crastinus cubicularis inflammatio. Iusto vulnero abeo constans reprehenderit tempus adsuesco optio. Stultus utique arcus.',
      type: 'topic',
      status: 'rfc',
      id: 3,
      created: '2023-07-25T08:15:47.390Z',
      updated: '2024-04-28T12:19:37.946Z',
      authorId: '55d80a81-32e5-47a3-8d48-dd86a5c5d26d',
      authorName: 'Eula_Lueilwitz',
      authorEmail: 'Jovany65@yahoo.com',
    },
    {
      title: 'thumb',
      summary: 'Beatus hic clarus deduco eius.',
      description:
        'Veniam clementia vorago magnam causa. Magni eaque timor consequuntur cruentus recusandae suus uterque. Aspicio paulatim votum uredo.',
      type: 'topic',
      status: 'closed',
      id: 4,
      created: '2023-07-02T04:33:03.399Z',
      updated: '2024-04-28T16:12:10.530Z',
      authorId: '1603e7e8-3104-4de3-b907-1c7b806b4d62',
      authorName: 'Oscar99',
      authorEmail: 'Gus.Dickens@yahoo.com',
    },
    {
      title: 'tankful',
      summary: 'Subito culpa decerno attollo debitis adiuvo teneo.',
      description:
        'Maxime cena ago uxor nostrum nulla tot. Conduco astrum vestigium adstringo tandem aro. Confido tantillus decet ager stella unde basium.',
      type: 'project',
      status: 'open',
      id: 5,
      created: '2023-06-01T15:37:56.000Z',
      updated: '2024-04-27T19:55:14.233Z',
      authorId: '21172b61-6d86-4173-87c5-7ecd0a87e996',
      authorName: 'Edwardo_Gislason',
      authorEmail: 'Rita.Medhurst@hotmail.com',
    },
    {
      title: 'antelope',
      summary:
        'Tamdiu cruciamentum demergo subvenio animus vociferor illo alioqui.',
      description:
        'Adsum solitudo odio. Tantillus tenus dolorem natus verumtamen ambulo cognomen subseco depromo solvo. Admiratio commodo textor auditor earum cogo cursim coniecto tertius spoliatio.',
      type: 'topic',
      status: 'draft',
      id: 6,
      created: '2023-11-05T04:19:03.511Z',
      updated: '2024-04-27T22:44:57.897Z',
      authorId: '295adb28-61f7-432e-8ae8-1a75875d0231',
      authorName: 'Isabella89',
      authorEmail: 'Alphonso_Gutkowski@yahoo.com',
    },
    {
      title: 'sky',
      summary: 'Eum quidem iste abscido angulus deorsum terreo.',
      description:
        'Dapifer corrupti aetas alo attonbitus deinde eligendi vix demum congregatio. Thermae alveus thermae patior bellicus. Decipio peccatus sumo cogo.',
      type: 'topic',
      status: 'closed',
      id: 7,
      created: '2024-02-19T00:53:12.573Z',
      updated: '2024-04-28T04:08:22.114Z',
      authorId: 'fbaadf0e-4086-419f-9239-553f193a46ab',
      authorName: 'Greta_Runolfsson36',
      authorEmail: 'Kaden_Crooks@gmail.com',
    },
    {
      title: 'hostess',
      summary: 'Clibanus ratione cruentus acquiro tum.',
      description:
        'Soleo acceptus viriliter antepono demoror tergiversatio utroque adipisci textor sum. Volup tempus ut traho sulum. Vitae voluptatem curtus spero uterque.',
      type: 'project',
      status: 'rfc',
      id: 8,
      created: '2023-11-13T00:02:19.704Z',
      updated: '2024-04-27T19:47:37.006Z',
      authorId: '12ffad1d-21d9-4408-ab10-91535ea558b9',
      authorName: 'Dangelo.Marquardt-Grady',
      authorEmail: 'Ari.Toy@gmail.com',
    },
    {
      title: 'truth',
      summary: 'Ocer a vinum valetudo iure conforto.',
      description:
        'Quos abduco comptus denique valetudo vestigium suspendo. Alius admoveo suffoco cum. Corroboro harum umquam voluptates acquiro delinquo verumtamen adflicto stabilis dolores.',
      type: 'project',
      status: 'open',
      id: 9,
      created: '2023-09-20T00:09:11.498Z',
      updated: '2024-04-28T04:11:59.675Z',
      authorId: 'cd555e66-c656-431f-b7ea-54ae47345656',
      authorName: 'Olen95',
      authorEmail: 'Heloise51@yahoo.com',
    },
    {
      title: 'elm',
      summary: 'Arbustum concido aliquam id pax nisi convoco aequus.',
      description:
        'Spoliatio aureus suppellex spiculum ipsam bibo despecto. Agnitio talis nobis laborum quo. Ocer illo suppono suasoria ago.',
      type: 'project',
      status: 'closed',
      id: 10,
      created: '2023-09-29T19:03:36.207Z',
      updated: '2024-04-28T15:11:40.307Z',
      authorId: '31b8c732-d67d-4cc3-b252-f8a8c6b53876',
      authorName: 'Aletha.Becker8',
      authorEmail: 'Fabiola.Welch37@yahoo.com',
    },
    {
      title: 'distinction',
      summary:
        'Contra talis bene aegre curiositas suffragium blandior comitatus tutis.',
      description:
        'Defleo aro cibus bardus vicissitudo denuo comburo demulceo verbera aegre. Error suffragium trans. Curo decor nobis adfectus tantum adhaero.',
      type: 'topic',
      status: 'rfc',
      id: 11,
      created: '2023-11-10T17:23:11.518Z',
      updated: '2024-04-27T19:22:37.476Z',
      authorId: 'c9c529c3-72e5-45d4-a874-ef2da5cfdf16',
      authorName: 'Madisen.Jakubowski',
      authorEmail: 'Arnold13@gmail.com',
    },
    {
      title: 'gray',
      summary: 'Audacia acervus viriliter accommodo ambulo demergo quibusdam.',
      description:
        'Decimus valens curriculum coerceo corrigo vigilo ustilo odio cicuta. Accusator alo versus. Urbs temperantia charisma aptus eos corroboro amitto.',
      type: 'project',
      status: 'draft',
      id: 12,
      created: '2023-06-04T05:28:49.237Z',
      updated: '2024-04-27T22:00:31.423Z',
      authorId: '567a9f03-10a0-42be-8e67-7698dd7a336c',
      authorName: 'Brian_Cummerata98',
      authorEmail: 'Deshaun_Hyatt@gmail.com',
    },
    {
      title: 'dot',
      summary: 'Vulticulus venustas adhaero vitae sint ipsa adficio.',
      description:
        'Temporibus quam calculus comptus alii. Socius adopto synagoga. Spiritus facilis admoneo basium claustrum minima defendo viscus cito carpo.',
      type: 'project',
      status: 'open',
      id: 13,
      created: '2024-03-11T21:32:21.831Z',
      updated: '2024-04-28T05:37:33.606Z',
      authorId: '90f8e032-0cf5-4e4e-9669-b93261db2ced',
      authorName: 'Woodrow_Ryan91',
      authorEmail: 'Josephine_Schneider@hotmail.com',
    },
    {
      title: 'empire',
      summary:
        'Vomer cognomen turba conforto tergum pariatur spero decet terebro vicissitudo.',
      description:
        'Cubicularis tam demulceo ara provident. Cultellus capto vulgivagus tempore altus trans bos. Commodi quis arceo.',
      type: 'topic',
      status: 'rfc',
      id: 14,
      created: '2023-05-31T14:38:28.112Z',
      updated: '2024-04-27T23:24:21.644Z',
      authorId: 'c850efd9-d0ea-4664-b2b9-0b0a0318b8eb',
      authorName: 'Floyd_Schmeler-Kris',
      authorEmail: 'Connor56@gmail.com',
    },
    {
      title: 'mobility',
      summary: 'Cohors dolore ultio templum.',
      description:
        'Amo cohors totidem velum aspicio contego. Convoco creptio thymbra carpo baiulus sit vetus. Vado temporibus consuasor.',
      type: 'project',
      status: 'rfc',
      id: 15,
      created: '2023-06-14T02:21:07.484Z',
      updated: '2024-04-28T15:03:34.503Z',
      authorId: '8d042cc4-787d-45d4-aef5-6de9acd5d2fa',
      authorName: 'Cyrus60',
      authorEmail: 'Mike.Rau3@hotmail.com',
    },
    {
      title: 'lipoprotein',
      summary: 'Textor tabella carcer somnus delego vestrum dapifer tui.',
      description:
        'Suspendo animus patria est solitudo decumbo. Somnus solitudo inflammatio denuncio acsi decerno addo tergo. Abduco suffragium amitto vitiosus incidunt utor demulceo delibero.',
      type: 'topic',
      status: 'open',
      id: 16,
      created: '2023-05-22T02:19:04.125Z',
      updated: '2024-04-28T07:08:07.614Z',
      authorId: 'c356c1aa-8397-42fd-80e2-24cffef2cf6c',
      authorName: 'Kamren_Waters88',
      authorEmail: 'Kayla.Lueilwitz@yahoo.com',
    },
    {
      title: 'extreme',
      summary: 'Attero sordeo deleo.',
      description:
        'Celer earum conspergo ipsum. Strues degusto chirographum stillicidium curo condico laudantium vulnero conservo soluta. Autus articulus altus bos villa.',
      type: 'topic',
      status: 'closed',
      id: 17,
      created: '2024-03-21T18:24:18.336Z',
      updated: '2024-04-28T03:11:45.508Z',
      authorId: 'e073cc7e-3765-4e4f-a191-afdce2634abc',
      authorName: 'Ramiro87',
      authorEmail: 'Melba_Grady@gmail.com',
    },
    {
      title: 'walnut',
      summary: 'Solus vox numquam supra earum umquam.',
      description:
        'Deinde amiculum angustus abbas caecus viridis termes deserunt textor. Modi corona consequatur thymum iusto. Asperiores tepesco sui decet aufero tutamen.',
      type: 'topic',
      status: 'draft',
      id: 18,
      created: '2023-12-26T06:19:46.605Z',
      updated: '2024-04-28T06:33:38.651Z',
      authorId: '0764df2e-67c1-4836-a477-d51c77bd9f13',
      authorName: 'Leopoldo_Stamm',
      authorEmail: 'Effie.Reinger32@yahoo.com',
    },
    {
      title: 'swimsuit',
      summary: 'Adversus textus tabella appono vulgus correptius desino spero.',
      description:
        'Quo pariatur sono quia. Sordeo villa at undique. Succedo quas defetiscor adimpleo fuga stella magni autus canto acsi.',
      type: 'project',
      status: 'open',
      id: 19,
      created: '2023-06-28T15:02:37.894Z',
      updated: '2024-04-27T22:35:18.174Z',
      authorId: 'bd215a4b-54cf-4f40-8178-4b83c5e95eeb',
      authorName: 'Corine_Fritsch',
      authorEmail: 'Odessa.Mosciski-Bauch@hotmail.com',
    },
    {
      title: 'nonsense',
      summary: 'Temperantia congregatio fuga spiritus velit recusandae.',
      description:
        'Tubineus veritas aut tego conduco caritas doloribus creo arca cibus. Solus consequatur commodo thesis tego. Amplitudo perferendis terga tunc.',
      type: 'project',
      status: 'closed',
      id: 20,
      created: '2023-06-28T20:06:10.788Z',
      updated: '2024-04-28T04:03:03.241Z',
      authorId: '619f8afa-c688-42ce-9038-a0e73f35ddd2',
      authorName: 'Vita.Mante98',
      authorEmail: 'Robyn5@gmail.com',
    },
    {
      title: 'bureau',
      summary: 'Admoveo magni comptus templum verumtamen.',
      description:
        'Vinitor absconditus turba vigor articulus angulus curia vito. Agnosco basium bellum stillicidium. Depereo patior communis considero amaritudo dedecor impedit viridis.',
      type: 'topic',
      status: 'open',
      id: 21,
      created: '2023-12-08T00:06:30.730Z',
      updated: '2024-04-28T05:20:36.947Z',
      authorId: '4d6b8807-dde3-4834-85fc-61b0b56e36fc',
      authorName: 'Holly.Marvin29',
      authorEmail: 'Rhiannon.Hilll@gmail.com',
    },
    {
      title: 'grace',
      summary: 'Solitudo undique contabesco voluptatum.',
      description:
        'Ceno talis spero thesaurus aggredior vitium. Acer cur voluptas versus atavus color verus vilis. Desolo cinis conscendo nihil sit adaugeo.',
      type: 'topic',
      status: 'closed',
      id: 22,
      created: '2024-02-04T21:22:42.888Z',
      updated: '2024-04-28T17:47:13.476Z',
      authorId: '3bf979ca-7696-49ef-bfa3-3b043f776bc3',
      authorName: 'Saul52',
      authorEmail: 'Lauryn_Jakubowski@hotmail.com',
    },
    {
      title: 'octopus',
      summary:
        'Thorax sperno ciminatio voluntarius depopulo substantia cubo trado clementia.',
      description:
        'Pel speculum atrocitas. Confugo ambitus theatrum turbo totidem porro solio altus. Paens adipisci demulceo baiulus canis venustas accusantium omnis copiose vere.',
      type: 'project',
      status: 'rfc',
      id: 23,
      created: '2023-12-30T13:37:21.261Z',
      updated: '2024-04-28T13:55:13.352Z',
      authorId: '46c9c9b6-1f80-48eb-86ed-5265bfa9895e',
      authorName: 'Bethany_Stoltenberg8',
      authorEmail: 'Rosario19@yahoo.com',
    },
    {
      title: 'tension',
      summary:
        'Caecus thema ceno umquam autem ante volaticus alius amplexus sperno.',
      description:
        'Pecus vicissitudo creptio sordeo artificiose una depulso carcer. Sperno annus substantia usus. Earum usus comis suasoria super varius.',
      type: 'project',
      status: 'closed',
      id: 24,
      created: '2024-04-22T21:17:01.542Z',
      updated: '2024-04-28T05:37:15.087Z',
      authorId: '375720c8-d662-4516-b720-5f3646b0e640',
      authorName: 'Alexa_Hayes',
      authorEmail: 'Jadon81@hotmail.com',
    },
    {
      title: 'repository',
      summary:
        'Taceo vulnus tego brevis consequuntur spiritus consequuntur defungo.',
      description:
        'Summopere cubicularis curiositas suscipio eligendi nobis vilicus convoco dedico. Conforto angelus aut. Teneo defero fugiat vulgus tui convoco solitudo carus utor consequatur.',
      type: 'topic',
      status: 'rfc',
      id: 25,
      created: '2023-11-19T02:20:57.789Z',
      updated: '2024-04-28T02:48:40.675Z',
      authorId: '70dc56e6-8737-447d-85a7-76e82983a8f9',
      authorName: 'Agustin.Lebsack80',
      authorEmail: 'Pedro_Larkin48@yahoo.com',
    },
    {
      title: 'passing',
      summary: 'Custodia colligo creo.',
      description:
        'Sordeo comburo concido basium suggero clamo voro virtus. Aiunt corporis delectatio chirographum adsum iste fugit combibo arbustum tremo. Verto celo succurro studio talio conor cupiditate abeo.',
      type: 'topic',
      status: 'rfc',
      id: 26,
      created: '2023-06-25T19:44:03.934Z',
      updated: '2024-04-28T16:08:32.063Z',
      authorId: '8794aa97-0035-4377-99b1-cad5627c611e',
      authorName: 'Meghan.Krajcik61',
      authorEmail: 'Shawna61@yahoo.com',
    },
    {
      title: 'recording',
      summary: 'Deporto dedecor depopulo uterque sed consequuntur.',
      description:
        'Aedificium ulciscor decipio tribuo vulticulus cruentus crastinus terreo aurum. Adipisci cubitum assumenda vomito commodo aggero. Currus sono vinculum adicio supplanto video defaeco.',
      type: 'topic',
      status: 'rfc',
      id: 27,
      created: '2024-03-05T08:19:28.233Z',
      updated: '2024-04-28T18:05:55.232Z',
      authorId: '89a244a6-45eb-4ea1-8728-bd0bd354b706',
      authorName: 'Dillon.Harvey38',
      authorEmail: 'Jerad2@yahoo.com',
    },
    {
      title: 'pug',
      summary: 'Agnitio delibero cito creta vulgaris ara laborum.',
      description:
        'Tertius vox adduco. Agnosco decerno amo speciosus accendo coadunatio vesco debilito catena. Vulnus necessitatibus taceo dolor casso universe vulgaris trado ustilo.',
      type: 'topic',
      status: 'draft',
      id: 28,
      created: '2023-11-30T07:47:41.372Z',
      updated: '2024-04-28T13:39:36.033Z',
      authorId: 'ea81b9f1-33ef-4a76-9944-d732c860e0aa',
      authorName: 'Amy.Lebsack',
      authorEmail: 'Cierra20@yahoo.com',
    },
    {
      title: 'industrialisation',
      summary: 'Aptus vacuus antepono suscipit amissio pauper.',
      description:
        'Suffoco iste cito. Curo textor compono vita vespillo asporto vulpes appositus urbs. Talis universe valde tenetur asper labore.',
      type: 'project',
      status: 'draft',
      id: 29,
      created: '2023-08-17T21:04:43.992Z',
      updated: '2024-04-28T08:43:02.965Z',
      authorId: '1bc52059-ab2b-4a24-85c6-66e116180b09',
      authorName: 'Gunner_Walter',
      authorEmail: 'Wellington88@yahoo.com',
    },
    {
      title: 'testimonial',
      summary: 'Vulgaris desidero bos.',
      description:
        'Studio acer versus beatus accommodo vinco thermae spero alii tondeo. Cruciamentum perspiciatis denuo arx traho adflicto argentum tres talis apud. Vigor laborum alioqui colligo tum beatus.',
      type: 'topic',
      status: 'open',
      id: 30,
      created: '2023-06-15T04:56:46.662Z',
      updated: '2024-04-28T06:46:48.041Z',
      authorId: 'c8d374bc-540d-43d0-9154-780303a81811',
      authorName: 'Athena29',
      authorEmail: 'Bill.Bernhard@yahoo.com',
    },
  ];

  // eslint-disable-next-line
  await new Promise((resolve) => setTimeout(resolve, 3000));

  const responseData: { cursor?: string; proposals: Proposal[] } = {
    cursor: crypto.randomUUID(),
    proposals:
      cursor === undefined ?
        proposalsData.slice(0, 10)
      : proposalsData.slice(10, 20),
  };

  return Promise.resolve(responseData);
}

/**
 * @todo Replace with actual API call once it's ready.
 */
export async function voteForProposal(payload: VotePayload): Promise<void> {
  console.log('votePayload', payload);

  // fetch(`https://api.tulsawebdevs.org/proposals/${proposal.id}/vote`, {
  //   credentials: 'include',
  //   headers: {
  //     Authorization: '3fa85f64-5717-4562-b3fc-2c963f66afa6', // TODO: Add auth token
  //     'Content-Type': 'application/json',
  //   },
  //   method: 'POST',
  //   body: JSON.stringify(votePayload),
  // })
  //   .then((res) => res.json())
  //   .then((data) => {
  //     console.log('do something with data', data);
  //   })
  //   .catch((error) => {
  //     // TODO: Handle inability to cast vote
  //     console.error(error);
  //   });

  return simulateVoteForProposal();
}

async function simulateVoteForProposal(): Promise<void> {
  // eslint-disable-next-line
  await new Promise((resolve) => setTimeout(resolve, 500));

  return Promise.resolve();
}
