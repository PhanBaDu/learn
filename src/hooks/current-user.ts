'use server';

import prisma from '@/utils/db';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { User } from '@prisma/client';

export async function getCurrentUser(): Promise<User | null> {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user || user === null || !user.id) {
    return null;
  }

  const currentUser = await prisma.user.findUnique({
    where: {
      id: user.id,
    },
  });

  return currentUser;
}
