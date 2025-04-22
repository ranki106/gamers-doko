const currentYear = new Date().getFullYear()
const okayuBirthday = new Date(currentYear, 1, 22)
const okayuDebut = new Date(currentYear, 3, 6)
const fubukiBirthday = new Date(currentYear, 9, 5)
const fubukiDebut = new Date(currentYear, 11, 7)
const koroneBirthday = new Date(currentYear, 9, 1)
const koroneDebut = new Date(currentYear, 4, 13)
const mioBirthday = new Date(currentYear, 7, 20)
const mioDebut = new Date(currentYear, 11, 7)

export const data = [
  {
    id: 'korone',
    name: "Inugami Korone",
    backgroundColor: "#F9E08D",    // softened, warm yellow-beige
    accentColor1: "#F0B800",       // muted amber
    accentColor2: "#D48D00",       // deeper gold
    accentColor3: "#B67600",       // warm, rich brown
    textColor: "#5C3B00",          // dark brown
    japaneseName: "戌神ころね",
    birthday: koroneBirthday,
    debut: koroneDebut,
    oshiMark: "🥐",
    channelID: 'UChAnqc_AY5_I3Px5dig3X1Q',
    offlineImg: "src/assets/k_offline.webp",
    offlineImgAlt: "Inugami Korone offline image",
    onlineImg: "src/assets/f_online.webp",
    onlineImgAlt: "Inugami Korone streaming image",
  },
  {
    id: 'okayu',
    name: "Nekomata Okayu",
    backgroundColor: "#A37FEC",    // soft lavender
    accentColor1: "#D091F7",       // pastel pink
    accentColor2: "#9C57D4",       // muted violet
    accentColor3: "#7A3C97",       // deeper purple
    textColor: "#4B2A71",          // dark plum
    japaneseName: "猫又おかゆ",
    birthday: okayuBirthday,
    debut: okayuDebut,
    oshiMark: "🍙",
    channelID: 'UCvaTdHTWBGv3MKj3KVqJVCw',
    offlineImg: "src/assets/o_offline.webp",
    offlineImgAlt: "Nekomata Okayu offline image",
    onlineImg: "src/assets/m_online.webp",
    onlineImgAlt: "Nekomata Okayu streaming image",
  },
  {
    id: 'fubuki',
    name: "Shirakami Fubuki",
    backgroundColor: "#81C3E3",    // soft, pastel blue
    accentColor1: "#A7D8E9",       // lighter, pale blue
    accentColor2: "#007B9C",       // muted blue
    accentColor3: "#66B3D9",       // calm, medium blue
    textColor: "#0A3B53",          // dark navy
    japaneseName: "白上フブキ",
    birthday: fubukiBirthday,
    debut: fubukiDebut,
    oshiMark: "🌽",
    channelID: 'UCdn5BQ06XqgXoAxIhbqw5Rg',
    offlineImg: "src/assets/k_offline.webp",
    offlineImgAlt: "Shirakami Fubuki offline image",
    onlineImg: "src/assets/f_online.webp",
    onlineImgAlt: "Shirakami Fubuki streaming image",
  },
  {
    id: 'mio',
    name: "Ookami Mio",
    backgroundColor: "#E57373",    // soft, muted red
    accentColor1: "#FFB3B3",       // light pinkish-red
    accentColor2: "#D32F2F",       // deep red
    accentColor3: "#9A1A1A",       // rich burgundy
    textColor: "#5C0A00",          // dark red-brown
    japaneseName: "大神ミオ",
    birthday: mioBirthday,
    debut: mioDebut,
    oshiMark: "🌲",
    channelID: 'UCp-5t9SrOQwXMU7iIjQfARg',
    offlineImg: "src/assets/o_offline.webp",
    offlineImgAlt: "Ookami Mio offline image",
    onlineImg: "src/assets/m_online.webp",
    onlineImgAlt: "Ookami Mio streaming image",
  },
]
