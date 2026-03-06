import payload from 'payload';

let initialized = false;

export async function initPayload() {
  if (!initialized) {
    await payload.init({
      secret: process.env.PAYLOAD_SECRET,
      onInit: () => {
        console.log(`Payload Admin URL: ${payload.getAdminURL()}`);
      },
    });
    initialized = true;
  }
}
