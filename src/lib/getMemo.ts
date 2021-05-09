export function getMemo() {
  return memo;
}

export function getCategories(): [string[], number[]] {
  const categoriesSet = memo.map((value) => value.category);

  const categories = categoriesSet.filter(
    (category, i, self) => self.indexOf(category) === i
  );

  const count = categories.map((category) => {
    return categoriesSet.filter((value) => value === category).length;
  });

  return [categories, count];
}

const memo = [
  {
    title: "sample1",
    category: "sample1",
    tags: ["a", "b", "c"],
    star: false,
    creationDate: 20210501,
    updateDate: 20210504,
    content:
      "アリスは川辺でおねえさんのよこにすわって、なんにもすることがないのでとても退屈（たいくつ）しはじめていました。一、二回はおねえさんの読んでいる本をのぞいてみたけれど、そこには絵も会話もないのです。「絵や会話のない本なんて、なんの役にもたたないじゃないの」とアリスは思いました。そこでアリスは、頭のなかで、ひなぎくのくさりをつくったら楽しいだろうけれど、起きあがってひなぎくをつむのもめんどくさいし、どうしようかと考えていました（といっても、昼間で暑いし、とってもねむくて頭もまわらなかったので、これもたいへんだったのですが）。そこへいきなり、ピンクの目をした白うさぎが近くを走ってきたのです。",
  },
  {
    title: "sample2",
    category: "sample1",
    tags: ["d", "e", "f"],
    star: false,
    creationDate: 20210502,
    updateDate: 20210505,
    content:
      "それだけなら、そんなにめずらしいことでもありませんでした。さらにアリスとしては、そのうさぎが「どうしよう！　どうしよう！　ちこくしちゃうぞ！」とつぶやくのを聞いたときも、それがそんなにへんてこだとは思いませんでした（あとから考えてみたら、これも不思議に思うべきだったのですけれど、でもこのときには、それがごく自然なことに思えたのです）。でもそのうさぎがほんとうに、チョッキのポケットから懐中時計（かいちゅうどけい）をとりだしてそれをながめ、そしてまたあわててかけだしたとき、アリスもとびあがりました。",
  },
  {
    title: "sample3",
    category: "sample1",
    tags: ["a", "b", "c"],
    star: false,
    creationDate: 2021053,
    updateDate: 20210506,
    content:
      "というのも、チョッキのポケットなんかがあるうさぎはこれまで見たことがないし、そこからとりだす時計をもっているうさぎなんかも見たことないぞ、というのに急に気がついたからです。そこで、興味（きょうみ）しんしんになったアリスは、うさぎのあとを追っかけて野原をよこぎって、それがしげみの下の、おっきなうさぎの穴にとびこむのを、ぎりぎりのところで見つけました。次のしゅんかんに、アリスもそのあとを追っかけてとびこみました。いったいぜんたいどうやってそこから出ようか、なんてことはちっとも考えなかったのです。うさぎの穴は、しばらくはトンネルみたいにまっすぐつづいて、それからいきなりズドンと下におりていました。",
  },
];
