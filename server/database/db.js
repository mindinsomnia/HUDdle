import getAppDataPath from './helper/getAppDataPath.js';

// Init
const db = new Sequelize({
  dialect: 'sqlite',
  storage: getAppDataPath('storage.db');
})

await sequelize.authenticate();

/*
Conversation
An exchange of messages between any number of users.

Message
A message, has a text content, associated with a conversation, sent by a user.

User
Represents a user, with username, password, nickname, and avatar. Avatars have a max size of 32 x 32 pixels, so it's stored as a simple dataURI in PNG format, should be less than 1KB in almost all situations.

FriendshipInvite
An invite, sent by 'Sender' to 'Receiver'. When receiver accepts, a friendship is created between both.

Friendship
A friendship between two users (user with smaller ID number is 'userId1'). When a friendship is created, a
conversation is also created and associated with the friendship.

Channel
Represents a channel, with a unique ID, an about, a conversation.

ChannelMembership
Represents a user having joined a channel, giving them access to view it and participate. Can indicate if the user is also an admin of the channel.
*/

const User = sequelize.define('User', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  nickname: {
    type: DataTypes.STRING,
    allowNull: false
  }
  { tableName: 'users' }
})

// Friendship Model (representing the relationship between users)
const Friendship = sequelize.define('Friendship', {
  userId1: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id',
    },
  },
  userId2: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id',
    },
  }
});

// FriendshipInvite Model (representing the friendship invite)
const FriendshipInvite = sequelize.define('FriendshipInvite', {
  senderId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id',
    },
  },
  receiverId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id',
    },
  }
});

const Channel = sequelize.define('Channel', {
  id: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  about: {
    type: DataTypes.STRING,
    allowNull: false
  },
  { tableName: 'channel' }
})

// ChannelMembership Model (representing a user's membership in a channel)
const ChannelMembership = sequelize.define('ChannelMembership', {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id',
    },
  },
  channelId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Channel,
      key: 'id',
    },
  },
  isAdmin: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
});

// Relationships
User.belongsToMany(Channel, { through: ChannelMembership });
Channel.belongsToMany(User, { through: ChannelMembership });

User.belongsToMany(User, {
  as: 'Friends',
  through: Friendship,
  foreignKey: 'userId1',
  otherKey: 'userId2',
});

Friendship.belongsTo(User, { foreignKey: 'userId1' });
Friendship.belongsTo(User, { foreignKey: 'userId2' });

User.belongsToMany(User, {
  as: 'FriendInvites',
  through: FriendshipInvite,
  foreignKey: 'senderId',
  otherKey: 'receiverId',
});

FriendshipInvite.belongsTo(User, { foreignKey: 'senderId' });
FriendshipInvite.belongsTo(User, { foreignKey: 'receiverId' });

await sequelize.sync();

export { User, Channel, Friendship, FriendshipInvite, ChannelMembership };
