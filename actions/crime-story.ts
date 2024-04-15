"use server";

export async function checkCriminalName(name: string) {
  return !name || name.toLowerCase() !== process.env.CRIME_STORY_CRIMINAL_NAME;
}

export async function checkPlayerName(name: string) {
  return name.toLowerCase() === process.env.MEETING_ID_NAME;
}
