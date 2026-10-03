const SITE = {
  // Names and cover
  yourName: "Brix",
  eyebrow: "My Violet In The Sun",
  title: "Chloe",
  subtitle: "I made this just for you.",

  // Counter. Format YYYY-MM-DD. Set to null to hide the counter.
  startDate: "2026-03-03",

  // Background music (optional)
  music: "media/music/transform.mp3",

  // The story. Each entry is one "moment".
  //   type:   "photo" | "video" | "pair" | "gallery"
  //   layout: "full" (big, text underneath) | "split" (media beside text)
  //   Pairs and galleries always use the full layout.
  moments: [
    {
      type: "photo",
      layout: "full",
      src: "media/photos/kiss-first-date.jpg",
      alt: "Our first date",
      title: "Our first date",
      text: "I remember that day at Rio St. Coffee, when you drew a\nveiny dick on my arm. I already knew you were someone special"
    },
    {
      type: "video",
      layout: "split",
      src: "media/videos/beach.mp4",
      title: "Your laugh",
      text: "I would do anything just to hear your precious laugh"
    },
    {
      type: "pair",
      items: [
        { type: "photo", src: "media/photos/trip-1.jpg", alt: "Trip" },
        { type: "photo", src: "media/photos/trip-22.jpg", alt: "Trip" }
      ],
      text: "I can never get enough of you"
    },

    // NEW: a gallery inside the story
    {
      type: "gallery",
      title: "You Are Beautiful",
      items: [
        { src: "media/photos/beautiful-1.jpg", caption: "You look like an angel" },
        { src: "media/photos/beautiful-2.jpg", caption: "You are blessing on existence itself" },
        { src: "media/photos/beautiful-3.jpg", caption: "Aura" },
        { src: "media/videos/beautiful-4.mp4", caption: "I will grovel at your feet and do everything you ask of me" },
        { src: "media/photos/beautiful-5.jpg", caption: "You're perfect" },
        { src: "media/photos/beautiful-7.jpg", caption: "My Love" },
      ],
      text: ""
    },

    {
      type: "photo",
      layout: "full",
      src: "media/photos/proud.jpg",
      alt: "Proud of you",
      title: "I'm proud of you",
      text: "I have so much admiration for you"
    },
    {
      type: "pair",
      items: [
        { type: "photo", src: "media/photos/thing-1.jpg", alt: "Us" },
        { type: "photo", src: "media/photos/thing-2.jpg", alt: "Us" }
      ],
      text: "Every thing you do means so much to me"
    },
    {
      type: "photo",
      layout: "full",
      src: "media/photos/special-day.jpg",
      alt: "Us",
      title: "I Love You"
    },
    {
      type: "photo",
      layout: "split",
      src: "media/photos/portrait.jpg",
      alt: "You",
      date: "Always",
      title: "Just you"
    }
  ],

  // Bottom gallery: photos and videos, as many as you like.
  galleryTitle: "Our moments",
  gallery: [
    { src: "media/videos/balls.mp4", caption: "We look so good together" },
    { src: "media/photos/just-you.jpg", caption: "You're fun wherever you are" },
    { src: "media/photos/eyes.jpg", caption: "" },
    { src: "media/photos/debut.jpg", caption: "Just look at us?? We're meant to be" },
    { src: "media/videos/exposed.mp4", caption: "..." },
    { src: "media/photos/one-only.jpg", caption: "" },
    { src: "media/photos/mc.jpg", caption: "Pogi mo idol" },
    { src: "media/videos/makeup.mp4", caption: "Keep customizing me" },
    { src: "media/photos/screenshot.jpg", caption: "I'm happiest when I'm with you" },
  ],

  // 100 reasons list (numbers are added automatically)
  reasonsTitle: "100 reasons why I love you",
  reasons: [
    "I love Your brown eyes",
    "I love Your hair",
    "I love Your 15 laugh variations",
    "I love that smirk you have when You roast me",
    "I love that You’re interested in so many different things",
    "I love how You pay attention to every word I say",
    "I love Your cute gestures",
    "I love how You are with cats",
    "I love how You make sure Im never left out",
    "I love Your voice",
    "I love how ambitious You are",
    "I love how smart You are",
    "I love how sleepy You get sometimes",
    "I love Your height its just perfect",
    "I love those lil dances You do",
    "I love how easy it is to love You",
    "I love that You’re literally the funniest person",
    "I love how You just be doing shi",
    "I love how soft Your voice sounds when You’re about to fall asleep",
    "I love how gentle You are",
    "I love the fact You were terminally online like me",
    "I love how much fun you are when alcohol is involved",
    "I love how I can be quiet around You",
    "I love how soft Your lips feel",
    "I love the smell of Your hair",
    "I love the way You look at me",
    "I love how You make me feel safe",
    "I love Your weekly fixations",
    "I love that You’re obsessed with pokemons",
    "I love how light it feels to be with You",
    "I love Your fingers they’re quite cute",
    "I love Your cheeks and how soft they are",
    "I love those noises You make unprompted",
    "I love that you allow me to grow",
    "I love you so much for being able to apologize. It means so much to me",
    "I love how witty You are",
    "I love that You are someone I can fully believe in",
    "I love that You inspire me to do better",
    "I love Your honesty",
    "I love you for how passionate you can be",
    "I love that I have so much to admire about You",
    "I love that ",
    "I love that You have integrity",
    "I love Your taste in food",
    "I love the look You have when You're focusing",
    "I love it when You lean your head on my shoulder",
    "I love that You love having Your hand in mine",
    "I love Your pretty face so much",
    "I love that distance can't get in the way of us",
    "I love Your straightforwardness",
    "I love Your expression when You realize something",
    "I love Your song choices",
    "I love how You can be the most energetic person in the room",
    "I love that You can bring people together",
    "I love how You can get along with just about anyone",
    "I love Your niche internet fixations",
    "I love that we both grew up on TAWOG",
    "I love that You have Brandon Roger's humor",
    "I love that I agree with You on so many things",
    "I love that You want us to be both on the same page",
    "I love that even if we didn't agree on things, You would still try to hear me out",
    "I love how sweet You are when You're sleepy",
    "I love how soft Your skin is",
    "I love how we can bond over just about anything",
    "I love that You know me so well already",
    "I love that You have a certain way of assuring me",
    "I love how comfortable You are with me",
    "I love that You’re comfortable enough with me to show a side of You most people won’t ever know about",
    "I love that You’ll always think of a way to be with me as much as You can",
    "I love it when you pat the seat next to You so that I move in closer to You",
    "I love that I can be whomever i am with You",
    "I love how calming it is just talking to you",
    "I love that You want to build Your future with me",
    "I love it when You maximize the custard in proportion to the Italian ice at Rita’s",
    "I love You for that time we fought over your eyeliner at IlaoIlao",
    "I love You for staying with me through the hard times",
    "I love You for being able to make me smile during my lowest",
    "I love You so much for being there for me always",
    "I love You for being able to crack the walls I’ve built around me",
    "I love that You for being happy with me always",
    "I love it when You call me when You’re on Your way home",
    "I love how You compliment me",
    "I love You for always believing in me",
    "I love You because I know that I can build a future with You",
    "I love You because You have faith in me",
    "I love You because for once I believe I have someone that can see me",
    "I love You for taking me as I am",
    "I love You for always bringing so much joy to my life",
    "I love how much You laugh",
    "I love for tolerating all the cringy and corny things I say",
    "I love You for making me feel the warmth of Your love",
    "I love Your rants",
    "I love You for always spoiling me",
    "I love You for all those precious moment’s we’ve had",
    "I love Your music taste that’s just as random as mine",
    "I love that You let me scratch your head until you fall asleep",
    "I love You for making me care again",
    "I love You bringing so much life into mine",
    "I love You because You’re the one",
    "I Love You, Chloe, for being everything I have ever wished and hoped for. I will remind You of that fact every day. From now, until the day I take my final breath, I will speak of my love for You. "
    // ...keep going up to 100. Every line needs a comma after it except the last one.
  ],

  // Final letter. Each string is one paragraph; \n makes a line break.
  letter: {
    title: "I will always love you, Chloe",
    paragraphs: [
      "There is not a moment in my life that I don't think of my love for you",
      "I will always choose you, Chloe",
      "I love you"
    ],
    signoff: "Yours Forever,"
  }
};