"use strict";

const mockedSpeciesList = {
  count: 807,
  next: "https://pokeapi.co/api/v2/pokemon-species/?offset=440&limit=10",
  previous: "https://pokeapi.co/api/v2/pokemon-species/?offset=420&limit=10",
  results: [
    { name: "glameow", url: "https://pokeapi.co/api/v2/pokemon-species/431/" },
    { name: "purugly", url: "https://pokeapi.co/api/v2/pokemon-species/432/" },
    {
      name: "chingling",
      url: "https://pokeapi.co/api/v2/pokemon-species/433/"
    },
    { name: "stunky", url: "https://pokeapi.co/api/v2/pokemon-species/434/" },
    { name: "skuntank", url: "https://pokeapi.co/api/v2/pokemon-species/435/" },
    { name: "bronzor", url: "https://pokeapi.co/api/v2/pokemon-species/436/" },
    { name: "bronzong", url: "https://pokeapi.co/api/v2/pokemon-species/437/" },
    { name: "bonsly", url: "https://pokeapi.co/api/v2/pokemon-species/438/" },
    { name: "mime-jr", url: "https://pokeapi.co/api/v2/pokemon-species/439/" },
    { name: "happiny", url: "https://pokeapi.co/api/v2/pokemon-species/440/" }
  ]
};

const mockedSpeciesListWithLimitOne = {
  count: 807,
  next: "https://pokeapi.co/api/v2/pokemon-species/?offset=1&limit=1",
  previous: null,
  results: [
    { name: "bulbasaur", url: "https://pokeapi.co/api/v2/pokemon-species/1/" }
  ]
};

const mockedSpeciesData = {
  base_happiness: 70,
  capture_rate: 120,
  color: { name: "gray", url: "https://pokeapi.co/api/v2/pokemon-color/4/" },
  egg_groups: [
    { name: "ground", url: "https://pokeapi.co/api/v2/egg-group/5/" }
  ],
  evolution_chain: { url: "https://pokeapi.co/api/v2/evolution-chain/260/" },
  evolves_from_species: {
    name: "lillipup",
    url: "https://pokeapi.co/api/v2/pokemon-species/506/"
  },
  flavor_text_entries: [
    {
      flavor_text:
        "黑色的体毛会随着成长\n而变得坚硬结实，\n连爪子和牙齿也不能轻易穿透。",
      language: {
        name: "zh-Hans",
        url: "https://pokeapi.co/api/v2/language/12/"
      },
      version: {
        name: "ultra-sun",
        url: "https://pokeapi.co/api/v2/version/29/"
      }
    },
    {
      flavor_text:
        "黒い　体毛は　育つほど\n硬く　丈夫に　なって　ツメや\nキバも　簡単には　通さないぞ。",
      language: { name: "ja", url: "https://pokeapi.co/api/v2/language/11/" },
      version: {
        name: "ultra-sun",
        url: "https://pokeapi.co/api/v2/version/29/"
      }
    },
    {
      flavor_text:
        "The longer its black fur grows, the harder and\nmore impervious it gets. Claws and fangs can’t\neasily penetrate it.",
      language: { name: "en", url: "https://pokeapi.co/api/v2/language/9/" },
      version: {
        name: "ultra-sun",
        url: "https://pokeapi.co/api/v2/version/29/"
      }
    },
    {
      flavor_text:
        "La pelliccia scura diventa più dura e resistente\ncon la crescita e lo difende dagli artigli e dalle\nzanne dei nemici.",
      language: { name: "it", url: "https://pokeapi.co/api/v2/language/8/" },
      version: {
        name: "ultra-sun",
        url: "https://pokeapi.co/api/v2/version/29/"
      }
    },
    {
      flavor_text:
        "Con el paso del tiempo, su oscuro pelaje se\nvuelve duro y resistente, lo que le sirve como\nligera protección contra colmillos y cuernos.",
      language: { name: "es", url: "https://pokeapi.co/api/v2/language/7/" },
      version: {
        name: "ultra-sun",
        url: "https://pokeapi.co/api/v2/version/29/"
      }
    },
    {
      flavor_text:
        "Mit zunehmendem Alter wird sein dunkles Fell\nimmer widerstandsfähiger, sodass selbst Klauen\nund Fangzähne es kaum durchdringen können.",
      language: { name: "de", url: "https://pokeapi.co/api/v2/language/6/" },
      version: {
        name: "ultra-sun",
        url: "https://pokeapi.co/api/v2/version/29/"
      }
    },
    {
      flavor_text:
        "Son pelage sombre devient si robuste au fil\ndu temps que même des crocs ou des griffes\npeinent à passer au travers.",
      language: { name: "fr", url: "https://pokeapi.co/api/v2/language/5/" },
      version: {
        name: "ultra-sun",
        url: "https://pokeapi.co/api/v2/version/29/"
      }
    },
    {
      flavor_text:
        "黑色的體毛會隨著成長\n變得越來越堅硬結實，\n連爪子和牙齒也無法輕易穿透。",
      language: {
        name: "zh-Hant",
        url: "https://pokeapi.co/api/v2/language/4/"
      },
      version: {
        name: "ultra-sun",
        url: "https://pokeapi.co/api/v2/version/29/"
      }
    },
    {
      flavor_text:
        "검은 털은 자랄수록\n딱딱하고 튼튼해져 발톱이나\n이빨로도 쉽게 뚫을 수 없다.",
      language: { name: "ko", url: "https://pokeapi.co/api/v2/language/3/" },
      version: {
        name: "ultra-sun",
        url: "https://pokeapi.co/api/v2/version/29/"
      }
    },
    {
      flavor_text:
        "くろい　たいもうは　そだつほど\nかたく　じょうぶに　なって　ツメや\nキバも　かんたんには　とおさないぞ。",
      language: {
        name: "ja-Hrkt",
        url: "https://pokeapi.co/api/v2/language/1/"
      },
      version: {
        name: "ultra-sun",
        url: "https://pokeapi.co/api/v2/version/29/"
      }
    },
    {
      flavor_text:
        "对主人的命令绝对服从。\n但绝对不会听看起来\n地位不如它的对手所说的话。",
      language: {
        name: "zh-Hans",
        url: "https://pokeapi.co/api/v2/language/12/"
      },
      version: { name: "moon", url: "https://pokeapi.co/api/v2/version/28/" }
    },
    {
      flavor_text:
        "主の　命令に　忠実。\nだが　下に　みている　相手の\nいうことは　絶対に　聞かない。",
      language: { name: "ja", url: "https://pokeapi.co/api/v2/language/11/" },
      version: { name: "moon", url: "https://pokeapi.co/api/v2/version/28/" }
    },
    {
      flavor_text:
        "This Pokémon obeys its master’s orders\nfaithfully. However, it refuses to listen to\nanything said by a person it doesn’t respect.",
      language: { name: "en", url: "https://pokeapi.co/api/v2/language/9/" },
      version: { name: "moon", url: "https://pokeapi.co/api/v2/version/28/" }
    },
    {
      flavor_text:
        "Se l’Allenatore si guadagna il suo rispetto,\nsegue fedelmente le istruzioni, altrimenti\nnon lo ascolta affatto.",
      language: { name: "it", url: "https://pokeapi.co/api/v2/language/8/" },
      version: { name: "moon", url: "https://pokeapi.co/api/v2/version/28/" }
    },
    {
      flavor_text:
        "Obedece sin rechistar las órdenes de su dueño.\nAhora bien, ignora sin pudor a todo aquel que\nconsidere inferior.",
      language: { name: "es", url: "https://pokeapi.co/api/v2/language/7/" },
      version: { name: "moon", url: "https://pokeapi.co/api/v2/version/28/" }
    },
    {
      flavor_text:
        "Es folgt geflissentlich den Befehlen seines\nTrainers. Auf jemanden, den es als unterlegen\nbetrachtet, hört es jedoch nicht.",
      language: { name: "de", url: "https://pokeapi.co/api/v2/language/6/" },
      version: { name: "moon", url: "https://pokeapi.co/api/v2/version/28/" }
    },
    {
      flavor_text:
        "Il est entièrement dévoué aux ordres de\nson maître. En revanche, il n’obéira jamais à\nquelqu’un qu’il considère comme inférieur à lui.",
      language: { name: "fr", url: "https://pokeapi.co/api/v2/language/5/" },
      version: { name: "moon", url: "https://pokeapi.co/api/v2/version/28/" }
    },
    {
      flavor_text:
        "會忠實地聽從主人的命令。\n但絕對不聽自己看不起的人\n所說的話。",
      language: {
        name: "zh-Hant",
        url: "https://pokeapi.co/api/v2/language/4/"
      },
      version: { name: "moon", url: "https://pokeapi.co/api/v2/version/28/" }
    },
    {
      flavor_text:
        "주인의 명령에 충실하다.\n그러나 아래라고 보는 상대가\n하는 말은 절대로 듣지 않는다.",
      language: { name: "ko", url: "https://pokeapi.co/api/v2/language/3/" },
      version: { name: "moon", url: "https://pokeapi.co/api/v2/version/28/" }
    },
    {
      flavor_text:
        "あるじの　めいれいに　ちゅうじつ。\nだが　したに　みている　あいての\nいうことは　ぜったいに　きかない。",
      language: {
        name: "ja-Hrkt",
        url: "https://pokeapi.co/api/v2/language/1/"
      },
      version: { name: "moon", url: "https://pokeapi.co/api/v2/version/28/" }
    },
    {
      flavor_text:
        "マントのように　体を　覆う\n黒い　体毛は　とても　硬い。\n受けた　ダメージを　減らしてくれる。",
      language: { name: "ja", url: "https://pokeapi.co/api/v2/language/11/" },
      version: {
        name: "alpha-sapphire",
        url: "https://pokeapi.co/api/v2/version/26/"
      }
    },
    {
      flavor_text:
        "It has black, cape-like fur that is very hard and\ndecreases the amount of damage it receives.",
      language: { name: "en", url: "https://pokeapi.co/api/v2/language/9/" },
      version: {
        name: "alpha-sapphire",
        url: "https://pokeapi.co/api/v2/version/26/"
      }
    },
    {
      flavor_text:
        "La pelliccia nera che lo ricopre come un manto è estremamente\ndura e ammortizza i colpi che gli vengono inferti.",
      language: { name: "it", url: "https://pokeapi.co/api/v2/language/8/" },
      version: {
        name: "alpha-sapphire",
        url: "https://pokeapi.co/api/v2/version/26/"
      }
    },
    {
      flavor_text:
        "Un robusto pelaje cubre su cuerpo a modo de capa y\ndisminuye el daño que recibe en los ataques.",
      language: { name: "es", url: "https://pokeapi.co/api/v2/language/7/" },
      version: {
        name: "alpha-sapphire",
        url: "https://pokeapi.co/api/v2/version/26/"
      }
    },
    {
      flavor_text:
        "Das dunkle Fell, das es wie ein Mantel umgibt, ist äußerst\nwiderstandsfähig und mindert den Schaden durch Attacken.",
      language: { name: "de", url: "https://pokeapi.co/api/v2/language/6/" },
      version: {
        name: "alpha-sapphire",
        url: "https://pokeapi.co/api/v2/version/26/"
      }
    },
    {
      flavor_text:
        "Les poils qui entourent son corps comme un manteau sont\nextrêmement durs et amortissent les coups.",
      language: { name: "fr", url: "https://pokeapi.co/api/v2/language/5/" },
      version: {
        name: "alpha-sapphire",
        url: "https://pokeapi.co/api/v2/version/26/"
      }
    },
    {
      flavor_text:
        "매우 단단한 검은 털이\n망토처럼 몸을 둘러싸고 있다.\n입은 데미지를 줄여준다.",
      language: { name: "ko", url: "https://pokeapi.co/api/v2/language/3/" },
      version: {
        name: "alpha-sapphire",
        url: "https://pokeapi.co/api/v2/version/26/"
      }
    },
    {
      flavor_text:
        "マントのように　からだを　おおう\nくろい　たいもうは　とても　かたい。\nうけた　ダメージを　へらしてくれる。",
      language: {
        name: "ja-Hrkt",
        url: "https://pokeapi.co/api/v2/language/1/"
      },
      version: {
        name: "alpha-sapphire",
        url: "https://pokeapi.co/api/v2/version/26/"
      }
    },
    {
      flavor_text:
        "トレーナーを　助けながら\n他の　ポケモンの　世話もする\nとても　忠実な　ポケモン。",
      language: { name: "ja", url: "https://pokeapi.co/api/v2/language/11/" },
      version: {
        name: "omega-ruby",
        url: "https://pokeapi.co/api/v2/version/25/"
      }
    },
    {
      flavor_text:
        "This very loyal Pokémon helps Trainers, and it also\ntakes care of other Pokémon.",
      language: { name: "en", url: "https://pokeapi.co/api/v2/language/9/" },
      version: {
        name: "omega-ruby",
        url: "https://pokeapi.co/api/v2/version/25/"
      }
    },
    {
      flavor_text:
        "È un Pokémon molto leale, che aiuta il suo Allenatore e al\ncontempo si prende cura degli altri Pokémon della squadra.",
      language: { name: "it", url: "https://pokeapi.co/api/v2/language/8/" },
      version: {
        name: "omega-ruby",
        url: "https://pokeapi.co/api/v2/version/25/"
      }
    },
    {
      flavor_text:
        "Este Pokémon es muy leal. No solo ayuda a Entrenadores,\nsino que también se preocupa por otros Pokémon.",
      language: { name: "es", url: "https://pokeapi.co/api/v2/language/7/" },
      version: {
        name: "omega-ruby",
        url: "https://pokeapi.co/api/v2/version/25/"
      }
    },
    {
      flavor_text:
        "Dieses äußerst treue Pokémon geht nicht nur seinem Trainer\nzur Hand, sondern hilft auch anderen Pokémon.",
      language: { name: "de", url: "https://pokeapi.co/api/v2/language/6/" },
      version: {
        name: "omega-ruby",
        url: "https://pokeapi.co/api/v2/version/25/"
      }
    },
    {
      flavor_text:
        "Un Pokémon très loyal qui aide aussi bien les Dresseurs\nque les autres Pokémon qu’il rencontre.",
      language: { name: "fr", url: "https://pokeapi.co/api/v2/language/5/" },
      version: {
        name: "omega-ruby",
        url: "https://pokeapi.co/api/v2/version/25/"
      }
    },
    {
      flavor_text:
        "트레이너를 도와주면서\n다른 포켓몬을 돌보기도 하는\n매우 충실한 포켓몬.",
      language: { name: "ko", url: "https://pokeapi.co/api/v2/language/3/" },
      version: {
        name: "omega-ruby",
        url: "https://pokeapi.co/api/v2/version/25/"
      }
    },
    {
      flavor_text:
        "トレーナーを　たすけながら\nほかの　ポケモンの　せわもする\nとても　ちゅうじつな　ポケモン。",
      language: {
        name: "ja-Hrkt",
        url: "https://pokeapi.co/api/v2/language/1/"
      },
      version: {
        name: "omega-ruby",
        url: "https://pokeapi.co/api/v2/version/25/"
      }
    },
    {
      flavor_text:
        "マントのように　体を　覆う\n黒い　体毛は　とても　硬い。\n受けた　ダメージを　減らしてくれる。",
      language: { name: "ja", url: "https://pokeapi.co/api/v2/language/11/" },
      version: { name: "y", url: "https://pokeapi.co/api/v2/version/24/" }
    },
    {
      flavor_text:
        "It has black, cape-like fur that is very hard and\ndecreases the amount of damage it receives.",
      language: { name: "en", url: "https://pokeapi.co/api/v2/language/9/" },
      version: { name: "y", url: "https://pokeapi.co/api/v2/version/24/" }
    },
    {
      flavor_text:
        "La pelliccia nera che lo ricopre come un manto è\nestremamente dura e ammortizza i colpi che gli\nvengono inferti.",
      language: { name: "it", url: "https://pokeapi.co/api/v2/language/8/" },
      version: { name: "y", url: "https://pokeapi.co/api/v2/version/24/" }
    },
    {
      flavor_text:
        "Un robusto pelaje cubre su cuerpo a modo de capa\ny disminuye el daño que recibe en los ataques.",
      language: { name: "es", url: "https://pokeapi.co/api/v2/language/7/" },
      version: { name: "y", url: "https://pokeapi.co/api/v2/version/24/" }
    },
    {
      flavor_text:
        "Das dunkle Fell, das es wie ein Mantel umgibt,\nist äußerst widerstandsfähig und mindert\nden Schaden durch Attacken.",
      language: { name: "de", url: "https://pokeapi.co/api/v2/language/6/" },
      version: { name: "y", url: "https://pokeapi.co/api/v2/version/24/" }
    },
    {
      flavor_text:
        "Les poils qui entourent son corps comme un manteau\nsont extrêmement durs et amortissent les coups.",
      language: { name: "fr", url: "https://pokeapi.co/api/v2/language/5/" },
      version: { name: "y", url: "https://pokeapi.co/api/v2/version/24/" }
    },
    {
      flavor_text:
        "매우 단단한 검은 털이\n망토처럼 몸을 둘러싸고 있다.\n입은 데미지를 줄여준다.",
      language: { name: "ko", url: "https://pokeapi.co/api/v2/language/3/" },
      version: { name: "y", url: "https://pokeapi.co/api/v2/version/24/" }
    },
    {
      flavor_text:
        "マントのように　からだを　おおう\nくろい　たいもうは　とても　かたい。\nうけた　ダメージを　へらしてくれる。",
      language: {
        name: "ja-Hrkt",
        url: "https://pokeapi.co/api/v2/language/1/"
      },
      version: { name: "y", url: "https://pokeapi.co/api/v2/version/24/" }
    },
    {
      flavor_text:
        "トレーナーを　助けながら\n他の　ポケモンの　世話もする\nとても　忠実な　ポケモン。",
      language: { name: "ja", url: "https://pokeapi.co/api/v2/language/11/" },
      version: { name: "x", url: "https://pokeapi.co/api/v2/version/23/" }
    },
    {
      flavor_text:
        "This very loyal Pokémon helps Trainers, and it also\ntakes care of other Pokémon.",
      language: { name: "en", url: "https://pokeapi.co/api/v2/language/9/" },
      version: { name: "x", url: "https://pokeapi.co/api/v2/version/23/" }
    },
    {
      flavor_text:
        "È un Pokémon molto leale, che aiuta il suo Allenatore\ne al contempo si prende cura degli altri Pokémon\ndella squadra.",
      language: { name: "it", url: "https://pokeapi.co/api/v2/language/8/" },
      version: { name: "x", url: "https://pokeapi.co/api/v2/version/23/" }
    },
    {
      flavor_text:
        "Este Pokémon es muy leal. No solo ayuda a\nEntrenadores, sino que también se preocupa por\notros Pokémon.",
      language: { name: "es", url: "https://pokeapi.co/api/v2/language/7/" },
      version: { name: "x", url: "https://pokeapi.co/api/v2/version/23/" }
    },
    {
      flavor_text:
        "Dieses äußerst treue Pokémon geht nicht nur\nseinem Trainer zur Hand, sondern hilft auch\nanderen Pokémon.",
      language: { name: "de", url: "https://pokeapi.co/api/v2/language/6/" },
      version: { name: "x", url: "https://pokeapi.co/api/v2/version/23/" }
    },
    {
      flavor_text:
        "Un Pokémon très loyal qui aide aussi bien les\nDresseurs que les autres Pokémon qu’il rencontre.",
      language: { name: "fr", url: "https://pokeapi.co/api/v2/language/5/" },
      version: { name: "x", url: "https://pokeapi.co/api/v2/version/23/" }
    },
    {
      flavor_text:
        "트레이너를 도와주면서\n다른 포켓몬을 돌보기도 하는\n매우 충실한 포켓몬.",
      language: { name: "ko", url: "https://pokeapi.co/api/v2/language/3/" },
      version: { name: "x", url: "https://pokeapi.co/api/v2/version/23/" }
    },
    {
      flavor_text:
        "トレーナーを　たすけながら\nほかの　ポケモンの　せわもする\nとても　ちゅうじつな　ポケモン。",
      language: {
        name: "ja-Hrkt",
        url: "https://pokeapi.co/api/v2/language/1/"
      },
      version: { name: "x", url: "https://pokeapi.co/api/v2/version/23/" }
    },
    {
      flavor_text:
        "This very loyal Pokémon\nhelps Trainers, and it also\ntakes care of other Pokémon.",
      language: { name: "en", url: "https://pokeapi.co/api/v2/language/9/" },
      version: { name: "white-2", url: "https://pokeapi.co/api/v2/version/22/" }
    },
    {
      flavor_text:
        "This very loyal Pokémon\nhelps Trainers, and it also\ntakes care of other Pokémon.",
      language: { name: "en", url: "https://pokeapi.co/api/v2/language/9/" },
      version: { name: "black-2", url: "https://pokeapi.co/api/v2/version/21/" }
    },
    {
      flavor_text:
        "It loyally follows its Trainer’s\norders. For ages, they have helped\nTrainers raise Pokémon.",
      language: { name: "en", url: "https://pokeapi.co/api/v2/language/9/" },
      version: { name: "white", url: "https://pokeapi.co/api/v2/version/18/" }
    },
    {
      flavor_text:
        "Il obéit fidèlement aux consignes.\nIl assiste les Dresseurs depuis\ntrès longtemps.",
      language: { name: "fr", url: "https://pokeapi.co/api/v2/language/5/" },
      version: { name: "white", url: "https://pokeapi.co/api/v2/version/18/" }
    },
    {
      flavor_text:
        "It has black, cape-like fur that is\nvery hard and decreases the amount\nof damage it receives.",
      language: { name: "en", url: "https://pokeapi.co/api/v2/language/9/" },
      version: { name: "black", url: "https://pokeapi.co/api/v2/version/17/" }
    },
    {
      flavor_text:
        "Les poils qui entourent son corps\ncomme un manteau sont extrêmement\ndurs et amortissent les coups.",
      language: { name: "fr", url: "https://pokeapi.co/api/v2/language/5/" },
      version: { name: "black", url: "https://pokeapi.co/api/v2/version/17/" }
    }
  ],
  form_descriptions: [],
  forms_switchable: false,
  gender_rate: 4,
  genera: [
    {
      genus: "忠犬宝可梦",
      language: {
        name: "zh-Hans",
        url: "https://pokeapi.co/api/v2/language/12/"
      }
    },
    {
      genus: "ちゅうけんポケモン",
      language: { name: "ja", url: "https://pokeapi.co/api/v2/language/11/" }
    },
    {
      genus: "Loyal Dog Pokémon",
      language: { name: "en", url: "https://pokeapi.co/api/v2/language/9/" }
    },
    {
      genus: "Pokémon Fedeltà",
      language: { name: "it", url: "https://pokeapi.co/api/v2/language/8/" }
    },
    {
      genus: "Pokémon Leal",
      language: { name: "es", url: "https://pokeapi.co/api/v2/language/7/" }
    },
    {
      genus: "Treuhund",
      language: { name: "de", url: "https://pokeapi.co/api/v2/language/6/" }
    },
    {
      genus: "Pokémon Chien Fidèle",
      language: { name: "fr", url: "https://pokeapi.co/api/v2/language/5/" }
    },
    {
      genus: "忠犬寶可夢",
      language: {
        name: "zh-Hant",
        url: "https://pokeapi.co/api/v2/language/4/"
      }
    },
    {
      genus: "충견포켓몬",
      language: { name: "ko", url: "https://pokeapi.co/api/v2/language/3/" }
    },
    {
      genus: "ちゅうけんポケモン",
      language: {
        name: "ja-Hrkt",
        url: "https://pokeapi.co/api/v2/language/1/"
      }
    }
  ],
  generation: {
    name: "generation-v",
    url: "https://pokeapi.co/api/v2/generation/5/"
  },
  growth_rate: {
    name: "medium-slow",
    url: "https://pokeapi.co/api/v2/growth-rate/4/"
  },
  habitat: null,
  has_gender_differences: false,
  hatch_counter: 15,
  id: 507,
  is_baby: false,
  name: "herdier",
  names: [
    {
      language: {
        name: "zh-Hans",
        url: "https://pokeapi.co/api/v2/language/12/"
      },
      name: "哈约克"
    },
    {
      language: { name: "ja", url: "https://pokeapi.co/api/v2/language/11/" },
      name: "ハーデリア"
    },
    {
      language: { name: "en", url: "https://pokeapi.co/api/v2/language/9/" },
      name: "Herdier"
    },
    {
      language: { name: "it", url: "https://pokeapi.co/api/v2/language/8/" },
      name: "Herdier"
    },
    {
      language: { name: "es", url: "https://pokeapi.co/api/v2/language/7/" },
      name: "Herdier"
    },
    {
      language: { name: "de", url: "https://pokeapi.co/api/v2/language/6/" },
      name: "Terribark"
    },
    {
      language: { name: "fr", url: "https://pokeapi.co/api/v2/language/5/" },
      name: "Ponchien"
    },
    {
      language: {
        name: "zh-Hant",
        url: "https://pokeapi.co/api/v2/language/4/"
      },
      name: "哈約克"
    },
    {
      language: { name: "ko", url: "https://pokeapi.co/api/v2/language/3/" },
      name: "하데리어"
    },
    {
      language: {
        name: "ja-Hrkt",
        url: "https://pokeapi.co/api/v2/language/1/"
      },
      name: "ハーデリア"
    }
  ],
  order: 508,
  pal_park_encounters: [],
  pokedex_numbers: [
    {
      entry_number: 23,
      pokedex: {
        name: "updated-unova",
        url: "https://pokeapi.co/api/v2/pokedex/9/"
      }
    },
    {
      entry_number: 13,
      pokedex: {
        name: "original-unova",
        url: "https://pokeapi.co/api/v2/pokedex/8/"
      }
    },
    {
      entry_number: 507,
      pokedex: { name: "national", url: "https://pokeapi.co/api/v2/pokedex/1/" }
    }
  ],
  shape: {
    name: "quadruped",
    url: "https://pokeapi.co/api/v2/pokemon-shape/8/"
  },
  varieties: [
    {
      is_default: true,
      pokemon: {
        name: "herdier",
        url: "https://pokeapi.co/api/v2/pokemon/507/"
      }
    }
  ]
};

const mockedSpeciesInstance = {
  name: "herdier",
  id: 507,
  dom: {},
  color: "gray",
  habitat: null,
  growthRate: "medium-slow",
  flavorText:
    "The longer its black fur grows, the harder and\nmore impervious it gets. Claws and fangs can’t\neasily penetrate it.",
  evolvesFromSpecies: "lillipup",
  evolutionChainId: "260"
};

const mockedEvolutionData = {
  baby_trigger_item: null,
  chain: {
    evolution_details: [],
    evolves_to: [
      {
        evolution_details: [
          {
            gender: null,
            held_item: null,
            item: null,
            known_move: null,
            known_move_type: null,
            location: null,
            min_affection: null,
            min_beauty: null,
            min_happiness: null,
            min_level: 16,
            needs_overworld_rain: false,
            party_species: null,
            party_type: null,
            relative_physical_stats: null,
            time_of_day: "",
            trade_species: null,
            trigger: {
              name: "level-up",
              url: "https://pokeapi.co/api/v2/evolution-trigger/1/"
            },
            turn_upside_down: false
          }
        ],
        evolves_to: [
          {
            evolution_details: [
              {
                gender: null,
                held_item: null,
                item: null,
                known_move: null,
                known_move_type: null,
                location: null,
                min_affection: null,
                min_beauty: null,
                min_happiness: null,
                min_level: 32,
                needs_overworld_rain: false,
                party_species: null,
                party_type: null,
                relative_physical_stats: null,
                time_of_day: "",
                trade_species: null,
                trigger: {
                  name: "level-up",
                  url: "https://pokeapi.co/api/v2/evolution-trigger/1/"
                },
                turn_upside_down: false
              }
            ],
            evolves_to: [],
            is_baby: false,
            species: {
              name: "stoutland",
              url: "https://pokeapi.co/api/v2/pokemon-species/508/"
            }
          }
        ],
        is_baby: false,
        species: {
          name: "herdier",
          url: "https://pokeapi.co/api/v2/pokemon-species/507/"
        }
      }
    ],
    is_baby: false,
    species: {
      name: "lillipup",
      url: "https://pokeapi.co/api/v2/pokemon-species/506/"
    }
  },
  id: 260
};

const mockedEvolutionInstance = {
  parent: {
    name: "lillipup",
    url: "https://pokeapi.co/api/v2/pokemon-species/506/"
  },
  evolvesTo: {
    species: {
      name: "lillipup",
      url: "https://pokeapi.co/api/v2/pokemon-species/506/"
    },
    evolvesTo: {
      species: {
        name: "herdier",
        url: "https://pokeapi.co/api/v2/pokemon-species/507/"
      },
      evolvesTo: {
        species: {
          name: "stoutland",
          url: "https://pokeapi.co/api/v2/pokemon-species/508/"
        },
        evolvesTo: null
      }
    }
  }
};

module.exports = {
  mockedSpeciesList,
  mockedSpeciesListWithLimitOne,
  mockedSpeciesData,
  mockedSpeciesInstance,
  mockedEvolutionData,
  mockedEvolutionInstance
};
