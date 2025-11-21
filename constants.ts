import { Person } from "./types";

export const PROFILES: Person[] = [
  {
    id: "rand",
    name: "RAND",
    age: 21,
    origin: "Syrie",
    yearsInFrance: 4,
    thumbnail: "/images/Rand.png",
    heroImage: "/images/Rand.png",
    quote: "Elle raconte sa vie",
    chatMessages: [
      {
        id: "1",
        sender: "me",
        text: "Je vais bien maman, ne t'inquiète pas",
        time: "Sat, Apr 2, 9:41",
      },
      {
        id: "2",
        sender: "them",
        text: "Es-tu dans un endroit sécurisé ?",
        time: "Yesterday 14:23",
      },
      {
        id: "3",
        sender: "them",
        text: "ALERTE : Explosion signalée à Damas. Restez à l'abri.",
        time: "Yesterday 14:45",
      },
      {
        id: "4",
        sender: "them",
        text: "Rand réponds-moi s'il te plaît, j'ai peur",
        time: "Yesterday 15:12",
      },
    ],
    story: [
      {
        type: "audio",
        title: "SA VIE AVANT L'EXIL",
        content:
          "Je me souviens des après-midis passés à jouer dehors, à rire avec mes amis dans les ruelles de notre quartier. Malgré tout ce qui se passait autour, ces moments restent ancrés en moi, comme une lumière d'innocence et de bonheur avant que tout ne bascule.",
        audioSrc: "/audio/enregistrement.mp3",
        image: "/images/friends.png",
        alignment: "right",
      },
      {
        type: "carousel",
        title: "ALBUM SOUVENIR",
        content:
          "Ces images capturent des moments de ma vie aujourd'hui. Chaque photo raconte une partie de mon parcours, de qui je suis devenu.",
        gallery: ["/images/me1.png", "/images/me2.png", "/images/me3.png"],
        alignment: "left",
      },
    ],
  },
  {
    id: "luis",
    name: "LUIS",
    age: 23,
    origin: "Colombie",
    yearsInFrance: 2,
    thumbnail: "/images/luis.png",
    heroImage: "/images/luis.png",
    quote: "Le désert ne pardonne pas",
    chatMessages: [
      {
        id: "1",
        sender: "them",
        text: "Le camion part à minuit précises.",
        time: "Mon 10:00",
      },
      {
        id: "2",
        sender: "me",
        text: "J'ai l'argent. Je serai là.",
        time: "Mon 10:05",
      },
      {
        id: "3",
        sender: "them",
        text: "Prends seulement de l'eau. Rien d'autre.",
        time: "Mon 10:06",
      },
      {
        id: "4",
        sender: "them",
        text: "Fais attention frère.",
        time: "Mon 23:45",
      },
    ],
    story: [
      {
        type: "audio",
        title: "LE DÉPART",
        content:
          "Écoutez Omar décrire le silence de Khartoum au moment de son départ.",
        audioSrc:
          "https://actions.google.com/sounds/v1/ambiences/wind_trough_trees.ogg",
        image: "https://picsum.photos/id/195/600/800",
        alignment: "right",
      },
      {
        type: "quote",
        title: "L'ESPOIR",
        content:
          "On nous avait promis l'Europe. On nous a donné le désert, la soif et la peur.",
        image: "https://picsum.photos/id/905/800/600",
        alignment: "left",
      },
      {
        type: "standard",
        title: "LA TRAVERSÉE",
        content:
          "Trois semaines à l'arrière d'un pick-up. Le sable s'infiltre partout, même dans les pensées. La seule chose qui nous fait tenir, c'est l'idée qu'ailleurs, la vie est possible.",
        image: "https://picsum.photos/id/548/800/800",
        alignment: "left",
      },
      {
        type: "carousel",
        title: "SOUVENIRS DE BOGOTA",
        content:
          "Quelques fragments d'une vie laissée derrière. Les couleurs de la ville manquent, mais la sécurité n'a pas de prix.",
        gallery: [
          "https://picsum.photos/id/1015/800/1000",
          "https://picsum.photos/id/1016/800/1000",
          "https://picsum.photos/id/1018/800/1000",
        ],
        alignment: "right",
      },
    ],
  },
  {
    id: "issiaga",
    name: "ISSIAGA",
    age: 26,
    origin: "Guinée",
    yearsInFrance: 1,
    thumbnail: "/images/Issiaga.png",
    heroImage: "/images/Issiaga.png",
    quote: "L'espoir de rentrer un jour",
    chatMessages: [
      {
        id: "1",
        sender: "them",
        text: "Les sirènes sonnent encore.",
        time: "Tue 08:30",
      },
      {
        id: "2",
        sender: "me",
        text: "Descendez au sous-sol ! Vite !",
        time: "Tue 08:31",
      },
      {
        id: "3",
        sender: "them",
        text: "Le train pour la Pologne est plein.",
        time: "Tue 14:15",
      },
      {
        id: "4",
        sender: "me",
        text: "Essaie le prochain. Ne lâche pas la main de Léa.",
        time: "Tue 14:16",
      },
    ],
    story: [
      {
        type: "standard",
        title: "UN MATIN COMME LES AUTRES",
        content:
          "Le 24 février, le réveil n'a pas sonné. C'est le bruit sourd des explosions au loin qui a réveillé Sarah. En une heure, sa vie d'architecte s'est effondrée.",
        image: "https://picsum.photos/id/235/600/800",
        alignment: "right",
      },
      {
        type: "carousel",
        title: "LA GARE",
        content:
          "Je n'ai jamais vu autant de monde silencieux. Des milliers de regards perdus, une seule direction : l'Ouest.",
        gallery: [
          "https://picsum.photos/id/402/800/1000",
          "https://picsum.photos/id/410/800/1000",
          "https://picsum.photos/id/420/800/1000",
        ],
        alignment: "left",
      },
    ],
  },
  {
    id: "berti",
    name: "BERTI",
    age: 31,
    origin: "Chine",
    yearsInFrance: 3,
    thumbnail: "/images/berti.png",
    heroImage: "/images/berti.png",
    quote: "Apprendre une nouvelle langue",
    chatMessages: [
      {
        id: "1",
        sender: "them",
        text: "Ils fouillent les maisons du quartier.",
        time: "Fri 22:00",
      },
      { id: "2", sender: "them", text: "Cache tes livres.", time: "Fri 22:01" },
      {
        id: "3",
        sender: "me",
        text: "Je pars par la montagne cette nuit.",
        time: "Fri 23:30",
      },
      {
        id: "4",
        sender: "them",
        text: "Que Dieu te protège mon fils.",
        time: "Fri 23:32",
      },
    ],
    story: [
      {
        type: "standard",
        title: "L'ÉCOLE INTERDITE",
        content:
          "Youssef voulait être professeur. Quand ils ont fermé l'université, il a continué à étudier en secret, à la lueur d'une bougie, risquant sa vie pour des mots.",
        image: "https://picsum.photos/id/433/600/800",
        alignment: "right",
      },
      {
        type: "quote",
        title: "LA FUITE",
        content:
          "Il faut partir sans se retourner. Si tu te retournes, tu réalises ce que tu laisses, et tu n'avances plus.",
        image: "https://picsum.photos/id/534/800/600",
        alignment: "left",
      },
      {
        type: "standard",
        title: "LES MONTAGNES",
        content:
          "La marche a duré des semaines. À travers la neige, la faim au ventre, guidé par la seule étoile de la liberté.",
        image: "https://picsum.photos/id/619/800/800",
        alignment: "right",
      },
      {
        type: "carousel",
        title: "LA ROUTE DE LA SOIE",
        content:
          "Des paysages traversés, des visages croisés. Chaque photo est une étape d'un voyage qui a duré des mois.",
        gallery: [
          "https://picsum.photos/id/1020/800/1000",
          "https://picsum.photos/id/1021/800/1000",
          "https://picsum.photos/id/1022/800/1000",
        ],
        alignment: "left",
      },
    ],
  },
  {
    id: "anila",
    name: "ANILA",
    age: 26,
    origin: "Albanie",
    yearsInFrance: 5,
    thumbnail: "/images/Anila.png",
    heroImage: "/images/Anila.png",
    quote: "Reconstruire sa vie",
    chatMessages: [
      {
        id: "1",
        sender: "them",
        text: "As-tu vu la côte ?",
        time: "Wed 05:12",
      },
      {
        id: "2",
        sender: "me",
        text: "Juste de l'eau. Partout.",
        time: "Wed 05:14",
      },
      { id: "3", sender: "them", text: "Tiens bon.", time: "Wed 05:15" },
    ],
    story: [
      {
        type: "audio",
        title: "SERVICE INFINI",
        content:
          "Écoutez Elena parler de ses rêves d'enfance avant la conscription.",
        audioSrc:
          "https://actions.google.com/sounds/v1/ambiences/rain_heavy_loud.ogg",
        image: "https://picsum.photos/id/325/600/800",
        alignment: "right",
      },
      {
        type: "standard",
        title: "LA MÉDITERRANÉE",
        content:
          "La mer est à la fois un espoir et un tombeau. Cette nuit-là, les vagues étaient hautes, mais la peur de retourner en arrière était plus grande que celle de se noyer.",
        image: "https://picsum.photos/id/84/800/800",
        alignment: "left",
      },
      {
        type: "carousel",
        title: "MÉMOIRE D'ALBANIE",
        content:
          "Les montagnes, les fêtes de village, les visages familiers. Tout ce qui constitue l'identité qu'elle tente de préserver ici.",
        gallery: [
          "https://picsum.photos/id/1024/800/1000",
          "https://picsum.photos/id/1025/800/1000",
          "https://picsum.photos/id/1026/800/1000",
        ],
        alignment: "right",
      },
    ],
  },
];
