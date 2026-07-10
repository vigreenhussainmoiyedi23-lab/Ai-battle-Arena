export async function sendResponse({ status, json,  res }: any) {
  try {
    res.status(status).json(json);
  } catch (error) {
    console.log(error);
  }
}
