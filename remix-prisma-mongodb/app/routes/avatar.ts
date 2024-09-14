import { ActionFunction, json } from "@remix-run/node";
import { requireUserId } from "~/utils/auth.server";
import { prisma } from "~/utils/prisma.server";
import { uploadAvatar } from "~/utils/upload-avatar.server";
import { updateUser } from "~/utils/user.server";

export const action: ActionFunction = async ({ request }) => {
    const userId = await requireUserId(request);

    const imageUrl = await uploadAvatar(request);

    await updateUser(userId, { profilePicture: imageUrl });

    return json({ imageUrl });
};
