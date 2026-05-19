// import { cookies } from "next/headers";
// import { IntegrationData } from "./types/global.types";
// import jwt from "jsonwebtoken";

// const JWT_SECRET = process.env.JWT_SECRET;

// export const getIntegrationData = async () : Promise<IntegrationData> => {
//     const cookieStore = await cookies();
//     const integrationData = cookieStore.get("integration-token")?.value;

//     if(!integrationData) {
//         return {
//             devtoVerification: false,
//             hashnodeVerification: false,
//         }
//     }

//     let decoded;

//     try {
//         decoded = jwt.verify(integrationData, JWT_SECRET as string);
//     } catch (error) {
//         return {
//             devtoVerification: false,
//             hashnodeVerification: false,
//         }
//     }

//     return decoded as IntegrationData;
// }