import { internalMutation, query } from './_generated/server';
import { ConvexError, v } from 'convex/values';

export const createUser = internalMutation({
  args: {
    tokenIdentifier: v.string(),
    email: v.string(),
    name: v.string(),
    image: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert('users', {
      tokenIdentifier: args.tokenIdentifier,
      email: args.email,
      name: args.name,
      image: args.image,
      isOnline: true,
    });
  },
});

export const updateUser = internalMutation({
  args: { tokenIdentifier: v.string(), image: v.string() },
  async handler(ctx, args) {
    const user = await ctx.db
      .query('users')
      .withIndex('by_tokenIdentifier', (q) =>
        q.eq('tokenIdentifier', args.tokenIdentifier)
      )
      .unique();

    if (!user) {
      throw new ConvexError('User not found for update');
    }

    await ctx.db.patch(user._id, { image: args.image });
  },
});

export const setUserOnline = internalMutation({
  args: { tokenIdentifier: v.string() },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query('users')
      .withIndex('by_tokenIdentifier', (q) =>
        q.eq('tokenIdentifier', args.tokenIdentifier)
      )
      .unique();

    if (!user) {
      throw new ConvexError('User not found for online');
    }

    await ctx.db.patch(user._id, { isOnline: true });
  },
});

export const setUserOffline = internalMutation({
  args: { tokenIdentifier: v.string() },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query('users')
      .withIndex('by_tokenIdentifier', (q) =>
        q.eq('tokenIdentifier', args.tokenIdentifier)
      )
      .unique();

    if (!user) {
      throw new ConvexError('User not found for offline');
    }

    await ctx.db.patch(user._id, { isOnline: false });
  },
});

export const getUsers = query({
  args: {},
  async handler(ctx, args) {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new ConvexError('Unauthorized');
    }

    const users = await ctx.db.query('users').collect();
    return users;
  },
});

export const getMe = query({
  args: {},
  async handler(ctx, args) {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new ConvexError('Unauthorized');
    }

    const user = await ctx.db
      .query('users')
      .withIndex('by_tokenIdentifier', (q) =>
        q.eq('tokenIdentifier', identity.tokenIdentifier)
      )
      .unique();

    if (!user) {
      throw new ConvexError('User not found');
    }

    return user;
  },
});
