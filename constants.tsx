
import { FormulaPart, Vocab, Essay } from './types';

export const GA_MEASUREMENT_ID = 'G-XXXXXXXXXX';

export const FOOTNOTE_DB: Record<number, string[]> = {
  1: ["the prevalence of smartphone usage", "the fascinating culture of queuing", "the looming shadow of doomsday predictions"],
  2: ["people are glued to screens", "crowds flock to new restaurants"],
  3: ["my own habits", "the predicted disaster"],
  4: ["the warmth of human kindness and the convenient, sleepless vibrancy of our night markets", "how easily fear spreads, affecting even tourism and daily decisions"],
  5: ["our anxiety", "our digital dependence", "the vibrancy of Taiwanese society"],
  6: ["my health", "how we should live", "marketing Taiwan"],
  7: ["the pros and cons", "the possibility of the end of the world"],
  8: ["while they are probably not scientifically accurate, they are a valuable philosophical reminder of our mortality"],
  9: ["mitigate health risks", "promote our culture", "spend my final days"],
  10: ["launch social media campaigns that invite influencers to 'live a day as a local,' immersing them in the authentic warmth and culinary delights we offer"],
  11: ["this cultural promotion", "this doomsday scenario"],
  12: ["prioritize our time", "cherish our identity"]
};

export const VOCAB_DB: Record<string, { kk: string; def: string; ex: string; pos: string }> = {
  "prevalence": { kk: "[ˋprɛvələns]", pos: "n.", def: "流行；普及", ex: "The prevalence of smartphone usage is undeniable." },
  "evoke": { kk: "[ɪˋvok]", pos: "v.", def: "喚起；引起", ex: "The music evokes memories of my childhood." },
  "contemplation": { kk: "[͵kɑntɛmˋpleʃən]", pos: "n.", def: "沈思；冥想", ex: "He spent the afternoon in deep contemplation." },
  "lens": { kk: "[lɛnz]", pos: "n.", def: "觀點；角度", ex: "View the issue through a historical lens." },
  "evident": { kk: "[ˋɛvədənt]", pos: "adj.", def: "明顯的", ex: "It is evident that she is telling the truth." },
  "symbol": { kk: "[ˋsɪmb!] ", pos: "n.", def: "象徵", ex: "The white dove is a symbol of peace." },
  "unparalleled": { kk: "[ʌnˋpærə͵lɛld]", pos: "adj.", def: "無與倫比的", ex: "The city offers unparalleled cultural experiences." },
  "customization": { kk: "[͵kʌstəməˋzeʃən]", pos: "n.", def: "客製化", ex: "The software allows for easy customization." },
  "tailor": { kk: "[ˋtelɚ]", pos: "v.", def: "量身打造；調整", ex: "You can tailor the program to your needs." },
  "phenomenon": { kk: "[fəˋnɑmə͵nɑn]", pos: "n.", def: "現象", ex: "Natural phenomena like rainbows are beautiful." },
  "superficial": { kk: "[͵supɚˋfɪʃəl]", pos: "adj.", def: "表面的；膚淺的", ex: "The damage was only superficial." },
  "mirror": { kk: "[ˋmɪrɚ]", pos: "v.", def: "反映", ex: "His success mirrors his hard work." },
  "implications": { kk: "[͵ɪmplɪˋkeʃənz]", pos: "n.", def: "影響；含義", ex: "Consider the implications of your actions." },
  "evaluate": { kk: "[ɪˋvælju͵et]", pos: "v.", def: "評估", ex: "We need to evaluate the results." },
  "contend": { kk: "[kənˋtɛnd]", pos: "v.", def: "主張；爭論", ex: "He contends that the law is unfair." },
  "wary": { kk: "[ˋwɛrɪ]", pos: "adj.", def: "警惕的", ex: "Be wary of online scams." },
  "excessive": { kk: "[ɪkˋsɛsɪv]", pos: "adj.", def: "過度的", ex: "Excessive sugar is bad for health." },
  "indulgence": { kk: "[ɪnˋdʌldʒəns]", pos: "n.", def: "沈溺；嗜好", ex: "Occasional indulgence is fine." },
  "culinary": { kk: "[ˋkʌlə͵nɛrɪ]", pos: "adj.", def: "烹飪的；美食的", ex: "Taiwan is famous for its culinary delights." },
  "vibrancy": { kk: "[ˋvaɪbrənsɪ]", pos: "n.", def: "活力", ex: "The vibrancy of the night market is amazing." },
  "propagates": { kk: "[ˋprɑpə͵gets]", pos: "v.", def: "傳播", ex: "Social media propagates news quickly." },
  "vulnerability": { kk: "[͵vʌlnərəˋbɪlətɪ]", pos: "n.", def: "脆弱；易受傷", ex: "His vulnerability makes him more human." },
  "imminent": { kk: "[ˋɪmənənt]", pos: "adj.", def: "即將發生的", ex: "They were in imminent danger." },
  "hypothetical": { kk: "[͵haɪpəˋθɛtɪk!] ", pos: "adj.", def: "假設的", ex: "Let's consider a hypothetical situation." },
  "catalyst": { kk: "[ˋkætəlɪst]", pos: "n.", def: "催化劑；誘因", ex: "The event was a catalyst for change." },
  "indispensable": { kk: "[͵ɪndɪsˋpɛnsəb!]", pos: "adj.", def: "不可或缺的", ex: "Water is indispensable to life." },
  "garner": { kk: "[ˋgɑrnɚ]", pos: "v.", def: "獲得；收集", ex: "The movie garnered many awards." },
  "imperative": { kk: "[ɪmˋpɛrətɪv]", pos: "adj.", def: "必要的；緊急的", ex: "It is imperative that we act now." },
  "acknowledge": { kk: "[əkˋnɑlɪdʒ]", pos: "v.", def: "承認", ex: "He refused to acknowledge his mistake." },
  "mitigate": { kk: "[ˋmɪtə͵get]", pos: "v.", def: "減輕；緩和", ex: "Steps were taken to mitigate the risks." },
  "immense": { kk: "[ɪˋmɛns]", pos: "adj.", def: "巨大的", ex: "The project was an immense success." },
  "allure": { kk: "[əˋljʊr]", pos: "n.", def: "魅力；吸引力", ex: "The allure of foreign travel." },
  "captivates": { kk: "[ˋkæptə͵vets]", pos: "v.", def: "吸引；著迷", ex: "Her performance captivates the audience." },
  "inclusivity": { kk: "[͵ɪnkluˋsɪvətɪ]", pos: "n.", def: "包容性", ex: "The company promotes inclusivity." },
  "authentic": { kk: "[ɔˋθɛntɪk]", pos: "adj.", def: "真實的；正宗的", ex: "Try some authentic local food." },
  "promotion": { kk: "[prəˋmoʃən]", pos: "n.", def: "推廣；晉升", ex: "The brand needs more promotion." },
  "identity": { kk: "[aɪˋdɛntətɪ]", pos: "n.", def: "認同；身份", ex: "A sense of national identity." },
  "recurring": { kk: "[rɪˋkɝɪŋ]", pos: "adj.", def: "反覆出現的", ex: "A recurring dream." },
  "superstition": { kk: "[͵supɚˋstɪʃən]", pos: "n.", def: "迷信", ex: "Friday the 13th is a superstition." },
  "massive": { kk: "[ˋmæsɪv]", pos: "adj.", def: "巨大的", ex: "A massive earthquake hit the region." },
  "mortality": { kk: "[mɔrˋtælətɪ]", pos: "n.", def: "死亡率；必死性", ex: "Confronting our own mortality." },
  "gratitude": { kk: "[ˋgrætə͵tjud]", pos: "n.", def: "感激", ex: "She expressed her gratitude." },
  "cherish": { kk: "[ˋtʃɛrɪʃ]", pos: "v.", def: "珍愛", ex: "Cherish every moment of your life." },
  "convinced": { kk: "[kənˋvɪnst]", pos: "adj.", def: "深信不疑的", ex: "I am convinced that he is innocent." },
  "consequently": { kk: "[ˋkɑnsə͵kwɛntlɪ]", pos: "adv.", def: "結果；因此", ex: "He missed the bus and, consequently, was late." },
  "delightful": { kk: "[dɪˋlaɪtfəl]", pos: "adj.", def: "愉快的", ex: "The dinner was delightful." },
  "vibrant": { kk: "[ˋvaɪbrənt]", pos: "adj.", def: "充滿活力的", ex: "A vibrant city life." },
  "pursuit": { kk: "[pɚˋsjut]", pos: "n.", def: "追求", ex: "The pursuit of happiness." },
  "amidst": { kk: "[əˋmɪdst]", pos: "prep.", def: "在...之中", ex: "The house stood amidst the trees." },
  "reveal": { kk: "[rɪˋvil]", pos: "v.", def: "揭示；顯現", ex: "The study reveals some interesting facts." }
};

export const FORMULA_DATA: { p1: FormulaPart[]; p2: FormulaPart[] } = {
  p1: [
    { text: "In the context of modern existence, few subjects evoke as much contemplation as ", type: "text" },
    { text: "描述主題的名詞", type: "placeholder" },
    { id: 1, type: "footnote" },
    { text: ". Whether viewed through the lens of social trends or personal experience, it is evident that ", type: "text" },
    { text: "明確細節的句子", type: "placeholder" },
    { id: 2, type: "footnote" },
    { text: ". Specifically, regarding ", type: "text" },
    { text: "明確的細節名詞", type: "placeholder" },
    { id: 3, type: "footnote" },
    { text: ", one cannot help but notice ", type: "text" },
    { text: "描述細節的名詞", type: "placeholder" },
    { id: 4, type: "footnote" },
    { text: ". This phenomenon is not merely superficial; it serves as a mirror reflecting ", type: "text" },
    { text: "深刻的意義(名詞)", type: "placeholder" },
    { id: 5, type: "footnote" },
    { text: ".", type: "text" }
  ],
  p2: [
    { text: "While the aforementioned observations provide the context, a deeper reflection reveals significant implications regarding ", type: "text" },
    { text: "核心問題(名詞)", type: "placeholder" },
    { id: 6, type: "footnote" },
    { text: ". If I were to evaluate ", type: "text" },
    { text: "問題/優缺點/可能性等(名詞)", type: "placeholder" },
    { id: 7, type: "footnote" },
    { text: ", I would contend that ", type: "text" },
    { text: "自己的選擇或立場(句子)", type: "placeholder" },
    { id: 8, type: "footnote" },
    { text: ". Consequently, to ", type: "text" },
    { text: "目的(原形動詞)", type: "placeholder" },
    { id: 9, type: "footnote" },
    { text: ", my approach would be to ", type: "text" },
    { text: "打算做的行動(原形動詞)", type: "placeholder" },
    { id: 10, type: "footnote" },
    { text: ". Ultimately, ", type: "text" },
    { text: "主題(問題、現象)名詞", type: "placeholder" },
    { id: 11, type: "footnote" },
    { text: " acts as a catalyst, compelling us to rethink how we ", type: "text" },
    { text: "結論(動詞)", type: "placeholder" },
    { id: 12, type: "footnote" },
    { text: ".", type: "text" }
  ]
};

export const ESSAY_DATA: Essay[] = [
  {
    title: "Hand-shaken Drinks",
    content: "In the context of modern existence, few subjects evoke as much contemplation as the prevalence of hand-shaken drinks in Taiwan. Whether viewed through the lens of social trends or personal experience, it is evident that these beverages have become a symbol of unparalleled convenience. Specifically, regarding the customization options, one cannot help but notice how customers tailor their preferences amidst the pursuit of happiness. This phenomenon is not merely superficial; it serves as a mirror reflecting the psychological satisfaction of well-being. While the observations provide context, a deeper reflection reveals significant implications. I would contend that excessive indulgence poses a potential threat. Consequently, to mitigate health risks, my approach would be occasional indulgence over necessity. Ultimately, this temptation acts as a catalyst, compelling a conscious dietary rethink."
  },
  {
    title: "Pride of Taiwan",
    content: "In the context of modern existence, few subjects evoke as much contemplation as the unique charm of our homeland. Whether viewed through the lens of a resident, it is evident that the distinct allure captivates the soul. Specifically, regarding the sleepless vibrancy of our night markets, one cannot help but notice the warmth of human kindness and inclusivity. This phenomenon reflects the unflagging energy of our society. Deeper reflection reveals implications regarding marketing Taiwan. If I were to evaluate the pros and cons, I would contend that our culture is an unparalleled asset. Consequently, to promote our culture, I would launch campaigns that invite influencers to immerse themselves in authentic culinary delights. Ultimately, this cultural promotion acts as a catalyst, compelling us to define our identity."
  },
  {
    title: "Doomsday Prediction",
    content: "In the context of modern existence, few subjects evoke as much contemplation as the recurring emergence of doomsday prophecies. It is evident that these superstitions trigger a mix of panic and suspicion. Specifically, regarding the inherent vulnerability of human nature, one cannot help but notice how fear propagates, affecting even daily decisions. This phenomenon reflects a desperate search for certainty in an unpredictable world. Deeper reflection reveals implications regarding how we should live. I am convinced that even if not scientifically accurate, they are valuable philosophical reminders of our mortality. Consequently, to avoid imminent despair, my approach would be embracing gratitude. Ultimately, this doomsday scenario acts as a catalyst, compelling us to cherish our hypothetical final days."
  }
];
