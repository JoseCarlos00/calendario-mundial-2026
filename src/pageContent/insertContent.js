import { getData } from "./getData.js";

export async function insertContent() {
  const data = await getData()
  console.log(data);
}
