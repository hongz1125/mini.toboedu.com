/*

fetch('https://www.shanbay.com/api/v1/bdc/search/?word=billion').then(response => response.json())
  .then(data => console.log(JSON.stringify({
	id:data.data.id,
	en:data.data.content,
	en_s:`/${data.data.pronunciation}/`,
	cn:data.data.definition,
	audio:data.data.audio
})))
  .catch(e => console.log("Oops, error", e))

*/


let data = [
  {
    "id": "101",
    "src": "/images/101/list_1.jpg",
    "title": "水果",
    "children": [
      {
        "id": "1",
        "src": "/images/101/list_1.jpg",
        "en": "apple",
        "cn": "苹果",
        "en_s": "/'æp(ə)l/",

      },
      {
        "id": "2",
        "src": "/images/101/list_2.jpg",
        "en": "banana",
        "cn": "香蕉",
        "en_s": "/bə'nænə/",
      },
      {
        "id": "3",
        "src": "/images/101/list_3.jpg",
        "en": "berry",
        "cn": "树梅",
        "en_s": "/'bɛri/",
      },
      {
        "id": "4",
        "src": "/images/101/list_4.jpg",
        "en": "blueberry",
        "cn": "蓝莓",
        "en_s": "/'blubɛri/",
      },
      {
        "id": "5",
        "src": "/images/101/list_5.jpg",
        "en": "cherry",
        "cn": "樱桃",
        "en_s": "/ˈtʃɛri/",
      },
      {
        "id": "6",
        "src": "/images/101/list_6.jpg",
        "en": "coconut",
        "cn": "椰子",
        "en_s": "/'kokənʌt/",
      },
      {
        "id": "7",
        "src": "/images/101/list_7.jpg",
        "en": "durian",
        "cn": "榴莲",
        "en_s": "/ˈdʊriən/",
      },
      {
        "id": "8",
        "src": "/images/101/list_8.jpg",
        "en": "grape",
        "cn": "葡萄",
        "en_s": "/ɡrep/",
      },
      {
        "id": "9",
        "src": "/images/101/list_9.jpg",
        "en": "lemon",
        "cn": "柠檬",
        "en_s": "/'lɛmən/",
      },
      {
        "id": "10",
        "src": "/images/101/list_10.jpg",
        "en": "mango",
        "cn": "芒果",
        "en_s": "/'mæŋɡo/",
      },
      {
        "id": "11",
        "src": "/images/101/list_11.jpg",
        "en": "olive",
        "cn": "橄榄",
        "en_s": "/ˈɑlɪv/",
      },
      {
        "id": "12",
        "src": "/images/101/list_12.jpg",
        "en": "orange",
        "cn": "橙",
        "en_s": "/ˈɔrɪndʒ/",
      },
      {
        "id": "13",
        "src": "/images/101/list_13.jpg",
        "en": "pawpaw",
        "cn": "木瓜",
        "en_s": "/'pɔpɔ/",
      },
      {
        "id": "14",
        "src": "/images/101/list_14.jpg",
        "en": "peach",
        "cn": "桃子",
        "en_s": "/pitʃ/",
      },
      {
        "id": "15",
        "src": "/images/101/list_15.jpg",
        "en": "pear",
        "cn": "梨",
        "en_s": "/pɛr/",
      },
      {
        "id": "16",
        "src": "/images/101/list_16.jpg",
        "en": "persimmon",
        "cn": "柿子",
        "en_s": "/pɚ'sɪmən/",
      },
      {
        "id": "17",
        "src": "/images/101/list_17.jpg",
        "en": "pomegranate",
        "cn": "石榴",
        "en_s": "/'pɑmɪɡrænɪt/",
      },
      {
        "id": "18",
        "src": "/images/101/list_18.jpg",
        "en": "pomelo",
        "cn": "柚子",
        "en_s": "/'pɑməlo/",
      },
      {
        "id": "19",
        "src": "/images/101/list_19.jpg",
        "en": "strawberry",
        "cn": "草莓",
        "en_s": "/'strɔbɛri/",
      },
      {
        "id": "20",
        "src": "/images/101/list_20.jpg",
        "en": "watermelon",
        "cn": "西瓜",
        "en_s": "/'wɔtɚmɛlən/",
      },
    ]
  },
  {
    "id": "102",
    "src": "/images/102/list_12.jpg",
    "title": "数字",
    "children": [
      {
        "id": "1",
        "src": "/images/102/list_1.jpg",
        "en": "one",
        "cn": "1",
        "en_s": "/wʌn/",
      },
      {
        "id": 6303,
        "src": "/images/102/list_2.jpg",
        "en": "two",
        "en_s": "/tuː/",
        "cn": " num. 二，两个",
        "audio": "http://media.shanbay.com/audio/us/two.mp3"
      },
      {
        "id": 6112,
        "src": "/images/102/list_3.jpg",
        "en": "three",
        "en_s": "/θriː/",
        "cn": " num. 三\npron.&amp;adj. 三(个,只...)",
        "audio": "http://media.shanbay.com/audio/us/three.mp3"
      },
      {
        "id": 2746,
        "src": "/images/102/list_4.jpg",
        "en": "four",
        "en_s": "/fɔːr/",
        "cn": " num. 四\npron.&amp;adj. 四(个,只...)",
        "audio": "http://media.shanbay.com/audio/us/four.mp3"
      },
      {
        "id": 2652,
        "src": "/images/102/list_5.jpg",
        "en": "five",
        "en_s": "/faɪv/",
        "cn": " num. 五\npron.&amp;adj. 五(个,只...)",
        "audio": "http://media.shanbay.com/audio/us/five.mp3"
      },
      {
        "id": 5525,
        "src": "/images/102/list_6.jpg",
        "en": "six",
        "en_s": "/sɪks/",
        "cn": " n.六；六个；六岁；六点 num.六；六个",
        "audio": "http://media.shanbay.com/audio/us/six.mp3"
      },
      {
        "id": 5414,
        "src": "/images/102/list_7.jpg",
        "en": "seven",
        "en_s": "/'sevn/",
        "cn": " num. 七",
        "audio": "http://media.shanbay.com/audio/us/seven.mp3"
      },
      {
        "id": 2310,
        "src": "/images/102/list_8.jpg",
        "en": "eight",
        "en_s": "/eɪt/",
        "cn": " num. 八\npron. 八(个,只...)",
        "audio": "http://media.shanbay.com/audio/us/eight.mp3"
      },
      {
        "id": 4218,
        "src": "/images/102/list_9.jpg",
        "en": "nine",
        "en_s": "/naɪn/",
        "cn": " num.&amp;n. 九\npron.&amp;adv. 九(个,只...)",
        "audio": "http://media.shanbay.com/audio/us/nine.mp3"
      },
      {
        "id": 6038,
        "src": "/images/102/list_10.jpg",
        "en": "ten",
        "en_s": "/ten/",
        "cn": " num. 十, 十个",
        "audio": "http://media.shanbay.com/audio/us/ten.mp3"
      },
      {
        "id": 2331,
        "src": "/images/102/list_11.jpg",
        "en": "eleven",
        "en_s": "/ɪ'levn/",
        "cn": " num. 十一\npron.&amp;adj. 十一(个,只...)",
        "audio": "http://media.shanbay.com/audio/us/eleven.mp3"
      },
      {
        "id": 6296,
        "src": "/images/102/list_12.jpg",
        "en": "twelve",
        "en_s": "/twelv/",
        "cn": " adj. 十二,12,12",
        "audio": "http://media.shanbay.com/audio/us/twelve.mp3"
      },
      {
        "id": 6100,
        "src": "/images/102/list_13.jpg",
        "en": "thirteen",
        "en_s": "/ˌθɜːr'tiːn/",
        "cn": " num. 十三",
        "audio": "http://media.shanbay.com/audio/us/thirteen.mp3"
      },
      {
        "id": 2747,

        "src": "/images/102/list_14.jpg",
        "en": "fourteen",
        "en_s": "/ˌfɔːr'tiːn/",
        "cn": " num. 十四",
        "audio": "http://media.shanbay.com/audio/us/fourteen.mp3"
      },
      {
        "id": 2609,

        "src": "/images/102/list_15.jpg",
        "en": "fifteen",
        "en_s": "/ˌfɪf'tiːn/",
        "cn": " num. 十五\npron. 十五(个, 只...) \nadj.十五的，十五个的",
        "audio": "http://media.shanbay.com/audio/us/fifteen.mp3"
      },
      {
        "id": 5526,
        "en": "sixteen",
        "src": "/images/102/list_16.jpg",
        "en_s": "/ˌsɪks'tiːn/",
        "cn": " num. 十六\npron.&amp;adj. 十六(个,只...)",
        "audio": "http://media.shanbay.com/audio/us/sixteen.mp3"
      },
      {
        "id": 5415,

        "src": "/images/102/list_17.jpg",
        "en": "seventeen",
        "en_s": "/ˌsevn'tiːn/",
        "cn": " num. 十七",
        "audio": "http://media.shanbay.com/audio/us/seventeen.mp3"
      },
      {
        "id": 2311,

        "src": "/images/102/list_18.jpg",
        "en": "eighteen",
        "en_s": "/ˌeɪ'tiːn/",
        "cn": " num. 十八",
        "audio": "http://media.shanbay.com/audio/us/eighteen.mp3"
      },
      {
        "id": 4219,

        "src": "/images/102/list_19.jpg",
        "en": "nineteen",
        "en_s": "/ˌnaɪn'tiːn/",
        "cn": " 十九",
        "audio": "http://media.shanbay.com/audio/us/nineteen.mp3"
      },
      {
        "id": 6298,

        "src": "/images/102/list_20.jpg",
        "en": "twenty",
        "en_s": "/'twenti/",
        "cn": " adj. 二十,20,20",
        "audio": "http://media.shanbay.com/audio/us/twenty.mp3"
      },
      {
        "id": 3220,

        "src": "/images/102/list_21.jpg",
        "en": "hundred",
        "en_s": "/'hʌndrəd/",
        "cn": " n. 百,百个东西\nadj. 百,百个",
        "audio": "http://media.shanbay.com/audio/us/hundred.mp3"
      },
      {
        "id": 6109,

        "src": "/images/102/list_22.jpg",
        "en": "thousand",
        "en_s": "/'θaʊznd/",
        "cn": " adj. 千,成千",
        "audio": "http://media.shanbay.com/audio/us/thousand.mp3"
      },
      {
        "id": 4057,
        "src": "/images/102/list_23.jpg",
        "en": "million",
        "en_s": "/'mɪljən/",
        "cn": " n. 百万,(the millions)群众\nadj. 百万的,无数的",
        "audio": "http://media.shanbay.com/audio/us/million.mp3"
      },
      {
        "id": 1229,
        "src": "/images/102/list_24.jpg",
        "en": "billion",
        "en_s": "/'bɪljən/",
        "cn": " n. 十亿,大量\nadj. 大量的",
        "audio": "http://media.shanbay.com/audio/us/billion.mp3"
      },
    ]
  },
  {
    "id": "103",
    "src": "/images/103/list_1.jpg",
    "title": "身体",
    "children": [
      {
        "id": 3100,
        "src": "/images/103/list_1.jpg",
        "en": "head",
        "en_s": "/hed/",
        "cn": " n. 头脑,领袖,冷静，硬币的正面，顶端，高潮\nvt. &vi. 为首,朝向,前进，超过，起源\nadj. 首要的，前面的",
        "audio": "http://media.shanbay.com/audio/us/head.mp3"
      },
      {
        "id": 3029,
        "src": "/images/103/list_2.jpg",
        "en": "hair",
        "en_s": "/her/",
        "cn": " n. 头发, 毛发, 毛织物, 极少量, 极短距离",
        "audio": "http://media.shanbay.com/audio/us/hair.mp3"
      }
    ]
  },
  {
    "id": "104",
    "src": "/images/104/list_1.jpg",
    "title": "蔬菜",
    "children": [
      {"id":4594,"src": "/images/104/list_1.jpg","en":"pepper","en_s":"/'pepər/","cn":" n. 胡椒粉\nvt. 加胡椒粉于","audio":"http://media.shanbay.com/audio/us/pepper.mp3"},
      {"id":6174,"src": "/images/104/list_2.jpg","en":"tomato","en_s":"/tə'meɪtoʊ/","cn":" n. 西红柿","audio":"http://media.shanbay.com/audio/us/tomato.mp3"},
      {"id":11902,"src": "/images/104/list_3.jpg","en":"asparagus","en_s":"/ə'spærəɡəs/","cn":" n. 芦笋","audio":"http://media.shanbay.com/audio/us/asparagus.mp3"},
      {"id":1930,"src": "/images/104/list_4.jpg","en":"cucumber","en_s":"/'kjuːkʌmbər/","cn":" n. 黄瓜","audio":"http://media.shanbay.com/audio/us/cucumber.mp3"},
    ]
  }
];


export default data;