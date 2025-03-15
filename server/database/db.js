import getAppDataPath from './helper/getAppDataPath.js';

// Init
const db = new Sequelize({
  dialect: 'sqlite',
  storage: getAppDataPath('storage.db');
})

await sequelize.authenticate();

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
  { tableName: 'users' }
})

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

const Channel = sequelize.define('Channel', {
  id: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  { tableName: 'channel' }
})

await sequelize.sync();

export const createUser = async (name, email) => {
  try {
    const user = await User.create({ name, email });
    console.log('User created:', user.toJSON());
  } catch (err) {
    console.error('Error creating user:', err);
  }
};

export const getUsers = async () => {
  try {
    const users = await User.findAll();
    console.log('All users:', JSON.stringify(users, null, 2));
  } catch (err) {
    console.error('Error retrieving users:', err);
  }
};

export const updateUser = async (id, newName) => {
  try {
    const [updatedRows] = await User.update(
      { name: newName },
      { where: { id } }
    );
    console.log(`${updatedRows} user(s) updated.`);
  } catch (err) {
    console.error('Error updating user:', err);
  }
};

export const deleteUser = async (id) => {
  try {
    const deletedRows = await User.destroy({ where: { id } });
    console.log(`${deletedRows} user(s) deleted.`);
  } catch (err) {
    console.error('Error deleting user:', err);
  }
};
