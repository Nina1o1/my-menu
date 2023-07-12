import kaomojis from "../../assets/kaomojis.json";

class Kaomoji {
  constructor(emotions, value) {
    this.emotions = emotions;
    this.value = value;
  }
  isEmotion(emotion) {
    return this.emotions.includes(emotion);
  }
}

class Kaomojis {
  constructor() {
    this.data = kaomojis.map(k => new Kaomoji(k["emotions"], k["value"]));
  }
  findEmotion(emotion) {
    const foundKmjs = this.data.filter(k => k.isEmotion(emotion));
    const randKmj = foundKmjs[Math.floor(Math.random()*foundKmjs.length)]["value"];
    return randKmj;
  }
  findSad() {    
    return this.findEmotion("sad");
  }
}

export default Kaomojis;