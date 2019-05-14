// We need the UserModel because we need to update the user.
const UserModel = require('models/user');
const { ErrNotAuthorized } = require('errors');

// Get some middleware to use with the webhook.
const auth = require('middleware/authentication');
const authz = require('middleware/authorization');

// Load some config from the environment. This could be changed to a settings
// option later if you want to go that route.
const DEFAULT_AVATAR = process.env.DEFAULT_AVATAR;

async function setAvatar(id, avatarUrl) {
  let user = await UserModel.findOneAndUpdate(
    {id},
    {$set: {metadata: {avatar: avatarUrl}}}
  );
  return user;
}

module.exports = {

  // The new type definitions provides the new "avatar" field needed to inject
  // into the User type.
  typeDefs: `
    type SetAvatarResponse implements Response {
      errors: [UserError!]
    }

    type User {
      avatar: String
    }

    type RootMutation {
      setAvatar(avatar: String!): SetAvatarResponse
    }
  `,

  // The User resolver will return the avatar from the embedded user metadata.
  resolvers: {
    User: {
      avatar(user) {
        if (user && user.metadata && user.metadata.avatar) {
          return user.metadata.avatar;
        }

        return DEFAULT_AVATAR;
      },
    },
    RootMutation: {
      async setAvatar(
        obj,
        { avatar },
        { mutators: { User } },
      ) {
        await User.setAvatar(avatar);
      },
    },
  },

  mutators: ctx => {
    const {
      connectors: { errors: ErrNotAuthorized },
    } = ctx;
    let mutators = {
      User: {
        setAvatar: () => Promise.reject(new ErrNotAuthorized()),
      },
    };

    if (ctx.user) {
      mutators.User.setAvatar = avatar => setAvatar(ctx.user.id, avatar);
    }
    return mutators;
  },
};
