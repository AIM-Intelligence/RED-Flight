import { createThirdwebClient } from "thirdweb";

const clientId = process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID_STORAGE!;

export const storageClient = createThirdwebClient({
  clientId: clientId,
});

// const clientIdStorage = process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID_STORAGE!;
// const secretKeyStorage = process.env.THIRDWEB_SECRET_KEY_STORAGE;

// export const storageClient = createThirdwebClient(
//   secretKey
//     ? { secretKeyStorage }
//     : {
//         clientIdStorage,
//       },
// );
