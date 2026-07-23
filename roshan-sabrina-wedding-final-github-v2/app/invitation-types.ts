export type InvitationLocation = {
  label: string;
  name: string;
  time: string;
  address: string;
  mapUrl: string;
};

export type InvitationDate = {
  weekday: string;
  day: string;
  month: string;
  year: string;
  ariaLabel: string;
  countdownTarget: string;
};

export type InvitationData = {
  accessCode: "roshansabrina" | "sabrinaroshan";
  theme: "hindu" | "christian";
  blessingMark: string;
  eyebrow: string;
  invitationLine: string;
  lineageStyle: "classic" | "formal";
  hostNames?: string;
  hostMessage?: string;
  roshanParentage: string[];
  sabrinaParentage: string[];
  artUrl: string;
  date: InvitationDate;
  calendarUrl: string;
  locationSummary: string;
  locationMapUrl: string;
  locationLabel: "Location" | "Locations";
  locationsIntro: string;
  locations: InvitationLocation[];
  rsvpNote: string;
  closingLine: string;
};

export type LandingInvitationData = Pick<
  InvitationData,
  | "accessCode"
  | "theme"
  | "blessingMark"
  | "eyebrow"
  | "invitationLine"
  | "lineageStyle"
  | "hostNames"
  | "hostMessage"
  | "roshanParentage"
  | "sabrinaParentage"
  | "artUrl"
  | "date"
  | "calendarUrl"
  | "locationSummary"
  | "locationMapUrl"
  | "locationLabel"
>;
