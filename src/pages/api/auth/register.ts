import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';
import { hashPassword, signToken } from '@/lib/auth';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();

  const { username, email, password } = req.body;

  if (!username || !email || !password)
    return res.status(400).json({ error: 'Missing fields' });

  const existing = await prisma.user.findFirst({
    where: { OR: [{ username }, { email }] },
  });
  if (existing) return res.status(400).json({ error: 'User exists' });

  const hashed = await hashPassword(password);
  const user = await prisma.user.create({
    data: { username, email, password: hashed },
  });

  const token = signToken({ id: user.id, username: user.username });
  res.status(201).json({ token });
}