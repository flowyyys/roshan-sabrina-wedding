import type { InvitationData } from "./invitation-types";

const CHURCH_MAP =
  "https://www.google.com/maps/search/?api=1&query=Holy%20Trinity%20Church%20Kodigehalli%20Bangalore";
const VANYA_MAP =
  "https://maps.app.goo.gl/JEahVuvsosMeoNbM7?g_st=ic";
const GOA_MAP =
  "https://www.google.com/maps/search/?api=1&query=Goa%2C%20India";

const BANGALORE_CALENDAR =
  "https://calendar.google.com/calendar/render?action=TEMPLATE&text=Roshan%20with%20Sabrina%20%E2%80%94%20Bangalore%20Wedding&dates=20261230T093000Z%2F20261230T163000Z&location=Holy%20Trinity%20Church%2C%20Kodigehalli%2C%20Bangalore";
const GOA_CALENDAR =
  "https://calendar.google.com/calendar/render?action=TEMPLATE&text=Roshan%20with%20Sabrina%20%E2%80%94%20Goa%20Wedding&dates=20270210%2F20270211&location=Goa%2C%20India";

export const invitations: Record<
  "roshansabrina" | "sabrinaroshan",
  InvitationData
> = {
  roshansabrina: {
    accessCode: "roshansabrina",
    theme: "hindu",
    blessingMark: "श्री",
    eyebrow: "",
    invitationLine: "",
    lineageStyle: "formal",
    hostNames:
      "Smt. Dongerkerry Sandhya Pai & Sri. Dongerkerry Ramakrishna Pai",
    hostMessage:
      "warmly invite you and your family to witness and celebrate the marriage of",
    roshanParentage: [
      "G.S/o. (Late) Sri. Dongerkerry Padmanabha Pai & (Late) Smt. Premabai Mangeswaram",
      "G.S/o. (Late) Sri. Vasudeva Varadendranath Pai & Smt. Susheela Pai",
    ],
    sabrinaParentage: [
      "D/o Smt. Victoria Prescilla Picardo & (Late) Sri. Glen Fredrick Picardo",
      "G.D/o (Late) Sri. Peter Vincent Picardo & (Late) Smt. Helena Bibiana Picardo",
      "G.D/o (Late) Sri. Victor Salvador Crasta & (Late) Smt. Philomena Anna Crasta",
    ],
    artUrl: "/peacock-frame.png",
    date: {
      weekday: "Wednesday",
      day: "10",
      month: "February",
      year: "2027",
      ariaLabel: "Wednesday, 10 February 2027",
      countdownTarget: "2027-02-10T00:00:00+05:30",
    },
    calendarUrl: GOA_CALENDAR,
    locationSummary: "Goa, India",
    locationMapUrl: GOA_MAP,
    locationLabel: "Location",
    locationsIntro: "One beautiful celebration in Goa.",
    locations: [
      {
        label: "Wedding Celebration",
        name: "Goa",
        time: "Time to be announced",
        address: "The exact venue address will be shared soon.",
        mapUrl: GOA_MAP,
      },
    ],
    rsvpNote:
      "Your presence and blessings mean the world to our family. Please let us know if we may save a place for you.",
    closingLine:
      "Your blessings are the loveliest gift. We cannot wait to celebrate with you in Goa.",
  },
  sabrinaroshan: {
    accessCode: "sabrinaroshan",
    theme: "christian",
    blessingMark: "✦",
    eyebrow: "Together with our families",
    invitationLine: "Faith brought us here; love leads us forward",
    lineageStyle: "classic",
    roshanParentage: [
      "Son of D. Ramakrishna Pai & D. Sandhya Pai",
    ],
    sabrinaParentage: [
      "Daughter of (Late) Mr. Glen Fredrick Picardo & Mrs. Victoria Prescilla Picardo",
    ],
    artUrl: "/floral-frame-rich.png",
    date: {
      weekday: "Wednesday",
      day: "30",
      month: "December",
      year: "2026",
      ariaLabel: "Wednesday, 30 December 2026",
      countdownTarget: "2026-12-30T15:00:00+05:30",
    },
    calendarUrl: BANGALORE_CALENDAR,
    locationSummary: "Bangalore, India",
    locationMapUrl: CHURCH_MAP,
    locationLabel: "Locations",
    locationsIntro:
      "First the wedding at Holy Trinity Church, then the reception at Vanya.",
    locations: [
      {
        label: "First · Wedding Ceremony",
        name: "Holy Trinity Church",
        time: "3:00 PM",
        address: "Kodigehalli, Bangalore",
        mapUrl: CHURCH_MAP,
      },
      {
        label: "Then · Wedding Reception",
        name: "Vanya Luxury Boutique Resort",
        time: "6:00 PM",
        address: "Bangalore, Karnataka",
        mapUrl: VANYA_MAP,
      },
    ],
    rsvpNote:
      "We would be delighted to celebrate with you. Please send your reply so our family can prepare a beautiful place for you.",
    closingLine:
      "Your love, prayers and presence are the only gifts we could wish for.",
  },
};
