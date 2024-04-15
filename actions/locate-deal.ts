"use server";

export async function checkDealLocation(state: string, key: string) {
  return state.toLowerCase() === process.env.LOCATE_DEAL_STATE_NAME && key === process.env.LOCATE_DEAL_KEY;
}
