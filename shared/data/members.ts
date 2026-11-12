export interface Member { id: string; name: string; role: 'representative' | 'member'; github?: string; avatar?: string }

// Member names and roles supplied by Sumire Labs.
export const members: Member[] = [
  {
    "id": "pepelys",
    "github": "https://github.com/pepelys",
    "avatar": "/images/members/pepelys.gif",
    "name": "Pepelys",
    "role": "representative"
  },
  {
    "id": "hayatea",
    "github": "https://github.com/HayatoFukami",
    "avatar": "/images/members/hayatea.png",
    "name": "Hayatea",
    "role": "representative"
  },
  {
    "id": "chiyahare",
    "github": "https://github.com/ChiyahaRe",
    "avatar": "/images/members/chiyahare.png",
    "name": "Chiyahare",
    "role": "member"
  },
  {
    "id": "hag-gha",
    "github": "https://github.com/hag-hag",
    "avatar": "/images/members/hag-gha.png",
    "name": "Hag/Gha",
    "role": "member"
  }
]
