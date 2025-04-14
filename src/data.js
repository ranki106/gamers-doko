const currentYear = new Date().getFullYear()
const okayuBirthday = new Date(currentYear, 1, 22)
const okayuDebut = Date(currentYear, 3, 6)
const fubukiBirthday = new Date(currentYear, 9, 5)
const fubukiDebut = Date(currentYear, 11, 7)

export const data = [
    {
        id: 1,
        name: "Inugami Korone",
        backgroundColor: "#FEE039",
        accentColor1: "#FFF9D7",
        accentColor2: "#824600",
        accentColor3: "#FEBD00",
        japaneseName: "戌神ころね",
        birthday: "October 1",
        debut: "April 13",
        oshiMark: "🥐",
        channelID: 'UChAnqc_AY5_I3Px5dig3X1Q',
    },
    {
        id: 2,
        name: "Nekomata Okayu",
        backgroundColor: "#B190FC",
        accentColor1: "#BD34A4",
        accentColor2: "#FFF0FA",
        accentColor3: "#6B2D8F",
        japaneseName: "猫又おかゆ",
        birthday: okayuBirthday,
        debut: okayuDebut,
        oshiMark: "🍙",
        channelID: 'UCvaTdHTWBGv3MKj3KVqJVCw',
    },
    {
        id: 3,
        name: "Shirakami Fubuki",
        backgroundColor: "#43BFEF",
        accentColor1: "#AFF1FF",
        accentColor2: "#003B5C",
        accentColor3: "#00B8EA", 
        japaneseName: "白上フブキ",
        birthday: fubukiBirthday,
        debut: fubukiDebut,
        oshiMark: "🌽",
        channelID: 'UCdn5BQ06XqgXoAxIhbqw5Rg',
    },
    {
        id: 4,
        name: "Ookami Mio",
        backgroundColor: "#C7001E",
        accentColor1: "#C71E3E",
        accentColor2: "#FFE8ED",
        accentColor3: "#7C0015",
        japaneseName: "大神ミオ",
        birthday: "August 20",
        debut: "🌲",
        oshiMark: "🌲",
        channelID: 'UCp-5t9SrOQwXMU7iIjQfARg',
    },
]


/*
Current color pallets
Mio
#C71E3E
#C7001E
#FFE8ED
#7C0015

Fubu
#43BFEF
#00B8EA
#003B5C
#AFF1FF

Okayu
#B190FC
#BD34A4
#FFF0FA
#6B2D8F

Korone
#FEE039
#FFF9D7
#824600
#FEBD00

*/
